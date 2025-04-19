from flask import request, jsonify, make_response
from flask_restx import Resource, fields, Namespace
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
from models import User

auth_ns = Namespace('auth', description='A namespace for our Authentication')

signup_model = auth_ns.model(
    "Signup",
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String(),
    },
)

login_model = auth_ns.model(
    "Login",
    {
        "email": fields.String(),
        "password": fields.String(),
    },
)

# Signup
@auth_ns.route("/signup")
class SignupResource(Resource):
    @auth_ns.expect(signup_model)
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
        return make_response(jsonify({"message": "User created successfully", data:{
            "username": new_user.username,
            "email": new_user.email,
        }}), 200)

# Login
@auth_ns.route("/login")
class LoginResource(Resource):
    @auth_ns.expect(login_model)
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
                    "refresh_token": refresh_token,
                    "data":{
                        "username": user.username,
                        "email": user.email,
                    }
                }, 200

        return {"message": "Invalid credentials"}, 401
    
@auth_ns.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token": access_token}), 200)
    
