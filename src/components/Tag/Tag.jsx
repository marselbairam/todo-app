import React from 'react';
import classNames from 'classnames';

import './Tag.scss';

const Tag = ({ className, color, size }) => {
  return (
    <span className={classNames(className, 'Tag', {[`Tag_${color}`]: color, [`Tag_${size}`]: size})} />
  );
};

export default Tag;
