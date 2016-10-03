
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Bind state and actions to container so they can be
 * accessed from this.props.
 */
const customConnect = function(name, actions, container){
  return connect((state) => ({
    state: state[name]
  }), (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  }))(container);
};

export default {
  customConnect,
};
