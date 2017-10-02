import PropTypes from 'prop-types';

// no need to make default import as here will be other shapes
export function createNotesShape() { // eslint-disable-line import/prefer-default-export
  return PropTypes.shape({
    id: PropTypes.number,
    message: PropTypes.string,
  });
}
