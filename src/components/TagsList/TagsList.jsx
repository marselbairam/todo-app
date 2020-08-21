import React from 'react';
import classNames from 'classnames';
import Tag from '../Tag/Tag';
import { ReactComponent as RemoveSvg } from '../../assets/img/remove.svg';

import './TagsList.scss';

const TagsList = ({ items, isRemovable, onClick }) => {
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
          {isRemovable && <RemoveSvg className="TagsList__Icon TagsList__Icon_Gray TagsList__Icon_Interactive TagsList__Icon_Hidden" />}
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
