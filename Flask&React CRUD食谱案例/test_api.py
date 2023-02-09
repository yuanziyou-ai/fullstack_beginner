# 应用程序测试接口
import unittest
from main import create_app
from config import TestConfig
from exts import db


# 创建api测试类
class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app=create_app(TestConfig)
        self.client=self.app.test_client(self)

        # 获取数据库信息
        with self.app.app_context():
            db.init_app(self.app)
            db.create_all()
# 测试hello页面
    def test_hello_world(self):
        hello_response=self.client.get('/recipe/hello')
        json=hello_response.json

        # print(json)
        self.assertEqual(json,{"message":"Hello World"})
# 测试注册页面
    def test_signup(self):
        signup_response=self.client.post('/auth/signup',
        json={
            "username":"testuser",
            "email":"testuser@qq.com",
            "password":"password"
        }
        )
        # 设置一个相应号
        status_code=signup_response.status_code
        self.assertEqual(status_code,201)

# 测试登陆页面
    def test_login(self):
        # 首先先注册在登陆
        signup_response=self.client.post('/auth/signup',
        json={
            "username":"testuser",
            "email":"testuser@qq.com",
            "password":"password"
        }
        )
        login_response=self.client.post('/auth/login',
        json={
            "username":"testuser",
            "password":"password"
        }
        )
        # 设置一个相应号
        status_code=login_response.status_code
        # json=login_response.json
        # print(json)
        self.assertEqual(status_code,200)

# 测试获取食谱全部信息
    def test_get_all_recipes(self):
        """get all recipes"""
        response=self.client.get('/recipe/recipes')
        # print(response.json)
        # 设置一个相应号
        status_code=response.status_code

        self.assertEqual(status_code,200)

# 测试获取通过id获取食谱
    def test_get_one_recipe(self):
        """get a recipe by id"""
        # 先设置要查询的id的值
        id=1
        response=self.client.get('/recipe/recipe/{id}')
        # 设置一个相应号
        status_code=response.status_code

        self.assertEqual(status_code,404)
# 测试创建食谱
    def test_create_recipe(self):
        signup_response=self.client.post('/auth/signup',
        json={
            "username":"testuser",
            "email":"testuser@qq.com",
            "password":"password"
        }
        ),
        login_response=self.client.post('/auth/login',
        json={
            "username":"testuser",
            "password":"password"
        }
        )
        # print(login_response.json["access_token"])
        access_token=login_response.json["access_token"]
        create_recipe_response=self.client.post(
            '/recipe/recipes',
            json={
                "title":"Test Cookie",
                "description":"Test Description"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )
        # print(create_recipe_response.json)
        status_code=create_recipe_response.status_code

        self.assertEqual(status_code,201)
# 测试更新食谱
    def test_update_recipe(self):
        signup_response=self.client.post('/auth/signup',
        json={
            "username":"testuser",
            "email":"testuser@qq.com",
            "password":"password"
        }
        ),
        login_response=self.client.post('/auth/login',
        json={
            "username":"testuser",
            "password":"password"
        }
        )
        access_token=login_response.json["access_token"]
        create_recipe_response=self.client.post(
            '/recipe/recipes',
            json={
                "title":"Test Cookie",
                "description":"Test Description"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )
        # 声明更新的id
        id=1
        update_recipe_response=self.client.put(
            f'/recipe/recipe/{id}',
            json={
                "title":"Test Cookie Updated",
                "description":"Test Description Updated"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )
        status_code=update_recipe_response.status_code
        # print(update_recipe_response.json)
        self.assertEqual(status_code,200)      
# 测试删除食谱
    def test_delete_recipe(self):
        signup_response=self.client.post('/auth/signup',
        json={
            "username":"testuser",
            "email":"testuser@qq.com",
            "password":"password"
        }
        ),
        login_response=self.client.post('/auth/login',
        json={
            "username":"testuser",
            "password":"password"
        }
        )
        access_token=login_response.json["access_token"]
        create_recipe_response=self.client.post(
            '/recipe/recipes',
            json={
                "title":"Test Cookie",
                "description":"Test Description"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )
        # 声明删除的id
        id=1
        delete_recipe_response=self.client.delete(
            f'/recipe/recipe/{id}',
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )
        print(delete_recipe_response.json)
        status_code=delete_recipe_response.status_code
        self.assertEqual(status_code,200)   
    def tearDown(self):
                # 移除数据库信息
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


# 运行app
if __name__=="__main__":
    unittest.main()


