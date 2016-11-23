
import numpy as np

def test_sigmoid(sigmoid):
  np.testing.assert_almost_equal(sigmoid(1200000), 1)
  np.testing.assert_almost_equal(sigmoid(-250), 0)
  np.testing.assert_almost_equal(sigmoid(0), 0.5)


  z = np.array([4, 5, 6])
  expected = np.array([0.9820, 0.9933, 0.9975])
  np.testing.assert_almost_equal(sigmoid(z), expected, decimal=4)
  

  z = np.array([[8, 1, 6],
                [3, 5, 7],
                [4, 9, 2],])
  expected = np.array([[0.9997, 0.7311, 0.9975],
                       [0.9526, 0.9933, 0.9991],
                       [0.9820, 0.9999, 0.8808],])
  np.testing.assert_almost_equal(sigmoid(z), expected, decimal=4)


def test_hypothesis(hypothesis):
  X = np.array([[8, 1, 6],
                [3, 5, 7],
                [4, 9, 2],
                [8, 1, 6],
                [3, 5, 7],
                [4, 9, 2]])
  y = np.array([[1],
                [0],
                [1],
                [0],
                [1],
                [0]])
  theta = np.array([[0],
                    [1],
                    [0]])
  expected = np.array([
    [0.7310],
    [0.9933],
    [0.9998],
    [0.7310],
    [0.9933],
    [0.9998],
  ])
  actual = hypothesis(X, theta)
  np.testing.assert_almost_equal(actual, expected, decimal=4)


def test_compute_cost(compute_cost):
  X = np.array([[8, 1, 6],
                [3, 5, 7],
                [4, 9, 2],
                [8, 1, 6],
                [3, 5, 7],
                [4, 9, 2]])
  y = np.array([[1],
                [0],
                [1],
                [0],
                [1],
                [0]])
  theta = np.array([[0],
                    [1],
                    [0]])
  expectedJ     = 2.6067
  actualJ = compute_cost(X, y, theta)
  np.testing.assert_almost_equal(actualJ, expectedJ, decimal=4)



def test_compute_cost_reg(compute_cost):
  X = np.array([[8, 1, 6],
                [3, 5, 7],
                [4, 9, 2],
                [8, 1, 6],
                [3, 5, 7],
                [4, 9, 2]])
  y = np.array([[1],
                [0],
                [1],
                [0],
                [1],
                [0]])
  theta = np.array([[0],
                    [1],
                    [0]])
  reg_lambda = 0.1
  expectedJ     = 2.6053
  actualJ = compute_cost(X, y, theta, reg_lambda)
  np.testing.assert_almost_equal(actualJ, expectedJ, decimal=4)


def test_compute_gradient(compute_gradient):
  X = np.array([[8, 1, 6],
                [3, 5, 7],
                [4, 9, 2],
                [8, 1, 6],
                [3, 5, 7],
                [4, 9, 2]])
  y = np.array([[1],
                [0],
                [1],
                [0],
                [1],
                [0]])
  theta = np.array([[0],
                    [1],
                    [0]])
  expected = np.array([[1.7760],
                        [2.3988],
                        [1.9464]])
  actual = compute_gradient(X, y, theta)
  np.testing.assert_almost_equal(actual, expected, decimal=4)


def test_compute_gradient_reg(compute_gradient_reg):
  X = np.array([[8, 1, 6],
                [3, 5, 7],
                [4, 9, 2],
                [8, 1, 6],
                [3, 5, 7],
                [4, 9, 2]])
  y = np.array([[1],
                [0],
                [1],
                [0],
                [1],
                [0]])
  theta = np.array([[0],
                    [1],
                    [0]])
  reg_lambda = 0.01
  expected = np.array([[1.7759],
                       [2.5654],
                       [1.9464]])
  actual = compute_gradient_reg(X, y, theta, reg_lambda)
  np.testing.assert_almost_equal(actual, expected, decimal=4)


def test_gradient_descent(gradient_descent):
  def featureNormalize(X):
    '''
    Returns a normalized version of X where
    the mean value of each feature is 0 and the standard deviation
    is 1. This is often a good preprocessing step to do when
    working with learning algorithms.
    '''
    mean = np.mean(X, axis=0)
    std = np.std(X, axis=0, ddof=1)
    return (X - mean)/std

  X = np.array([[1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
                [2, 2, 1],
                [3, 2, 1],
                [15, 14, 13],
                [15, 14, 14],
                [13, 13, 15],
                [12, 4, 5],
                [13, 13, 13],])
  X = featureNormalize(X)

  X_test = X[-2:]
  X = X[:-2]
  y = np.array([[0],
                [0],
                [0],
                [0],
                [0],
                [1],
                [1],
                [1]])

  theta = np.array([[0.1],
                    [0.1],
                    [0.1]])
  alpha = 0.01
  reg_lambda = 0.01
  num_iters = 1000
  actual_theta, actual_cost_hist = gradient_descent(X, y, theta, reg_lambda, alpha, num_iters)
  
  expected_theta = np.array([
    [0.7708],
    [0.7393],
    [0.7435]
  ])
  expected_cost_0 = 0.5587

  # print 'theta', theta
  # print 'cost_hist', cost_hist
  
  np.testing.assert_almost_equal(actual_theta, expected_theta, decimal=4)
  np.testing.assert_almost_equal(actual_cost_hist[0], expected_cost_0, decimal=4)

  # predicted =  hypothesis(X_test, theta)
  # np.testing.assert_equal(predicted[0][0] < 0.5, True)
  # np.testing.assert_equal(predicted[1][0] > 0.5, True)


