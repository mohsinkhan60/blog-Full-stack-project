from flask import Flask, request, jsonify, make_response
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Blogs, User
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, create_refresh_token

app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)

migrate = Migrate(app, db)
JWTManager(app)

api = Api(app, doc="/docs")

blogs_model = api.model(
    "Blogs",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String(),
        "author": fields.String(),
    },
)
signup_model = api.model(
    "Signup",
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String(),
    },
)

login_model = api.model(
    "Login",
    {
        "email": fields.String(),
        "password": fields.String(),
    },
)

# Signup
@api.route("/signup")
class SignupResource(Resource):
    @api.expect(signup_model)
    def post(self):
        data = request.get_json()


        username=data.get('username')

        db_user = User.query.filter_by(username=username).first()
        
        if db_user is not None:
            return {"message": f"{username} already exists"}, 400
        
        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
        new_user.save()
        return make_response(jsonify({"message": "User created successfully"}), 200)

# Login
@api.route("/login")
class LoginResource(Resource):
    @api.expect(login_model)
    def post(self):
        data = request.get_json()
        
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()

        if user:
            if check_password_hash(user.password, password):
                access_token = create_access_token(identity=user.email)
                refresh_token = create_refresh_token(identity=user.email)
                return {
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }, 200

        return {"message": "Invalid credentials"}, 401
    
@api.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token": access_token}), 200)
    

@api.route("/hello")
class HelloWorld(Resource):
    def get(self):
        return {"message": "Hello, World!"}
    
@api.route("/blogs")
class BlogsResource(Resource):
    @api.marshal_with(blogs_model)
    def get(self):
        blogs = Blogs.query.all()
        return blogs

    @api.marshal_with(blogs_model)
    # For showing payload in Docs Or Swagger
    @api.expect(blogs_model) 
    @jwt_required()
    def post(self):
        data = request.get_json()
        new_blog = Blogs(
            title=data.get("title"),
            description=data.get("description"),
            author=data.get("author"),
        )
        new_blog.save()
        return new_blog, 201
    
@api.route("/blogs/<int:id>")
class BlogResource(Resource):
    @api.marshal_with(blogs_model)
    def get(self, id):
        blog = Blogs.query.get_or_404(id)
        return blog

    @api.marshal_with(blogs_model)
    @api.expect(blogs_model)
    @jwt_required()
    def put(self, id):
        data = request.get_json()
        blog = Blogs.query.get_or_404(id)
        blog.update(
            title=data.get("title"),
            description=data.get("description"),
            author=data.get("author"),
        )
        return blog

    @api.marshal_with(blogs_model)
    @jwt_required()
    @api.expect(blogs_model)
    def delete(self, id):
        blog = Blogs.query.get_or_404(id)
        blog.delete()
        return {"message": "Blog deleted"}, 204
    


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)