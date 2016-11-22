from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
import numpy as np
import test_cases.linear_regression as linear_regression
import test_cases.logistic_regression as logistic_regression

app = Flask(__name__)
CORS(app)

def perform_test(inpt, test_method, user_method):
  try:
    exec(str(inpt))
    test_method(eval(user_method))
    return json.dumps({
      "success": True
    })
  except Exception as e:
    return json.dumps({
      "success": False,
      "message": str(e),
    })



"""
Linear Regresssion
"""
@app.route('/linear-regression/hypothesis', methods = ['POST'])
def route_linear_hypothesis():
  inpt = request.json[u'inpt']
  return perform_test(inpt, linear_regression.test_hypothesis, 'hypothesis')

@app.route('/linear-regression/compute-cost', methods = ['POST'])
def route_linear_compute_cost():
  inpt = request.json[u'inpt']
  return perform_test(inpt, linear_regression.test_compute_cost, 'compute_cost')

@app.route('/linear-regression/compute-cost-reg', methods = ['POST'])
def route_linear_compute_cost_reg():  
  inpt = request.json[u'inpt']
  return perform_test(inpt, linear_regression.test_compute_cost_reg, 'compute_cost_reg')

@app.route('/linear-regression/compute-gradient', methods = ['POST'])
def route_linear_compute_gradient():  
  inpt = request.json[u'inpt']
  return perform_test(inpt, linear_regression.test_compute_gradient, 'compute_gradient')

@app.route('/linear-regression/compute-gradient-reg', methods = ['POST'])
def route_linear_compute_gradient_reg():  
  inpt = request.json[u'inpt']
  return perform_test(inpt, linear_regression.test_compute_gradient_reg, 'compute_gradient_reg')

@app.route('/linear-regression/gradient-descent', methods = ['POST'])
def route_linear_gradient_descent():  
  inpt = request.json[u'inpt']
  return perform_test(inpt, linear_regression.test_gradient_descent, 'gradient_descent')


"""
Logistic Regression
"""
@app.route('/logistic-regression/sigmoid', methods = ['POST'])
def route_logistic_hypothesis():
  inpt = request.json[u'inpt']
  return perform_test(inpt, logistic_regression.test_sigmoid, 'sigmoid')

@app.route('/logistic-regression/compute-cost', methods = ['POST'])
def route_logistic_compute_cost():
  inpt = request.json[u'inpt']
  return perform_test(inpt, logistic_regression.test_compute_cost, 'compute_cost')





if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)
