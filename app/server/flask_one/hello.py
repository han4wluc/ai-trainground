from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
import numpy as np

app = Flask(__name__)
CORS(app)

# @app.route("/")
# def hello():
#     # try:
#     #     # do something
#     # except Exception, e:
#     #     # handle it
#     # return "Hello World!"

@app.route('/', methods = ['POST'])
def getPersonById():
    # personId = int(request.form['personId'])
    # return str(personId)
    # inpt = request.form['inpt']
    # print 'inpt', inpt
    # print request.__dict__

    my_json = request.json
    inpt = my_json[u'inpt']
    print 'inpt', inpt
    # return inpt
    try:
      # print 'inpt', inpt
      exec(str(inpt))
      print 'success'
      
      X = np.array(
        [[1, 2, 3],
         [1, 3, 4],
         [1, 4, 5],
         [1, 5, 6]]
      )
      theta = np.array([[0],[1],[2]])

      expected = np.array(
        [ [8], [11], [14], [17]]
      )

      actual = hypothesis(X, theta)

      np.testing.assert_array_equal(actual, expected)

      # assert actual == expected, (actual, expected)

      return json.dumps({
        "success": True
      })
    except Exception as e:
      # return str(e)
      print 'fail', e
      return json.dumps({
        "success": False,
        "message": str(e),
      })
      # return 'hello'

# curl -d "inpt=hellowallo" https://localhost:3000

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)
    # app.run()
