import React from 'react';
import { connect } from 'react-redux';
import { actionType as homeSaga } from 'Saga/home.saga';

class Login extends React.Component {
  componentWillMount() {
    const { dispatch, history } = this.props;
    const code = history.location.search.split('=')[1];
    dispatch({
      type: homeSaga.login,
      payload: {
        query: { code },
        history,
      },
    });
  }

  render() {
    return (
      <div />
    );
  }
}

export default connect()(Login);

