import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Tag from '../Tag/Tag';
import { ReactComponent as RemoveSvg } from '../../assets/img/remove.svg';

import './TagsList.scss';

const TagsList = ({ items, isRemovable, onClick, onClickItem, activeItem, onRemove }) => {
  const removeList = item => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
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
          className={classNames('TagsList__item', item.className, { 'TagsList__item_active': activeItem && activeItem.id === item.id })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          {item.icon ? (
            item.icon
          ) : (
            <Tag
              className="TagsList__icon TagsList__left-icon"
              color={item.color.name}
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
