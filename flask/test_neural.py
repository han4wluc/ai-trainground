
import test_cases.neural_network as neural_network
import numpy as np
import unittest

def forward_propagation(X, w1, b1, w2, b2):

  def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

  activation = sigmoid

  a1 = X
  z2 = np.dot(a1, w1) + b1
  a2 = activation(z2)
  z3 = np.dot(a2, w2) + b2
  a3 = activation(z3)
  return a3


def compute_cost(X, y, w1, b1, w2, b2, reg_lambda):
  m = X.shape[0]
  hypothesis = forward_propagation

  h = hypothesis(X, w1, b1, w2, b2)
  e1 = np.dot(y.T, np.log(h))
  e2 = np.dot((1-y.T), np.log(1-h))
  errors = (e1 + e2).sum()

  reg = (reg_lambda/(2.0*m)) * ((w1 ** 2).sum() + (w2 ** 2).sum())

  return (-(1.0/m) * errors) + reg

def backward_propagation(X, y, w1, b1, w2, b2, alpha, reg_lambda):

  def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

  def dsigmoid(z):
    return (z) * (1 - (z))

  activation = sigmoid

  a1 = X
  z2 = np.dot(a1, w1) + b1
  a2 = activation(z2)
  z3 = np.dot(a2, w2) + b2
  a3 = activation(z3)

  delta3 = a3 - y

  delta2 = np.dot(delta3, w2.T) *( dsigmoid(a2) )
  # delta1 = np.dot(delta2.T, w1.T) * dsigmoid(a1)

  dW2 = np.dot(a2.T, delta3) + reg_lambda * w2
  dB2 = np.sum(delta3, axis=0, keepdims=True)

  dW1 = np.dot(a1.T, delta2) + reg_lambda * w1
  dB1 = np.sum(delta2, axis=0, keepdims=True)

  w1 -= alpha * dW1
  b1 -= alpha * dB1
  w2 -= alpha * dW2
  b2 -= alpha * dB2

  return w1, b1, w2, b2


def compute_gradient(X, y, w1, b1, w2, b2, alpha, reg_lambda):

  def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

  def dsigmoid(z):
    return (z) * (1 - (z))

  activation = sigmoid

  a1 = X
  z2 = np.dot(a1, w1) + b1
  a2 = activation(z2)
  z3 = np.dot(a2, w2) + b2
  a3 = activation(z3)

  delta3 = a3 - y

  delta2 = np.dot(delta3, w2.T) *( dsigmoid(a2) )
  # delta1 = np.dot(delta2.T, w1.T) * dsigmoid(a1)

  dW2 = np.dot(a2.T, delta3) + reg_lambda * w2
  dB2 = np.sum(delta3, axis=0, keepdims=True)

  dW1 = np.dot(a1.T, delta2) + reg_lambda * w1
  dB1 = np.sum(delta2, axis=0, keepdims=True)

  return dW1, dB1, dW2, dB2


def gradient_descent(X, y, w1, b1, w2, b2, alpha, reg_lambda, num_iters):

  costs = []
  for i in range(num_iters):
    cost = compute_cost(X, y, w1, b1, w2, b2, reg_lambda)
    costs.append(cost)
    w1, b1, w2, b2 = backward_propagation(X, y, w1, b1, w2, b2, alpha, reg_lambda)

  # print 'costs', costs

  return w1, b1, w2, b2, costs


class NeuralNetwork(unittest.TestCase):

  def test_forward_propagation(self):
    neural_network.test_forward_propagation(forward_propagation)

  def test_compute_cost(self):
    neural_network.test_compute_cost(compute_cost)

  def test_backward_propagation(self):
    neural_network.test_backward_propagation(backward_propagation)

  def test_gradient_descent(self):
    neural_network.test_gradient_descent(gradient_descent)

if __name__ == '__main__':
    unittest.main()

