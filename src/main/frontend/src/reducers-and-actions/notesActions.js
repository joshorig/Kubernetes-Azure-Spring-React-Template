import {
  UPDATE_NOTES,
  UPDATE_NOTES_SUCCESS,
  UPDATE_NOTES_FAILED,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILED,
  EDIT_NOTE,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_FAILED,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILED,
} from '../constants/actions';

export function updateNotes() {
  return {
    type: UPDATE_NOTES,
  };
}

export function updateNotesSuccess(data) {
  return {
    type: UPDATE_NOTES_SUCCESS,
    payload: data,
  };
}

export function updateNotesFailed() {
  return {
    type: UPDATE_NOTES_FAILED,
  };
}

export function addNote(data) {
  return {
    type: ADD_NOTE,
    payload: data,
  };
}

export function addNoteSuccess(data) {
  return {
    type: ADD_NOTE_SUCCESS,
    payload: data,
  };
}

export function addNoteFailed() {
  return {
    type: ADD_NOTE_FAILED,
  };
}

export function editNote(data) {
  return {
    type: EDIT_NOTE,
    payload: data,
  };
}

export function editNoteSuccess(data) {
  return {
    type: EDIT_NOTE_SUCCESS,
    payload: data,
  };
}

export function editNoteFailed() {
  return {
    type: EDIT_NOTE_FAILED,
  };
}

export function deleteNote(data) {
  return {
    type: DELETE_NOTE,
    payload: data,
  };
}

export function deleteNoteSuccess(data) {
  return {
    type: DELETE_NOTE_SUCCESS,
    payload: data,
  };
}

export function deleteNoteFailed() {
  return {
    type: DELETE_NOTE_FAILED,
  };
}
