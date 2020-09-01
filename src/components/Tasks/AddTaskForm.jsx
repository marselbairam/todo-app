import React, { useState } from 'react';
import axios from 'axios';

import {ReactComponent as PlusSvg} from '../../assets/img/plus.svg';

const AddTaskForm = ({ list, onAddTask }) => {
  const [actionVisibility, setActionVisibility] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleAction = () => {
    setActionVisibility(!actionVisibility);
    setInputValue('');
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    };

    setIsLoading(true);
    axios
    .post('http://localhost:3001/tasks', obj)
    .then(({ data }) => {
      onAddTask(list.id, data);
      toggleAction();
    })
    .catch(() => {
      alert('Ошибка при добавлении задачи!');
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="Tasks__actions">
      {!actionVisibility ? (
        <div
          className="Tasks__action-item"
          onClick={toggleAction}
        >
          <div className="Tasks__action-item-icon-wrapper">
            <PlusSvg className="Tasks__action-item-icon" />
          </div>
          <span className="Tasks__action-item-label">Новая задача</span>
        </div>
      ) : (
        <div className="Tasks__action-content">
          <input
            className="Field Field_fullWidth"
            type="text"
            placeholder="Текст задачи"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
            }}
          />
          <div
            className="Tasks__action-content-row"
          >
            <button
              className="Button Button_emerald"
              disabled={isLoading}
              onClick={addTask}
            >
              {isLoading ? 'Добавление...' : 'Добавить задачу'}
            </button>
            <button
              className="Button Button_gray"
              onClick={toggleAction}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
