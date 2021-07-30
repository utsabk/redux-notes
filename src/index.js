import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const noteReducer = (state=[], action) => {
  switch(action.type){
    case 'NEW_NOTE':
      return [...state, action.data]
     
    case 'TOGGLE_IMPORTANCE':{
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id !== id ? note : changedNote)
    }

    default :
    return state
  }
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: false,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () =>{
  return(
    <div>
      <ui>
        {store.getState().map(note => 
        <li key={note.id}>
          {note.content}<strong>{note.important ? 'important' : ''}</strong>
        </li>

        )}
      </ui>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();

store.subscribe(renderApp);
