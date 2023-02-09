# 有个小院
# 设置与代码的严格分离：无需重新部署应用即可更改参数：
#     将参数存储在 ini 或 .env 文件中
#     定义全面的默认值
#     将值正确转换为正确的数据类型
#     只有一个配置模块来统治您的所有实例
# 导入配置
from decouple import config
import os


# 脚本目录
BASE_DIR=os.path.dirname(os.path.realpath(__file__))
# 进行全局配置
class Config():
    # 检索配置参数
    # 密钥：对输入的信息进行加密
    SECRET_KEY=config('SECRET_KEY')
    # 将数据库设置具有全局变量
    SQLALCHEMY_TRACK_MODIFICATIONS=config('SQLALCHEMY_TRACK_MODIFICATIONS',cast=bool)

# 设置数据库信息
class DevConfig(Config):
    # 设置数据库信息导出的名称
    SQLALCHEMY_DATABASE_URI="sqlite:///"+os.path.join(BASE_DIR,'dev.db')
    # 设置可以在控制台和浏览器看到错误信息
    DEBUG=True
    # 调试数据库语句
    SQLALCHEMY_ECHO=True

class ProdConfig(Config):
    pass

# 测试的部分
class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI='sqlite:///test.db'
    SQLALCHEMY_ECHO=False
    TESTING=True