from flask import Blueprint, request, jsonify
from app.models import db, Capture, Tag
from flask_login import login_required

tag_routes = Blueprint('tags', __name__)

@tag_routes.route('/')
def get_tags():
    tags = Tag.query.all()

    return {'tags': [tag.to_dict() for tag in tags]}


@tag_routes.route('/<name>')
def get_tag(name):

    filteredTags = Capture.query.filter(Tag.name == name).join(Capture.tags)

    return {'tags': [tag.to_dict() for tag in filteredTags]}
