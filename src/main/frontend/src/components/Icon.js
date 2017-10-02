import React from 'react';
import injectProps from '../utils/decorators/injectProps';

const files = require.context('!svg-sprite!../assets', false, /.*\.svg$/);
files.keys().forEach(files);

class Icon extends React.PureComponent {
  @injectProps
  render({ type, className, onClick }) {
    return (
      <div onClick={onClick} role="presentation">
        <svg
          className={`dib v-mid ${className}`}
          width="1em"
          height="1em"
        >
          <use xlinkHref={`#${type}`} />
        </svg>
      </div>
    );
  }
}

export default Icon;
