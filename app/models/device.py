from .db import db, environment, SCHEMA
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Device(db.Model):
    __tablename__ = 'devices'

    if environment == "production":
        _table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String)
    ip_address = db.Column(db.String, nullable=False)
    mac_address = db.Column(db.String)
    user = relationship('User', back_populates='devices')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'type': self.type,
            'ip_address': self.ip_address,
            'mac_address': self.mac_address
        }
