import React, { useState } from 'react';
import axios from 'axios';

import './Tasks.scss';

import {ReactComponent as EditSvg} from '../../assets/img/edit.svg';
import {ReactComponent as CheckSvg} from '../../assets/img/check.svg';
import {ReactComponent as PlusSvg} from '../../assets/img/plus.svg';
import {ReactComponent as RemoveSvg} from '../../assets/img/remove.svg';

const Tasks = ({ id, text, completed, list, onAddTask, onEditTitle, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask }) => {
  const [actionVisibility, setActionVisibility] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle
        })
        .catch(() => {
          alert('Не удалось обновить название списка');
        });
    }
  };

  const onChangeCheckbox = e => {
    onCompleteTask(list.id, id, e.target.checked);
  };

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
    <div className="Tasks">
      <div className="Tasks__header">
        <h2 className="Tasks__title">
          <span
            className="Tasks__title-text"
            style={{ color: list.color.hex }}
          >
            {list.name}
          </span>
          <button
            className="Tasks__edit-btn"
            onClick={editTitle}
          >
            <EditSvg className="Tasks__edit-btn-icon" />
          </button>
        </h2>
      </div>
      <div className="Tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <div className="Tasks__info-label">Задачи отсутствуют</div>
        )}
        {list.tasks &&
          list.tasks.map(task => (
            <div
              key={task.id}
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
              <p className="Tasks__item-text">{task.text}</p>
              <div className="Tasks__item-actions">
                <div
                  className="Tasks__item-action"
                  onClick={() => onEditTask(list.id, { id: task.id, text: task.text })}
                >
                  <EditSvg className="Tasks__item-action-icon" />
                </div>
                <div
                  className="Tasks__item-action"
                  onClick={() => onRemoveTask(list.id, task.id)}
                >
                  <RemoveSvg className="Tasks__item-action-icon" />
                </div>
              </div>
            </div>
        ))}
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
      </div>
    </div>
  );
};

export default Tasks;
