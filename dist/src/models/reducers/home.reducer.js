import createReducer from './createReducer';

/* eslint-disable arrow-body-style */
const initState = {
  isLoading: false,
};

export const actionType = {
  loading: 'home/loading',
};

const reducer = {
  [actionType.loading]: (state, { payload }) => ({
    ...state, isLoading: payload,
  }),
};


export default createReducer(initState, reducer);
