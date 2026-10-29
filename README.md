# Classify — Umaid Ehsan Image Classification Website

A detailed, responsive frontend for [Image-Classification-Flask](https://github.com/umaidehsan/Image-Classification-Flask), by Muhammad Umaid Ehsan.

## Website design
- Distinct editorial / research notebook visual style
- Responsive layouts for desktop and mobile
- Image picker, drag-and-drop, preview, file validation
- Detailed explanation of image classification and ResNet residual connections
- Project workflow and developer section
- Vercel static deployment configuration

## About the original project
The linked repository README describes a Flask application using a trained ResNet model stored as `model_resnet.h5`, with Python, Flask, TensorFlow/Keras and NumPy. It does not specify all model details such as the exact class list, input dimensions, training dataset or evaluation metrics, so this site avoids inventing those claims.

## Deploy
1. Extract the ZIP.
2. Push the files to a GitHub repository.
3. Import the repository at https://vercel.com/new.
4. Choose **Other** as the framework preset and deploy.

## Important: live predictions
The frontend and upload interactions are implemented, but the API endpoint is a placeholder. For actual classification, integrate the original `app.py` inference logic and `model_resnet.h5` into an appropriate Python inference service. TensorFlow and a model artifact may exceed Vercel's serverless function size or runtime constraints. A practical option is deploying the Flask model service to a Python-capable host and updating `script.js` to call its API. Enable CORS if the frontend and API use different domains.

The current `/api/predict` endpoint returns an explanatory setup message rather than a fake prediction.

## Files
- `index.html` — detailed project website
- `style.css` — responsive styling
- `script.js` — upload, preview and API request
- `api/predict.py` — honest placeholder endpoint
- `vercel.json` — deployment routing
