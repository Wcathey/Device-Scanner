from .db import db, environment, SCHEMA
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        _table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    capture_id = db.Column(db.Integer, ForeignKey('captures.id'), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    capture = relationship('Capture', back_populates='tags')
    user = relationship('User', back_populates='tags')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'capture_id': self.capture_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
