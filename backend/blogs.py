from flask_restx import Namespace, Resource, fields
from flask import request
from models import Blogs
from flask_jwt_extended import jwt_required

blog_ns = Namespace('blog', description='A namespace for our Blogs')

# Output model (includes ID)
blogs_model = blog_ns.model("Blogs", {
    "id": fields.Integer(readonly=True),
    "title": fields.String(),
    "description": fields.String(),
    "author": fields.String(),
    "image": fields.String(),
})

# Input model (for POST & PUT, excludes ID)
blog_input_model = blog_ns.model("BlogInput", {
    "title": fields.String(required=True),
    "description": fields.String(required=True),
    "author": fields.String(required=True),
    "image": fields.String(required=True),
})

@blog_ns.route("/hello")
class HelloWorld(Resource):
    def get(self):
        return {"message": "Hello, World!"}


@blog_ns.route("/blogs")
class BlogsResource(Resource):
    @blog_ns.marshal_with(blogs_model)
    def get(self):
        blogs = Blogs.query.all()
        return blogs

    @jwt_required()
    @blog_ns.expect(blog_input_model)
    @blog_ns.marshal_with(blogs_model, code=201)
    def post(self):
        try:
            data = request.get_json()
            print("Incoming Blog:", data)

            new_blog = Blogs(
                title=data.get("title"),
                description=data.get("description"),
                author=data.get("author"),
                image=data.get("image"),
            )
            new_blog.save()
            return new_blog, 201
        except Exception as e:
            print("Error while saving blog:", str(e))
            return {"message": "Internal Server Error"}, 500


@blog_ns.route("/blogs/<int:id>")
class BlogResource(Resource):
    @blog_ns.marshal_with(blogs_model)
    def get(self, id):
        blog = Blogs.query.get_or_404(id)
        return blog

    @jwt_required()
    @blog_ns.expect(blog_input_model)
    @blog_ns.marshal_with(blogs_model)
    def put(self, id):
        data = request.get_json()
        blog = Blogs.query.get_or_404(id)
        blog.update(
            title=data.get("title"),
            description=data.get("description"),
            author=data.get("author"),
            image=data.get("image"),
        )
        return blog

    @jwt_required()
    def delete(self, id):
        blog = Blogs.query.get_or_404(id)
        blog.delete()
        return {"message": "Blog deleted"}, 204
