
import numpy as np

def test_hypothesis(hypothesis):
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


def test_compute_cost_reg(compute_cost_reg):
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
  expected = 11.945625
  actual = compute_cost_reg(X, y, theta, 0.1)
  np.testing.assert_almost_equal(actual, expected)

# TO BE CHECKED
def test_compute_gradient(compute_gradient):
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
  expected = ([[ -4.7 ],
              [-14.95]])
  actual = compute_gradient(X, y, theta)
  np.testing.assert_almost_equal(actual, expected)

# TO BE CHECKED
def test_compute_gradient_reg(compute_gradient_reg):
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
  expected = ([[  -4.6975 ],
               [ -14.945  ]])
  actual = compute_gradient_reg(X, y, theta, 0.1)
  np.testing.assert_almost_equal(actual, expected)


def test_gradient_descent(gradient_descent):
  X = np.array([[1, 5],
                [1, 2],
                [1, 4],
                [1, 5]])
  y = np.array([[1],
                [6],
                [4],
                [2]])
  theta = np.array([[0],
                    [0]])
  alpha = 0.01;
  numOfIter = 100;
  reg_lambda = 0

  expectedTheta = np.array([[ 0.8492],
                            [ 0.4291]])
  # with 1000 iterations
  # expectedTheta = np.array([[ 5.2148],
  #                           [-0.5733]])
  # expectedJHist_0 = 0.85426;
  [actualTheta, actualJHist] = gradient_descent(X, y, theta, reg_lambda, alpha, numOfIter)
  np.testing.assert_almost_equal(actualTheta, expectedTheta, decimal=4)
  # np.testing.assert_almost_equal(actualJHist[0], expectedJHist_0, decimal=4)



