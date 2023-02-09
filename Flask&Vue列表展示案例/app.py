from flask import Flask, jsonify
from flask_cors import CORS

MEMBERS = [
    {
        'id': '1',
        'name': '张三',
        'email': 'zhangsan@gmail.com',
        'address': '北京'
    },
    {
        'id': '2',
        'name': '李四',
        'email': 'lishi@gmail.com',
        'address': '上海'
    },
    {
        'id': '3',
        'name': '王五',
        'email': 'wangwu@gmail.com',
        'address': '广州'
    }
]

# 配置参数
DEBUG = True

# 实例化Flask
app = Flask(__name__)
app.config.from_object(__name__)

# 使用cros
CORS(app, resources={r'/*': {'origins': '*'}})


# 检查路由
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


@app.route('/members', methods=['GET'])
def all_members():
    return jsonify({
        'status': 'success',
        'members': MEMBERS
    })


if __name__ == '__main__':
    app.run()
