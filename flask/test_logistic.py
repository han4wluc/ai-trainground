
import test_cases.logistic_regression as logistic_regression
import numpy as np
import unittest

def sigmoid(z):
  return 1.0 / (1 + np.exp(-z))

def hypothesis(X, theta):
  h = np.dot(X, theta)
  return sigmoid(h)

def compute_cost(X, y, theta):
  m = X.shape[0]
  h = hypothesis(X, theta)
  e1 = np.dot(y.T, np.log(h))
  e2 = np.dot((1-y).T, np.log(1-h))
  errors = np.sum(e1 + e2)
  constant = -1.0/m
  return constant * errors

def compute_cost_reg(X, y, theta, reg_lambda):
  m = X.shape[0]
  h = hypothesis(X, theta)
  e1 = np.dot(y.T, np.log(h))
  e2 = np.dot((1-y).T, np.log(1-h))
  errors = np.sum(e1 + e2)
  reg = (reg_lambda / (2.0 * m)) * (theta ** 2).sum()
  constant = -1.0/m
  return constant * (errors + reg)

def compute_gradient(X, y, theta):
  m = X.shape[0]
  h = hypothesis(X, theta)
  errors = h - y
  errors = np.dot(X.T, errors)
  constant = 1.0/m
  return constant * errors

def compute_gradient_reg(X, y, theta, reg_lambda):
  m = X.shape[0]
  h = hypothesis(X, theta)
  errors = h - y
  errors = np.dot(X.T, errors)
  constant = 1.0/m
  reg = reg_lambda * theta
  return constant * (errors + theta)

def gradient_descent(X, y, theta, reg_lambda, alpha, num_iters):
  m = X.shape[0]
  costs = []
  for i in range(num_iters):
    cost = compute_cost_reg(X, y, theta, reg_lambda)
    costs.append(cost)

    gradient = compute_gradient_reg(X, y, theta, reg_lambda)
    theta = theta - (alpha * gradient)

  return [theta, costs]

class TestMyTests(unittest.TestCase):

  def test_sigmoid(self):
    logistic_regression.test_sigmoid(sigmoid)

  # TO BE CHECKED
  def test_hypothesis(self):
    logistic_regression.test_hypothesis(hypothesis)

  # TO BE CHECKED
  def test_compute_cost(self):
    logistic_regression.test_compute_cost(compute_cost)

  # TO BE CHECKED
  def test_compute_cost_reg(self):
    logistic_regression.test_compute_cost_reg(compute_cost_reg)

  # TO BE CHECKED
  def test_compute_gradient(self):
    logistic_regression.test_compute_gradient(compute_gradient)

  # TO BE CHECKED
  def test_compute_gradient_reg(self):
    logistic_regression.test_compute_gradient_reg(compute_gradient_reg)

  def test_gradient_descent(self):
    logistic_regression.test_gradient_descent(gradient_descent)

if __name__ == '__main__':
    unittest.main()
