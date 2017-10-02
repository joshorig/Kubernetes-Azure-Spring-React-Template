import { combineReducers } from 'redux';
import notes from './reducers-and-actions/notesReducer';

const rootReducer = combineReducers({
  notes,
});

export default rootReducer;
