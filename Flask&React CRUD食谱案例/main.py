from flask import Flask
# 理解来自多个视图的返回值
from flask_restx import Api
# 导入食谱模型
from models import Recipe,User
from exts import db
# 处理数据库迁移的工具
# 当数据模型中的数据发生变化时,重新映射到数据库中
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
# 导入模型
from auth import auth_ns
from recipes import recipe_ns
from flask_cors import CORS


def create_app(config):
    # 创建app实例
    app=Flask(__name__)
    # 加载Devconfig文件
    app.config.from_object(config)
    CORS(app)
    db.init_app(app)
    # Migrate绑定到app和db
    migrate=Migrate(app,db)
    JWTManager(app)
    api=Api(app,doc='/docs')

    api.add_namespace(recipe_ns)
    api.add_namespace(auth_ns)
    # 上下文处理器，在模板中可见自定义变量
    @app.shell_context_processor
    def make_shell_context():
        return{
            "db":db,
            "Recipe":Recipe,
            "User":User
        }
    return app