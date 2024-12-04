from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Image

def check_length(form, field):
    comment = field.data
    if len(comment) <= 0:
        raise ValidationError('Comment cant be empty')
    elif len(comment) > 255:
        raise ValidationError('Max characters for comment is 255')

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(), check_length])
    submit = SubmitField('submit')
