import cloudinary.api
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Capture

import cloudinary

from cloudinary.uploader import upload, destroy

from ..config import Config

cloudinary.config(
    cloud_name = "doghb1bcz",
    api_key = Config.CLOUDINARY_API_KEY,
    api_secret = Config.CLOUDINARY_SECRET_KEY,
    secure = True
)

upload_routes = Blueprint('uploads', __name__)

#get image data from database
@upload_routes.route('/')
def images():
    captures = Capture.query.all()
    return {'captures': [captures.to_dict() for capture in captures]}

#get image data of specified id from database
@upload_routes.route('/<int:id>')
def getImage(id):
    capture = Capture.query.get(id)
    return capture.to_dict()

#get image resource from cloud including data not used in local database
@upload_routes.route('/<int:id>/resource')
def getImageResource(id):
    capture = Capture.query.get(id)
    if capture:
        publicId = capture.to_dict()["public_id"]
        resource = cloudinary.api.resource(publicId)
        return resource

#delete image data from database and remove from cloud using public id
@upload_routes.route('/<int:id>', methods=['DELETE'])
def deleteImage(id):
    capture = Capture.query.get(id)

    if capture:
        publicId = capture.to_dict()["public_id"]
        destroy(publicId)
        db.session.delete(capture)
        db.session.commit()
        return jsonify({"message": "successfully deleted file"})


#upload image to cloudinary and extract data to insert into database
@upload_routes.route('/scan-image', methods=['POST'])

def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file found'})

    capture = request.files['file']
    if capture.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        result = upload(capture)

        data = Capture(
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
