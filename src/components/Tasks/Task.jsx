import React from 'react';

import {ReactComponent as CheckSvg} from '../../assets/img/check.svg';
import {ReactComponent as EditSvg} from '../../assets/img/edit.svg';
import {ReactComponent as RemoveSvg} from '../../assets/img/remove.svg';

const Task = ({ id, text, completed, list, onEdit, onRemove, onComplete }) => {
  const onChangeCheckbox = e => {
    onComplete(list.id, id, e.target.checked);
  };

  return (
    <div
      key={id}
      className="Tasks__item"
    >
      <label className="Control Control_checkbox">
        <input
          className="Control__field"
          type="checkbox"
          onChange={onChangeCheckbox}
          checked={completed}
        />
        <span className="Control__mark">
          <CheckSvg className="Control__mark-icon" />
        </span>
      </label>
      <p className="Tasks__item-text">{text}</p>
      <div className="Tasks__item-actions">
        <div
          className="Tasks__item-action"
          onClick={() => onEdit(list.id, { id, text })}
        >
          <EditSvg className="Tasks__item-action-icon" />
        </div>
        <div
          className="Tasks__item-action"
          onClick={() => onRemove(list.id, id)}
        >
          <RemoveSvg className="Tasks__item-action-icon" />
        </div>
      </div>
    </div>
  );
};

export default Task;
