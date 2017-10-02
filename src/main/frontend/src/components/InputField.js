import React from 'react';
import injectProps from '../utils/decorators/injectProps';

class InputField extends React.PureComponent {
  @injectProps
  render({ inputMessage, changeInput, addNote }) {
    return (
      <div className="input-field">
        <input
          type="text"
          name="inputMessage"
          value={inputMessage}
          className="message"
          placeholder="Message"
          onChange={e => changeInput(e)}
        />
        <button className="add" onClick={addNote}>add</button>
      </div>
    );
  }
}

export default InputField;
