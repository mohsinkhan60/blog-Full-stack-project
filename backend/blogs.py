from flask_restx import Namespace, Resource, fields
from flask import request
from flask_restx import Resource, fields
from models import Blogs
from flask_jwt_extended import jwt_required


blog_ns = Namespace('blog', description='A namespace for our Recipes')

blogs_model = blog_ns.model(
    "Blogs",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String(),
        "author": fields.String(),
    },
)
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

    @blog_ns.marshal_with(blogs_model)
    # For showing payload in Docs Or Swagger
    @blog_ns.expect(blogs_model) 
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
    
@blog_ns.route("/blogs/<int:id>")
class BlogResource(Resource):
    @blog_ns.marshal_with(blogs_model)
    def get(self, id):
        blog = Blogs.query.get_or_404(id)
        return blog

    @blog_ns.marshal_with(blogs_model)
    @blog_ns.expect(blogs_model)
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

    @blog_ns.marshal_with(blogs_model)
    @jwt_required()
    @blog_ns.expect(blogs_model)
    def delete(self, id):
        blog = Blogs.query.get_or_404(id)
        blog.delete()
        return {"message": "Blog deleted"}, 204
    
