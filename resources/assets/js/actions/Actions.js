import { ActionTypes } from '../constants/ActionTypes'
import 'whatwg-fetch'

const token = document.getElementById('_token').content;

const Actions = {
  load(page) {
    return (dispatch) => {
      fetch(`/list/${page}`)
        .then(response => response.json())
        .then(data => dispatch({
          type: ActionTypes.LOAD,
          data
        }));
    };
  },
  create(content) {
    return (dispatch) => {
      fetch('/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({
          name:    content.name,
          email:   content.email,
          number:  content.number,
          content: content.content,
        })
      })
        .then(response => {
          if(response.status == 200){
            dispatch({
              type: ActionTypes.CREATE,
            });
          }else {
            console.log('Error');
          }
        });
    };
  },
  update(id, content) {
    return (dispatch) => {
      fetch('/edit', {
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
        .then(response => {
          if(response.status == 200){
            dispatch({
              type: ActionTypes.UPDATE,
            });
          }else {
            console.log('Error');
          }
        });
    };
  },
  delete(id) {
    return (dispatch) => {
      fetch('/del', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({
          id: id,
        })
      })
        .then(response => {
          if(response.status == 200){
            dispatch({
              type: ActionTypes.DELETE,
            });
          }else {
            console.log('Error');
          }
        });
    };
  },
  next() {
    return ({
      type: ActionTypes.NEXT,
    })
  },
  prev() {
    return ({
      type: ActionTypes.PREV,
    })
  },
};

export default Actions;
