from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
import numpy as np

app = Flask(__name__)
CORS(app)

def hypothesis_test(hypothesis):
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


def test_compute_cost(compute_cost):
  X = np.array([[1, 2],
                [1, 3],
                [1, 4],
                [1, 5]])
  y = np.array([[ 7.],
                [ 6.], 
                [ 5.], 
                [ 4.]]);
  theta = np.array([[0.1],
                    [0.2]])
  expected = 11.9450

  actual = compute_cost(X, y, theta)

  np.testing.assert_array_equal(actual, expected)


@app.route('/hypothesis', methods = ['POST'])
def route_hypothesis():
    inpt = request.json[u'inpt']
    print 'inpt', inpt
    try:
      exec(str(inpt))

      hypothesis_test(hypothesis)
      
      return json.dumps({
        "success": True
      })
    except Exception as e:
      return json.dumps({
        "success": False,
        "message": str(e),
      })

@app.route('/compute-cost', methods = ['POST'])
def route_compute_cost():
    my_json = request.json
    inpt = my_json[u'inpt']
    print 'inpt', inpt
    try:
      exec(str(inpt))

      test_compute_cost(compute_cost)

      return json.dumps({
        "success": True
      })
    except Exception as e:
      return json.dumps({
        "success": False,
        "message": str(e),
      })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)
    # app.run()
