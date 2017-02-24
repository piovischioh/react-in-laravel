import { ActionTypes } from '../constants/ActionTypes'
import Immutable from 'seamless-immutable'

const INITIAL = Immutable({
  data: [],
  page: 1,
})

const _load = (state, data) => {
  return state.merge({ data: data });
}

const _create = () => {

}

const _update = () => {

}

const _delete = () => {

}

const _next = (state) => {
  if (state.data) {
    return state.merge({ page: state.page + 1 })
  }else {
    return state
  }
}

const _prev = (state) => {
  if (state.page>1) {
    return state.merge({ page: state.page - 1 })
  }else {
    return state
  }
}

const MsgReducer = (state = INITIAL, action) => {
  switch (action.type) {
    case ActionTypes.LOAD:
      return _load(state, action.data);
    case ActionTypes.CREATE:
      return state;
    case ActionTypes.UPDATE:
      return state;
    case ActionTypes.DELETE:
      return state;
    case ActionTypes.NEXT:
      return _next(state);
    case ActionTypes.PREV:
      return _prev(state)
    default:
      return state;
  }
};

export default MsgReducer;
