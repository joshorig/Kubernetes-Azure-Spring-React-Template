import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectPropsAndState from '../utils/decorators/injectPropsAndState';
import { updateNotes, addNote, editNote, deleteNote } from '../reducers-and-actions/notesActions';
import { createNotesShape } from '../shapes';

import HomePage from './HomePage';

const mapStateToProps = store => ({
  notes: store.notes.notesList,
  error: store.notes.error,
});

@connect(mapStateToProps, { updateNotes, addNote, editNote, deleteNote })
class HomeContainer extends Component {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    // the following props are used with @inject decorator and eslint cannot track it
    notes: PropTypes.arrayOf(createNotesShape()).isRequired,
    error: PropTypes.bool.isRequired,
    /* eslint-enable react/no-unused-prop-types */
    updateNotes: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputMessage: '',
      showWarning: false,
      showDeleteDialog: false,
      editStatus: false,
    };

    this.changeInput = ::this.changeInput;
    this.addNote = ::this.addNote;
    this.editNote = ::this.editNote;
    this.deleteNote = ::this.deleteNote;
    this.addEditStatus = ::this.addEditStatus;
  }

  componentWillMount() {
    this.props.updateNotes();
  }

  changeInput(e) {
    const input = e.target;
    if (input.value) {
      this.setState({ showWarning: false });
    }
    this.setState({ [input.name]: input.value });
  }

  addNote() {
    const { inputMessage, editStatus } = this.state;
    if (!inputMessage || editStatus) {
      this.setState({ showWarning: true });
      return;
    }

    this.props.addNote(inputMessage);
    this.setState({ inputMessage: '' });
  }

  editNote(note) {
    const { editStatus } = this.state;
    if (!note.message || !editStatus) {
      this.setState({ showWarning: true });
      return;
    }
    this.props.editNote(note);
    this.setState({ showWarning: false });
  }

  deleteNote(id) {
    this.props.deleteNote(id);
  }

  addEditStatus(status) {
    this.setState({ editStatus: status });
  }

  @injectPropsAndState
  render({ notes }, { showWarning, inputMessage }) {
    return (
      <div className="home-page">
        <HomePage
          notes={notes}
          showWarning={showWarning}
          inputMessage={inputMessage}
          changeInput={this.changeInput}
          addNote={this.addNote}
          editNote={this.editNote}
          deleteNote={this.deleteNote}
          addEditStatus={this.addEditStatus}
        />
      </div>
    );
  }
}

export default HomeContainer;
