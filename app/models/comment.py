from .db import db, environment, SCHEMA
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        _table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    capture_id = db.Column(db.Integer, ForeignKey('captures.id'), nullable=False)
    comment_text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    capture = relationship('Capture', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'capture_id': self.capture_id,
            'comment_text': self.comment_text,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
