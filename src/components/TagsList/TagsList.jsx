import React from 'react';
import classNames from 'classnames';
import Tag from '../Tag/Tag';

import './TagsList.scss';

const TagsList = ({ items, onClick }) => {
  return (
    <ul
      className="TagsList"
      onClick={onClick}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames('TagsList__Item', item.className, { 'TagsList__Item_Active': item.active })}
        >
          {item.icon ? (
            item.icon
          ) : (
            <Tag
              className="TagsList__Icon"
              color={item.color}
              size={item.size}
            />
          )}
          <span className="TagsList__Label">{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
