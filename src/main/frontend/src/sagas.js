import { call, put, takeEvery, fork } from 'redux-saga/effects';

import { UPDATE_NOTES, ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from './constants/actions';
import {
  updateNotesSuccess,
  updateNotesFailed,
  addNoteSuccess,
  addNoteFailed,
  editNoteSuccess,
  editNoteFailed,
  deleteNoteSuccess,
  deleteNoteFailed,
} from './reducers-and-actions/notesActions';
import { getNotes, postNote, putNote, deleteNote } from './utils/api';

function* fetchUpdateNotes() {
  try {
    const newNotes = yield call(getNotes);

    yield put(updateNotesSuccess(newNotes));
  } catch (e) {
    yield put(updateNotesFailed());
  }
}

function* watchUpdateNotes() {
  yield takeEvery(UPDATE_NOTES, fetchUpdateNotes);
}

function* fetchAddNote(action) {
  try {
    const newNote = yield call(postNote, action.payload);

    yield put(addNoteSuccess(newNote));
  } catch (e) {
    yield put(addNoteFailed());
  }
}

function* watchAddNote() {
  yield takeEvery(ADD_NOTE, fetchAddNote);
}

function* fetchEditNote(action) {
  try {
    const newNote = yield call(putNote, action.payload);

    yield put(editNoteSuccess(newNote));
  } catch (e) {
    yield put(editNoteFailed());
  }
}

function* watchEditNote() {
  yield takeEvery(EDIT_NOTE, fetchEditNote);
}

function* fetchDeleteNote(action) {
  try {
    const deleted = yield call(deleteNote, action.payload);

    if (deleted) {
      yield put(deleteNoteSuccess(action.payload));
    }
  } catch (e) {
    yield put(deleteNoteFailed());
  }
}

function* watchDeleteNote() {
  yield takeEvery(DELETE_NOTE, fetchDeleteNote);
}

export default function* rootSaga() {
  yield [
    fork(watchUpdateNotes),
    fork(watchAddNote),
    fork(watchEditNote),
    fork(watchDeleteNote),
  ];
}
