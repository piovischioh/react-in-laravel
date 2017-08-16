import { handleActions } from 'redux-actions'
import * as Immutable from 'immutable'
import { ActionTypes } from '../constants/ActionTypes'

const initialState = Immutable.fromJS({
  data: [],
  page: 1
})

const MsgReducer = handleActions({
  [ActionTypes.LOAD_SUCCESS](state, {payload}) {
    let list = Immutable.List(payload)
    return state.set('data', list);
  },
  [ActionTypes.NEXT](state) {
    return state.set('page', state.get('page') + 1)
  },
  [ActionTypes.PREV](state) {
    return state.set('page', state.get('page') - 1)
  }
}, initialState)

export default MsgReducer
