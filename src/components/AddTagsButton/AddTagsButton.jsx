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
            className: 'TagsList__AddButton AddTagsButton__Button',
            icon: <PlusSvg className="TagsList__Icon TagsList__Icon_Gray TagsList__Icon_Interactive TagsList__LeftIcon" />,
            name: 'Add folder'
          }
        ]}
      />
      {popupVisibility && (
        <div className="AddTagsButton__Popup">
          <CloseSvg
            className="AddTagsButton__PopupCloseBtn"
            onClick={onClose}
          />
          <div className="AddTagsButton__PopupInner">
            <input
              className="AddTagsButton__PopupField Field"
              type="text"
              placeholder="Folder name"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <div className="AddTagsButton__PopupTags">
              {colors.map(tag => (
                <Tag
                  key={tag.id}
                  color={tag.name}
                  size="Md"
                  active={tag.id === tagActiveState}
                  handleClick={() => setTagActiveState(tag.id)}
                />
              ))}
            </div>
            <button
              className="AddTagsButton__PopupButton Button"
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
