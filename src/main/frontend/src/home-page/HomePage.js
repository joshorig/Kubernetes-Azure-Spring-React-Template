import React from 'react';
import injectProps from '../utils/decorators/injectProps';

import InputField from '../components/InputField';
import Cards from '../components/Cards';

class HomePage extends React.PureComponent {
  @injectProps
  render({ notes, error, showWarning, inputMessage, addEditStatus, changeInput, addNote, editNote, deleteNote }) {
    let warning = null;
    if (showWarning) {
      warning = <p>Please make sure the note is not empty and you finished other actions.</p>;
    }
    if (error) {
      warning = <p>Something went wrong...</p>;
    }

    return (
      <div className="home-page-content">
        <div className="warning">
          {warning}
        </div>
        <InputField inputMessage={inputMessage} changeInput={changeInput} addNote={addNote} />
        <Cards notes={notes} addEditStatus={addEditStatus} editNote={editNote} deleteNote={deleteNote} />
      </div>
    );
  }
}

export default HomePage;
