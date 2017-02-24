import { ActionTypes } from '../constants/ActionTypes'
import Immutable from 'seamless-immutable'


const INITIAL = Immutable({
  page: 1,
})

const _next = (state) => {
  if (state.data) {
    return state.merge({ page: state.page + 1 })
  }
};

const _prev = (state) => {
  if (state.page>1) {
    return state.merge({ page: state.page - 1 })
  }
};

const PageReducer = (state = INITIAL, action) => {
  switch (action.type) {
    case ActionTypes.Next:
      return _next(state);
    case ActionTypes.Prev:
      return _prev(state)
    default:
      return state;
  }
}

export default PageReducer;
