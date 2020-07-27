import React from 'react';
import './TagsList.scss';

const TagsList = ({ items }) => {
  return (
    <ul className="tags-list">
      {items.map(item => (
        <li
          key={item.id}
          className={`tags-list__item ${item.active ? 'tags-list__item_active': ''}`}
        >
          {item.icon ? (
            item.icon
          ) : (
            <span className={`tags-list__tag tags-list__tag_${item.color}`} />
          )}
          <span className="tags-list__label">{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
