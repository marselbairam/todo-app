import React, { useState } from 'react';
import TagsList from '../TagsList/TagsList';
import Tag from '../Tag/Tag';

import './AddTagsButton.scss';

import { ReactComponent as PlusSvg } from '../../assets/img/plus.svg';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';

import DB from '../../assets/db.json';

const AddTagsButton = ({ onAdd, colors }) => {
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [tagActiveState, setTagActiveState] = useState(DB.colors[0].id);
  const [inputValue, setInputValue] = useState('');

  const onClose = () => {
    setInputValue('');
    setPopupVisibility(false);
    setTagActiveState(DB.colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    const color = DB.colors.find(({ id }) => id === tagActiveState).name;
    onAdd({
      id: Math.random(),
      name: inputValue,
      colorId: tagActiveState,
      color
    });
    onClose();
  };

  return (
    <div className="AddTagsButton">
      <TagsList
        onClick={() => setPopupVisibility(!popupVisibility)}
        items={[
          {
            className: 'TagsList__add-button AddTagsButton__button',
            icon: <PlusSvg className="TagsList__icon TagsList__icon_gray TagsList__icon_interactive TagsList__left-icon" />,
            name: 'Add folder'
          }
        ]}
      />
      {popupVisibility && (
        <div className="AddTagsButton__popup">
          <CloseSvg
            className="AddTagsButton__popup-close-btn"
            onClick={onClose}
          />
          <div className="AddTagsButton__popup-inner">
            <input
              className="AddTagsButton__popup-field Field"
              type="text"
              placeholder="Folder name"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <div className="AddTagsButton__popup-tags">
              {colors.map(tag => (
                <Tag
                  key={tag.id}
                  color={tag.name}
                  size="md"
                  active={tag.id === tagActiveState}
                  handleClick={() => setTagActiveState(tag.id)}
                />
              ))}
            </div>
            <button
              className="AddTagsButton__popup-button Button"
              onClick={addList}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTagsButton;
