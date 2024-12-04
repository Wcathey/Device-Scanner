from .db import db, environment, SCHEMA
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Scan(db.Model):
    __tablename__ = 'scans'

    if environment == "production":
        _table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_id = db.Column(db.Integer, ForeignKey('images.id'), nullable=False)
    scan_date = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    scan_resolution = db.Column(db.String(20))
    scan_format = db.Column(db.String(20))
    image = relationship('Image', back_populates='scans')

    def to_dict(self):
        return {
            'id': self.id,
            'image_id': self.image_id,
            'scan_date': self.scan_date,
            'updated_at': self.updated_at,
            'scan_resolution': self.scan_resolution,
            'scan_format': self.scan_format
        }
