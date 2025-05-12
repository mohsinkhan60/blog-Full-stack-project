from flask import Flask
from flask_restx import Api
from flask_migrate import Migrate
from models import Blogs,User
from exts import db
from flask_jwt_extended import JWTManager
from auth import auth_ns
from blogs import blog_ns
from flask_cors import CORS

def create_app(config):

    app = Flask(__name__)
    app.config.from_object(config)

    CORS(app)

    db.init_app(app)
    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc='/docs')
    api.add_namespace(blog_ns)
    api.add_namespace(auth_ns)

    # @app.shell_context_processor
    # def make_shell_context():
    #     return {'db': db,
    #             'blog': blog,
    #             'user' : User
    #             }

    return app