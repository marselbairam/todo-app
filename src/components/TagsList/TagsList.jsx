import React from 'react';
import classNames from 'classnames';
import Tag from '../Tag/Tag';
import { ReactComponent as RemoveSvg } from '../../assets/img/remove.svg';

import './TagsList.scss';

const TagsList = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = item => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      onRemove(item);
    }
  };

  return (
    <ul
      className="TagsList"
      onClick={onClick}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames('TagsList__item', item.className, { 'TagsList__item_active': item.active })}
        >
          {item.icon ? (
            item.icon
          ) : (
            <Tag
              className="TagsList__icon TagsList__left-icon"
              color={item.color}
              size={item.size}
            />
          )}
          <span className="TagsList__label">{item.name}</span>
          {isRemovable && <RemoveSvg
            className="TagsList__icon TagsList__icon_gray TagsList__icon_interactive TagsList__icon_hidden TagsList__remove-btn"
            onClick={() => removeList(item)}
          />}
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
