import cloudinary.api
import cloudinary.uploader
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Capture, Tag


import cloudinary



from ..config import Config

cloudinary.config(
    cloud_name = "doghb1bcz",
    api_key = Config.CLOUDINARY_API_KEY,
    api_secret = Config.CLOUDINARY_SECRET_KEY,
    secure = True
)

capture_routes = Blueprint('captures', __name__)

#get image data from database
@capture_routes.route('/')
def capture():

    captures = Capture.query.all()

    return {'captures': [capture.to_dict() for capture in captures]}

#get image data of specified id from database
@capture_routes.route('/<int:id>')
def getCapture(id):
    capture = Capture.query.get(id)

    return capture.to_dict()

#get image resource from cloud including data not used in local database
@capture_routes.route('/<int:id>/resource')
def getCaptureResource(id):
    capture = Capture.query.get(id)
    if capture:
        publicId = capture.to_dict()["public_id"]
        resource = cloudinary.api.resource(publicId)
        return resource

#delete image data from database and remove from cloud using public id
@capture_routes.route('/<int:id>', methods=['DELETE'])
def deleteCapture(id):
    capture = Capture.query.get(id)

    if capture:
        publicId = capture.to_dict()["public_id"]
        cloudinary.uploader.destroy(publicId)
        db.session.delete(capture)
        db.session.commit()
        return jsonify({"message": "successfully deleted file"})


#upload image to cloudinary and extract data to insert into database
@capture_routes.route('/scan', methods=['POST'])

def upload_capture():

    data = request.json
    encodedImageUrl = data["encodedUrl"]
    tag = data["tag"]
    ownerId = data["ownerId"]


    try:
        result = cloudinary.uploader.upload(encodedImageUrl, tags=tag)

        uploadData = Capture(
                owner_id = ownerId,
                asset_folder = result["asset_folder"],
                bytes = result["bytes"],
                display_name = result["display_name"],
                format = result["format"],
                width = result["width"],
                height = result["height"],
                public_id = result["public_id"],
                resource_type = result["resource_type"],
                secure_url = result["secure_url"],
                signature = result["signature"]
        )

        db.session.add(uploadData)
        db.session.commit()
        capture = Capture.query.filter(Capture.public_id == result["public_id"]).first()

        uploadTag = Tag(
            name = tag,
            capture_id = capture.id,
            user_id = capture.owner_id
        )

        db.session.add(uploadTag)
        db.session.commit()

        return uploadData.to_dict()

    except Exception as e:
        return jsonify({'error': str(e)})
