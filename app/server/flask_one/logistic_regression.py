
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
  expectedTheta = np.array([[1.7760],
                            [2.3988],
                            [1.9464]])
  actualJ = compute_cost(X, y, theta)
  # [actualJ, actualTheta] = LR.costFunction(X, y, theta)
  np.testing.assert_almost_equal(actualJ, expectedJ, decimal=4)
  # np.testing.assert_almost_equal(actualTheta, expectedTheta, decimal=4)
