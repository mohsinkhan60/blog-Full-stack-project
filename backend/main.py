from flask import Flask, request, jsonify, render_template
from flask_restx import Api
from models import Blogs, User
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from auth import auth_ns
from blogs import blog_ns
from werkzeug.utils import secure_filename
import os

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    app.config['SECRET_KEY'] = 'your_secret_key_here'
    app.config['UPLOAD_FOLDER'] = 'static/files'

    CORS(app)

    db.init_app(app)
    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc='/docs')
    api.add_namespace(blog_ns)
    api.add_namespace(auth_ns)

    # File upload route
    @app.route('/upload', methods=['POST'])
    def upload_file():
        if 'file' not in request.files:
            return jsonify({"message": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"message": "No selected file"}), 400

        if file:
            try:
                filename = secure_filename(file.filename)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                return jsonify({"message": "File has been uploaded successfully!", "file_path": file_path}), 201
            except Exception as e:
                return jsonify({"message": f"An error occurred while saving the file: {str(e)}"}), 500

        return jsonify({"message": "Unknown error occurred"}), 500

    # Ensure the upload folder exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    return app