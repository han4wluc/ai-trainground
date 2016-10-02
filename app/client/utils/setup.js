
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
