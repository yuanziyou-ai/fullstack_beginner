# 创建数据库模型,以及增删改查方法
from exts import db

"""
class Recipt:
    id:int primary key
    title:str
    description:str(text)
"""

class Recipe(db.Model):
    # 定义表名
    __tablename__ = 'recipe'
    # 定义字段
    # db.Column 表示是一个字段
    id=db.Column(db.Integer(),primary_key=True)
    title=db.Column(db.String(255),nullable=False)
    description=db.Column(db.Text(255),nullable=False)

    # 作用于当前对象self 你返回的只是极端值
    # 极值只有食谱和食谱的标题
    def __repr__(self):
        return f"<Recipe {self.title}>"
# 保存到数据库
    def save(self):
        db.session.add(self)
        db.session.commit()
# 删除方法
    def delete(self):
        db.session.delete(self)
        db.session.commit()
# 更新方法
    def update(self,title,description):
        self.title=title
        self.description=description
    # 将数据提交到数据库
        db.session.commit()

# user model
# 数据库迁移
# 创建User类,有利于用户的信息注册和登录
"""
class User:
    id:integer
    username:string
    email:string
    password:string
"""
class User(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    # 将用户名作为唯一的纽带
    username=db.Column(db.String(25),nullable=False,unique=True)
    email=db.Column(db.String(80),nullable=False)
    password=db.Column(db.Text(),nullable=False)

# 返回对象的字符串显示
    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
