from flask import Blueprint, request, jsonify
from app.models import db, Capture, Tag
from flask_login import login_required

tag_routes = Blueprint('tags', __name__)

@tag_routes.route('/')
def getTags():
    tags = Tag.query.all()

    return {'tags': [tag.to_dict() for tag in tags]}


@tag_routes.route('/<int:id>')
def getTag(id):
    tag = Tag.query.get(id)

    return tag.to_dict()
