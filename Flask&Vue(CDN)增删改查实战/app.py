from flask import Flask, jsonify, request
from flask_cors import CORS
from flaskext.mysql import MySQL  # pip install flask-mysql
import pymysql
import pymysql.cursors

MEMBERS = [
    {
        'id': '1',
        'firstname': 'cairocoders',
        'lastname': 'Ednalan',
        'address': 'Olongapo city'
    },
    {
        'id': '2',
        'firstname': 'clydey',
        'lastname': 'Ednalan',
        'address': 'Angles city'
    }
]
# 配置环境
DEBUG = True

# 实例化flask
app = Flask(__name__)
app.config.from_object(__name__)

mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'testingdb'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# 路由
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


@app.route('/members', methods=['GET'])
def all_members():
    return jsonify({
        'status': 'success',
        'members': MEMBERS
    })


@app.route('/')
def home():
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.execute("SELECT * from members order by id")
        userslist = cursor.fetchall()
        return jsonify({
            'status': 'success',
            'members': userslist
        })
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/insert', methods=['GET', 'POST'])
def insert():
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json(silent=True)
        firstname = post_data.get('firstname')
        lastname = post_data.get('lastname')
        address = post_data.get('address')

        print(firstname)
        print(lastname)

        sql = "INSERT INTO members(firstname,lastname,address) VALUES(%s, %s, %s)"
        data = (firstname, lastname, address)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        conn.commit()

        response_object['message'] = "Successfully Added"
    return jsonify(response_object)


@app.route('/edit/<string:id>', methods=['GET', 'POST'])
def edit(id):
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    print(id)
    cursor.execute("SELECT * FROM members WHERE id = %s", [id])
    row = cursor.fetchone()

    return jsonify({
        'status': 'success',
        'editmember': row
    })


@app.route('/update', methods=['GET', 'POST'])
def update():
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json(silent=True)
        edit_id = post_data.get('edit_id')
        edit_firstname = post_data.get('edit_firstname')
        edit_lastname = post_data.get('edit_lastname')
        edit_address = post_data.get('edit_address')

        print(edit_firstname)
        print(edit_lastname)

        cursor.execute("UPDATE members SET firstname=%s, lastname=%s, address=%s WHERE id=%s",
                       (edit_firstname, edit_lastname, edit_address, edit_id))
        conn.commit()
        cursor.close()

        response_object['message'] = "Successfully Updated"
    return jsonify(response_object)


@app.route('/delete/<string:id>', methods=['GET', 'POST'])
def delete(id):
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    response_object = {'status': 'success'}

    cursor.execute("DELETE FROM members WHERE id = %s", [id])
    conn.commit()
    cursor.close()
    response_object['message'] = "Successfully Deleted"
    return jsonify(response_object)


if __name__ == '__main__':
    app.run()
