
import test_cases.linear_regression as linear_regression
import numpy as np
import unittest


def hypothesis(X, theta):
  return X.dot(theta)

def compute_cost(X, y, theta):
  m = X.shape[0]
  h = np.dot(X, theta)
  errors_sq = ((h-y) ** 2).sum()
  constant = (1.0 / (2 * m))
  return constant * errors_sq

def compute_cost_reg(X, y, theta, reg_lambda):
  m = X.shape[0]
  h = np.dot(X, theta)
  errors_sq = ((h-y) ** 2).sum()
  reg = reg_lambda * (theta ** 2).sum()
  constant = (1.0 / (2 * m))
  return constant * (errors_sq + reg)

def compute_gradient(X, y, theta):
  m = X.shape[0]
  n = theta.shape[0]
  h = np.dot(X, theta)
  errors = h - y
  errors = np.dot(X.T, errors)
  constant = 1.0 / m
  return constant * errors

def compute_gradient_reg(X, y, theta, reg_lambda):
  m = X.shape[0]
  n = theta.shape[0]
  h = np.dot(X, theta)
  errors = h - y
  errors = np.dot(X.T, errors)
  reg = reg_lambda * theta
  constant = 1.0 / m
  return constant * (errors + reg)

def gradient_descent(X, y, theta, reg_lambda, alpha, num_iters):
  costs = []
  for i in range(num_iters):
    gradient = compute_gradient_reg(X, y, theta, reg_lambda)
    cost = compute_cost_reg(X, y, theta, reg_lambda)
    costs.append(cost)
    theta = theta - (alpha * gradient)
  return [theta, costs]


class LinearRegression(unittest.TestCase):

  def test_hypothesis(self):
    linear_regression.test_hypothesis(hypothesis)

  def test_compute_cost(self):
    linear_regression.test_compute_cost(compute_cost)

  def test_compute_cost_reg(self):
    linear_regression.test_compute_cost_reg(compute_cost_reg)

  # TO BE CHECKED
  def test_compute_gradient(self):
    linear_regression.test_compute_gradient(compute_gradient)

  # TO BE CHECKED
  def test_compute_gradient_reg(self):
    linear_regression.test_compute_gradient_reg(compute_gradient_reg)

  def test_gradient_descent(self):
    linear_regression.test_gradient_descent(gradient_descent)

if __name__ == '__main__':
    unittest.main()
