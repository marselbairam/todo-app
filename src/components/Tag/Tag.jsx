import React from 'react';
import classNames from 'classnames';

import './Tag.scss';

const Tag = ({ className, color, size, active, handleClick }) => {
  return (
    <span
      className={classNames(className, 'Tag', {[`Tag_${color}`]: color, [`Tag_${size}`]: size}, {'Tag_active': active})}
      onClick={handleClick}
    />
  );
};

export default Tag;
