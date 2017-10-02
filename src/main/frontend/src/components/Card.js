import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import injectPropsAndState from '../utils/decorators/injectPropsAndState';
import { createNotesShape } from '../shapes';
import Icon from './Icon';

@onClickOutside
class Card extends React.PureComponent {
  static propTypes = {
    note: createNotesShape().isRequired,
    addEditStatus: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      inputMessage: '',
      showEditView: false,
    };

    this.handleClickOutside = ::this.handleClickOutside;
    this.changeView = ::this.changeView;
    this.changeInput = ::this.changeInput;
    this.editNote = ::this.editNote;
    this.deleteNote = ::this.deleteNote;
  }

  handleClickOutside() {
    const { showEditView } = this.state;

    if (showEditView) {
      this.changeView();
    }
  }

  changeView() {
    const { addEditStatus } = this.props;
    const { showEditView } = this.state;
    const newEditView = !showEditView;

    this.setState({ showEditView: newEditView });
    addEditStatus(newEditView);
  }

  changeInput(e) {
    const input = e.target;
    this.setState({ [input.name]: input.value });
  }

  editNote() {
    const { editNote, note } = this.props;
    const { inputMessage } = this.state;
    const body = { ...note, message: inputMessage };

    if (inputMessage) {
      editNote(body);
      this.changeView();
    }
  }

  deleteNote() {
    const { note, deleteNote } = this.props;
    deleteNote(note.id);
  }

  @injectPropsAndState
  render({ note }, { showEditView }) {
    const ordinaryView = (
      <div className="view">
        <p className="card-message">{note.message}</p>
        <div className="options">
          <Icon type="garbadge" className="icon" onClick={this.deleteNote} />
          <Icon type="edit" className="icon" onClick={this.changeView} />
        </div>
      </div>
    );

    const editorView = (
      <div className="view">
        <textarea className="card-editor" name="inputMessage" defaultValue={note.message} onChange={e => this.changeInput(e)} />
        <div className="options">
          <button className="option" onClick={this.editNote}>ok</button>
          <button className="option" onClick={this.changeView}>cancel</button>
        </div>
      </div>
    );

    const view = showEditView ? editorView : ordinaryView;

    return (
      <div className="card">
        {view}
      </div>
    );
  }
}

export default Card;
