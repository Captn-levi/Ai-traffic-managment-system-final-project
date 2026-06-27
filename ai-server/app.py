from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
import pytesseract
import re

app = Flask(__name__)
CORS(app)

# =========================
# TESSERACT PATH
# =========================

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

# =========================
# RECOGNIZE ROUTE
# =========================

@app.route('/recognize', methods=['POST'])
def recognize():

    try:

        # =========================
        # GET IMAGE FROM FRONTEND
        # =========================

        data = request.json

        image_data = data['image'].split(",")[1]

        img_bytes = base64.b64decode(image_data)

        np_arr = np.frombuffer(
            img_bytes,
            np.uint8
        )

        img = cv2.imdecode(
            np_arr,
            cv2.IMREAD_COLOR
        )

        if img is None:

            return jsonify({
                "success": False,
                "error": "Image decode failed"
            })

        # =========================
        # DETECT PLATE AREA
        # =========================

        gray_full = cv2.cvtColor(
            img,
            cv2.COLOR_BGR2GRAY
        )

        filtered = cv2.bilateralFilter(
            gray_full,
            11,
            17,
            17
        )

        edged = cv2.Canny(
            filtered,
            30,
            200
        )

        contours, _ = cv2.findContours(
            edged.copy(),
            cv2.RETR_TREE,
            cv2.CHAIN_APPROX_SIMPLE
        )

        contours = sorted(
            contours,
            key=cv2.contourArea,
            reverse=True
        )[:10]

        plate_contour = None

        for contour in contours:

            peri = cv2.arcLength(
                contour,
                True
            )

            approx = cv2.approxPolyDP(
                contour,
                0.018 * peri,
                True
            )

            # RECTANGLE SHAPE
            if len(approx) == 4:

                plate_contour = approx
                break

        # =========================
        # CROP PLATE
        # =========================

        if plate_contour is None:

            # fallback center crop
            height, width, _ = img.shape

            x1 = int(width * 0.2)
            y1 = int(height * 0.35)

            x2 = int(width * 0.8)
            y2 = int(height * 0.65)

            crop = img[y1:y2, x1:x2]

        else:

            x, y, w, h = cv2.boundingRect(
                plate_contour
            )

            crop = img[y:y+h, x:x+w]

        # =========================
        # SAVE CROPPED IMAGE
        # =========================

        cv2.imwrite(
            "debug_crop.jpg",
            crop
        )

        # =========================
        # CONVERT TO GRAY
        # =========================

        gray = cv2.cvtColor(
            crop,
            cv2.COLOR_BGR2GRAY
        )

        # =========================
        # ENLARGE IMAGE
        # =========================

        gray = cv2.resize(
            gray,
            None,
            fx=3,
            fy=3,
            interpolation=cv2.INTER_CUBIC
        )

        # =========================
        # REMOVE NOISE
        # =========================

        gray = cv2.bilateralFilter(
            gray,
            13,
            15,
            15
        )

        # =========================
        # THRESHOLD
        # =========================

        thresh = cv2.threshold(
            gray,
            0,
            255,
            cv2.THRESH_BINARY + cv2.THRESH_OTSU
        )[1]

        # =========================
        # SAVE DEBUG IMAGE
        # =========================

        cv2.imwrite(
            "debug_plate.jpg",
            thresh
        )

        # =========================
        # OCR CONFIG
        # =========================

        custom_config = (
            '--oem 3 '
            '--psm 7 '
            '-c tessedit_char_whitelist='
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-'
        )

        # =========================
        # OCR READ
        # =========================

        text = pytesseract.image_to_string(
            thresh,
            config=custom_config
        )

        print("RAW OCR:", text)

        # =========================
        # CLEAN RESULT
        # =========================

        plate = re.sub(
            r'[^A-Z0-9-]',
            '',
            text.upper()
        )

        print("CLEANED PLATE:", plate)

        # =========================
        # VALIDATION
        # =========================

        if len(plate) >= 4:

            return jsonify({
                "success": True,
                "plate": plate
            })

        return jsonify({
            "success": False,
            "error": "Plate not detected clearly"
        })

    except Exception as e:

        print("ERROR:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        })

# =========================
# RUN SERVER
# =========================

if __name__ == '__main__':

    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )