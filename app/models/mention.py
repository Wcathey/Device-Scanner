from .db import db, environment, SCHEMA
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Mention(db.Model):
    __tablename__ = 'mentions'

    if environment == "production":
        _table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_id = db.Column(db.Integer, ForeignKey('images.id'), nullable=False)
    mentioned_user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    image = relationship('Image', back_populates='mentions')
    user = relationship('User', back_populates='mentions')

    def to_dict(self):
        return {
            'id': self.id,
            'image_id': self.image_id,
            'mentioned_user_id': self.mentioned_user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
