import 'isomorphic-fetch'
import { createAction } from 'redux-actions'
import { ActionTypes } from '../constants/ActionTypes'
import { loadRoute, createRoute, updateRoute, deleteRoute } from '../shared/routes'

const token = document.getElementById('_token').content;

export const loadRequest   = createAction(ActionTypes.LOAD_REQUEST)
export const loadSuccess   = createAction(ActionTypes.LOAD_SUCCESS)
export const loadFailure   = createAction(ActionTypes.LOAD_FAILURE)
export const createRequest = createAction(ActionTypes.CREATE_REQUEST)
export const createSuccess = createAction(ActionTypes.CREATE_SUCCESS)
export const createFailure = createAction(ActionTypes.CREATE_FAILURE)
export const updateRequest = createAction(ActionTypes.UPDATE_REQUEST)
export const updateSuccess = createAction(ActionTypes.UPDATE_SUCCESS)
export const updateFailure = createAction(ActionTypes.UPDATE_FAILURE)
export const deleteRequest = createAction(ActionTypes.DELETE_REQUEST)
export const deleteSuccess = createAction(ActionTypes.DELETE_SUCCESS)
export const deleteFailure = createAction(ActionTypes.DELETE_FAILURE)

export const next = createAction(ActionTypes.NEXT)
export const prev = createAction(ActionTypes.PREV)

export const Actions = {
  load: () => (dispatch, getState) => {
    let page = getState().MsgReducer.get('page')
    dispatch(loadRequest())
    return (
      fetch(loadRoute(page), { method: 'GET' })
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then(data => {
        if (!data.length) throw Error('No Data')
        console.log('success')
        dispatch(loadSuccess(data))
      })
      .catch(() => dispatch(loadFailure()))
    )
  },
  create: (content) => (dispatch) => {
    dispatch(createRequest())
    return  (
      fetch(createRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify(content)
      })
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then(() => {
        dispatch(Actions.load())
      })
      .catch(() => dispatch(createFailure()))
    )
  },
  update: (id, content) => (dispatch) => {
    dispatch(updateRequest())
    return (
      fetch(updateRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({
          id:      id,
          name:    content.name,
          email:   content.email,
          number:  content.number,
          content: content.content,
          edit: 1,
        })
      })
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then(() => {
        dispatch(Actions.load())
      })
      .catch(() => dispatch(updateFailure()))
    )
  },
  delete: (id) => (dispatch) => {
    dispatch(deleteRequest())
    return (
      fetch(deleteRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({
          id: id,
        })
      })
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then(() => {
        dispatch(Actions.load())
      })
      .catch(() => dispatch(deleteFailure()))
    )
  },
  next() {
    return (dispatch) => {
      dispatch(next())
      dispatch(Actions.load())
    }
  },
  prev() {
    return (dispatch) => {
      dispatch(prev())
      dispatch(Actions.load())
    }
  }
};
