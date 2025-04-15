from flask import Flask, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Blogs, User
from exts import db
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)

migrate = Migrate(app, db)

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

@api.route("/signup")
class SignupResource(Resource):
    @api.expect(signup_model)
    def post(self):
        data = request.get_json()
        new_user = User(
            username=data.get("username"),
            email=data.get("email"),
            password=data.get("password"),
        )
        new_user.save()
        return {"message": "User created successfully"}, 201

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
    def put(self, id):
        data = request.get_json()
        blog = Blogs.query.get_or_404(id)
        blog.update(
            title=data.get("title"),
            description=data.get("description"),
            author=data.get("author"),
        )
        return blog

    def delete(self, id):
        blog = Blogs.query.get_or_404(id)
        blog.delete()
        return {"message": "Blog deleted"}, 204
    


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)