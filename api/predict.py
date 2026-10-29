"""
Vercel Python serverless endpoint placeholder.

Connect the actual model from the Image-Classification-Flask repository here.
This endpoint intentionally does not invent a prediction. Until the original
model/inference code is integrated, it returns a clear setup message.
"""
from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # The frontend sends multipart/form-data. Replace this placeholder with
        # the repository's image preprocessing and model inference pipeline.
        body = json.dumps({
            "message": (
                "The website is deployed, but the model inference API has not "
                "been connected yet. Add the original model and prediction code "
                "to api/predict.py before using live classification."
            )
        }).encode("utf-8")
        self.send_response(501)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)
