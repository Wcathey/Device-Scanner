from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Image

import cloudinary
from cloudinary.uploader import upload
from ..config import Config

cloudinary.config(
    cloud_name = "doghb1bcz",
    api_key = Config.CLOUDINARY_API_KEY,
    api_secret = Config.CLOUDINARY_SECRET_KEY,
    secure = True
)

transfer_routes = Blueprint('transfers', __name__)

@transfer_routes.route('/')
@login_required
def images():
    #use query.all on the upload model to get public Ids
    return #dictionary of public Ids

@transfer_routes.route('/<int:id>')
@login_required
def image(id):
    # query.get image by id
    return #image.to_dict() dict of images

@transfer_routes.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file found'})

    image = request.files['file']
    if image.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        result = upload(image)
        data = Image(
                asset_folder = result["asset_folder"],
                bytes = result["bytes"],
                display_name = result["display_name"],
                format = result["format"],
                width = result["width"],
                height = result["height"],
                original_filename = result["original_filename"],
                public_id = result["public_id"],
                resource_type = result["resource_type"],
                secure_url = result["secure_url"],
                signature = result["signature"]
        )
        db.session.add(data)
        db.session.commit()
        return data.to_dict()

    except Exception as e:
        return jsonify({'error': str(e)})
