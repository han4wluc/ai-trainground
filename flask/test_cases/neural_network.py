
import numpy as np

# 2  4  2
def test_forward_propagation(forward_propagation):

  rand = np.random.RandomState(13)
  X = rand.rand(4,4)

  w1 = rand.rand(4,2)
  b1 = 0.01
  w2 = rand.rand(2,1)
  b2 = 0.01

  y = rand.rand(4,1)

  expected = np.array([
    [0.5218],
    [0.5213],
    [0.5182],
    [0.5196],
  ])
  actual = forward_propagation(X, w1, b1, w2, b2)

  np.testing.assert_almost_equal(actual, expected, decimal=4)

def test_compute_cost(compute_cost):
  rand = np.random.RandomState(13)
  X = rand.rand(4,4)

  w1 = rand.rand(4,2)
  b1 = 0.01
  w2 = rand.rand(2,1)
  b2 = 0.01
  y = rand.rand(4,1)
  reg_lambda = 0.01

  expected = 0.6900

  actual = compute_cost(X, y, w1, b1, w2, b2, reg_lambda)

  np.testing.assert_almost_equal(actual, expected, decimal=4)

def test_backward_propagation(backward_propagation):

  rand = np.random.RandomState(13)
  X = rand.rand(4,4)
  w1 = rand.rand(4,2)
  b1 = 0.01
  w2 = rand.rand(2,1)
  b2 = 0.01
  y = rand.rand(4,1)
  alpha = 0.01
  reg_lambda = 0.1
  expected_w1 = np.array([
    [ 0.2560,  0.3472],
    [ 0.0093,  0.3579],
    [ 0.9481,  0.2177],
    [ 0.3190,  0.9168]
  ])
  expected_b1 = np.array([
    [ 0.0100,  0.010]
  ])
  expected_w2 = np.array([
    [ 0.0339],
    [ 0.0669]
  ])
  expected_b2 = np.array([
    [ 0.0117]
  ])

  expected = [expected_w1,expected_b1,expected_w2,expected_b2]
  actual  = backward_propagation(X, y, w1, b1, w2, b2, alpha, reg_lambda)

  np.testing.assert_almost_equal(actual[0], expected[0], decimal=4)
  np.testing.assert_almost_equal(actual[1], expected[1], decimal=4)
  np.testing.assert_almost_equal(actual[2], expected[2], decimal=4)
  np.testing.assert_almost_equal(actual[3], expected[3], decimal=4)

def test_gradient_descent(gradient_descent):
  rand = np.random.RandomState(13)
  X = rand.rand(4,4)
  w1 = rand.rand(4,2)
  b1 = 0.01
  w2 = rand.rand(2,1)
  b2 = 0.01
  y = rand.rand(4,1)
  alpha = 0.1
  reg_lambda = 0.01
  num_iters = 20

  expected_w1 = np.array([
    [ 0.2562,  0.3475],
    [ 0.0094,  0.3583],
    [ 0.9491,  0.2179],
    [ 0.3194,  0.9178]
  ])
  expected_b1 = np.array([
    [ 0.0100,  0.010]
  ])
  expected_w2 = np.array([
    [ 0.0339],
    [ 0.0669]
  ])
  expected_b2 = np.array([
    [ 0.0117]
  ])
  expected_costs = [1,2,3,4,5,6]

  expected = [expected_w1,expected_b1,expected_w2,expected_b2,expected_costs]
  actual  = gradient_descent(X, y, w1, b1, w2, b2, alpha, reg_lambda, num_iters)

  # np.testing.assert_almost_equal(actual[0], expected[0], decimal=4)
  # np.testing.assert_almost_equal(actual[1], expected[1], decimal=4)
  # np.testing.assert_almost_equal(actual[2], expected[2], decimal=4)
  # np.testing.assert_almost_equal(actual[3], expected[3], decimal=4)
  np.testing.assert_almost_equal(len(actual[4]), 20, decimal=4)
  


