import React from 'react';
import injectProps from '../utils/decorators/injectProps';
import Card from './Card';

class Cards extends React.PureComponent {
  @injectProps
  render({ notes, addEditStatus, editNote, deleteNote }) {
    let cards = 'Here will be your notes.';
    if (notes.length) {
      cards = notes.map(note => (
        <Card
          note={note}
          key={note.id}
          addEditStatus={addEditStatus}
          editNote={editNote}
          deleteNote={deleteNote}
        />
      ));

      cards.sort((a, b) => b.id - a.id);
    }

    return (
      <div className="cards">
        {cards}
      </div>
    );
  }
}

export default Cards;
