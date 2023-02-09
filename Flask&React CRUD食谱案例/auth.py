# 单元测试
from flask_restx import Api,Resource,Namespace,fields
from models import User
# # 对字符串进行加密和对比
# # 第一个参数传入我们需要对比的密码,第二个参数传入我们的明文密码
from werkzeug.security import generate_password_hash,check_password_hash
# 刷新令牌
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required,get_jwt_identity
from flask import Flask,request,jsonify,make_response


auth_ns=Namespace('auth',description="用户注册的空间")

# 创建注册模型
signup_model=auth_ns.model(
    "Signup",
    {
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)
# 创建登陆模型
login_model=auth_ns.model(
    'Login',
    {
        "username":fields.String(),
        "password":fields.String()
    }
)

# 注册
@auth_ns.route('/signup')
class Signup(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
    # 访问任何客户端访问的数据
        data=request.get_json()

        username=data.get('username')
        db_user=User.query.filter_by(username=username).first()
    # 用户名不正确返回错误
        if db_user is not None:
            
            return jsonify({"message":f"用户{username}已经存在"})

        # 获取字段信息
        new_user=User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
    # 将数据保存到数据库
        new_user.save()
        # return new_user,201
        return make_response(jsonify({"message":"用户注册成功!"}),201)

# 用户登陆验证
@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data=request.get_json()

        username=data.get('username')
        password=data.get('password')
        
        db_user=User.query.filter_by(username=username).first()

        # 判断
        if db_user and check_password_hash(db_user.password,password):
            access_token=create_access_token(identity=db_user.username)
            refresh_token=create_refresh_token(identity=db_user.username)
            
            return jsonify({"access_token":access_token,"refresh_token":refresh_token})

# 设置用户登陆的时限
@auth_ns.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user=get_jwt_identity()
        new_access_token=create_access_token(identity=current_user)

        return make_response(jsonify({"access_token":new_access_token}),200)





