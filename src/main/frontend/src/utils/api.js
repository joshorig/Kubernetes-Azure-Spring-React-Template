import axios from 'axios';

import { NOTES_URL } from '../constants/api';

import keyGenerator from './keyGenerator';

export function getNotes() {
  return axios.get(NOTES_URL).then(response => response.data);
}

export function postNote(message) {
  const id = keyGenerator.getNext();
  const note = { id, message };

  return axios.post(NOTES_URL, note).then(response => response.data);
}

export function putNote(note) {
  const { id } = note;

  return axios.put(`${NOTES_URL}/${id}`, note).then(response => response.data);
}

export function deleteNote(id) {
  return axios.delete(`${NOTES_URL}/${id}`).then(response => response.status === 200);
}
