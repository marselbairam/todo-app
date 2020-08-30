import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TagsList from '../TagsList/TagsList';
import Tag from '../Tag/Tag';

import './AddTagsButton.scss';

import { ReactComponent as PlusSvg } from '../../assets/img/plus.svg';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';

const AddTagsButton = ({ onAdd, colors }) => {
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [tagActiveState, setTagActiveState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      setTagActiveState(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setInputValue('');
    setPopupVisibility(false);
    setTagActiveState(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    setIsLoading(true);
    axios.post('http://localhost:3001/lists', {
      name: inputValue,
      colorId: tagActiveState
    })
    .then(({ data }) => {
      const color = colors.find(({ id }) => id === tagActiveState).name;
      const listObj = {
        ...data,
        color: {
          name: color
        }
      };
      onAdd(listObj);
      onClose();
    })
    .catch(() => {
      alert('Ошибка при добавлении списка!');
    })
    .finally(() => {
      setIsLoading(false);
    });
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
              {isLoading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTagsButton;
