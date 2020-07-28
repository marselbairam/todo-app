import React, { useState } from 'react';
import TagsList from '../TagsList/TagsList';
import Tag from '../Tag/Tag';

import './AddTagsButton.scss';

import { ReactComponent as PlusSvg } from '../../assets/img/plus.svg';

const AddTagsButton = ({ colors }) => {
  const [popupVisibility, setPopupVisibility] = useState(false);

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
