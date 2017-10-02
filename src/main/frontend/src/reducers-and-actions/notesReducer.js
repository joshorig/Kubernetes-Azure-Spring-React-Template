import {
  UPDATE_NOTES_SUCCESS,
  UPDATE_NOTES_FAILED,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILED,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_FAILED,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILED,
} from '../constants/actions';
import createReducer from './reducerFactory';

const INITIAL_STATE = {
  notesList: [],
  error: false,
};

const reducerMap = {
  [UPDATE_NOTES_SUCCESS]: (state, data) => ({
    notesList: data,
    error: false,
  }),
  [UPDATE_NOTES_FAILED]: () => ({
    error: true,
  }),
  [ADD_NOTE_SUCCESS]: (state, data) => {
    const { notesList } = state;
    const newNotesList = [...notesList, data];

    return {
      notesList: newNotesList,
      error: false,
    };
  },
  [ADD_NOTE_FAILED]: () => ({
    error: true,
  }),
  [EDIT_NOTE_SUCCESS]: (state, data) => {
    const { notesList } = state;
    const newNotesList = notesList.map((note) => {
      if (note.id === data.id) {
        return data;
      }
      return note;
    });

    return {
      notesList: newNotesList,
      error: false,
    };
  },
  [EDIT_NOTE_FAILED]: () => ({
    error: true,
  }),
  [DELETE_NOTE_SUCCESS]: (state, data) => {
    const { notesList } = state;
    const newNotesList = notesList.filter(note => note.id !== data);

    return {
      notesList: newNotesList,
      error: false,
    };
  },
  [DELETE_NOTE_FAILED]: () => ({
    error: true,
  }),
};

export default createReducer(reducerMap, INITIAL_STATE);
