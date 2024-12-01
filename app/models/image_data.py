from .db import db, environment, SCHEMA



class Image(db.model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    asset_folder = db.Column(db.String, nullable=False)
    bytes = db.Column(db.Integer, nullable=False)
    display_name = db.Column(db.String, nullable=False)
    eTag = db.Column(db.String, nullable=False)
    format = db.Column(db.String, nullable=False)
    width = db.Column(db.Integer, nullable=False)
    height = db.Column(db.Integer, nullable=False)
    original_filename = db.Column(db.String, nullable=False)
    public_id = db.Column(db.String, nullable=False, unique=True)
    resource_type = db.Column(db.String, nullable=False)
    secure_url = db.Column(db.String, nullable=False)
    signature = db.Column(db.String, nullable=False)

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
            'eTag': self.eTag,
            'format': self.format,
            'width': self.width,
            'height': self.height,
            'original_filename': self.original_filename,
            'public_id': self.public_id,
            'resource_type': self.resource_type,
            'secure_url': self.secure_url,
            'signature': self.signature
        }
