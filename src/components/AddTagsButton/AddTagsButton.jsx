import React, { useState } from 'react';
import TagsList from '../TagsList/TagsList';
import Tag from '../Tag/Tag';

import './AddTagsButton.scss';

import { ReactComponent as PlusSvg } from '../../assets/img/plus.svg';
import { ReactComponent as CloseSvg } from '../../assets/img/close.svg';

import DB from '../../assets/db.json';

const AddTagsButton = ({ colors }) => {
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [tagActiveState, setTagActiveState] = useState(DB.colors[0].id);

  return (
    <div className="AddTagsButton">
      <TagsList
        onClick={() => setPopupVisibility(!popupVisibility)}
        items={[
          {
            className: 'AddTagsButton__Button TagsList__AddButton',
            icon: <PlusSvg className="TagsList__Icon" />,
            name: 'Add folder'
          }
        ]}
      />
      {popupVisibility && (
        <div className="AddTagsButton__Popup">
          <CloseSvg
            className="AddTagsButton__PopupCloseBtn"
            onClick={() => setPopupVisibility(!popupVisibility)}
          />
          <div className="AddTagsButton__PopupInner">
            <input
              className="AddTagsButton__PopupField Field"
              type="text"
              placeholder="Folder name"
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
            <button className="AddTagsButton__PopupButton Button">Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTagsButton;