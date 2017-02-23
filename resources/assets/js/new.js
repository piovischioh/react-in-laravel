import React from 'react';
import ReactDOM from 'react-dom';
import Msgboard from './components/Msgboard';


$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
    }
});

ReactDOM.render(
  <Msgboard />,
  document.getElementById('app')
);
