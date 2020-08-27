import React from 'react';

import './Tasks.scss';

import {ReactComponent as CheckSvg} from '../../assets/img/check.svg';

const Tasks = ({ list }) => {
  return (
    <div className="Tasks">
      <h2 className="Tasks__title">
        {list.name}
      </h2>
      <div className="Tasks__items">
        {list.tasks.map(task => (
          <div
            key={task.id}
            className="Tasks__item"
          >
            <label className="Control Control_checkbox">
              <input className="Control__field" type="checkbox" />
              <span className="Control__mark">
              <CheckSvg className="Control__mark-icon" />
            </span>
            </label>
            <input
              className="Field Field_fullWidth Field_borderTransparent"
              type="text"
              readOnly
              value={task.text}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
