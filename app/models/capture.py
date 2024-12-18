from .db import db, environment, SCHEMA
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


class Capture(db.Model):
    __tablename__ = 'captures'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    asset_folder = db.Column(db.String)
    bytes = db.Column(db.Integer, nullable=False)
    display_name = db.Column(db.String, nullable=False)
    format = db.Column(db.String, nullable=False)
    width = db.Column(db.Integer, nullable=False)
    height = db.Column(db.Integer, nullable=False)
    public_id = db.Column(db.String, nullable=False, unique=True)
    resource_type = db.Column(db.String, nullable=False)
    secure_url = db.Column(db.String, nullable=False)
    signature = db.Column(db.String, nullable=False)
    scans = relationship('Scan', back_populates='capture', cascade="all, delete-orphan, save-update")
    comments = relationship('Comment', back_populates='capture', cascade="all, delete-orphan, save-update")
    tags = relationship('Tag', back_populates='capture', cascade="all, delete-orphan, save-update")
    user = relationship('User', back_populates="captures")

    @property
    def publicId(self):
        return self.public_id

    @property
    def displayName(self):
        return self.display_name

    @displayName.setter
    def displayName(self, displayName):
        self.display_name = displayName

    def to_dict(self):
        return {
            'id': self.id,
            'asset_folder': self.asset_folder,
            'bytes': self.bytes,
            'display_name': self.display_name,
            'format': self.format,
            'width': self.width,
            'height': self.height,
            'public_id': self.public_id,
            'resource_type': self.resource_type,
            'secure_url': self.secure_url,
            'signature': self.signature
        }
