from .db import db, environment, SCHEMA

class SearchQuery(db.Model):
    __tablename__ = 'searchQueries'

    if environment == "production":
        _table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url
        }
