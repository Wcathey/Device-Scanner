from flask import Blueprint, request, jsonify
from flask_login import login_required
import uuid
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
@login_required
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file found'})

    image = request.files['file']
    if image.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        generated_UUID = uuid.uuid4()
        result = upload(image,
                asset_folder = 'userImages',
                public_id = generated_UUID,
                overwrite = True
                        )
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})
