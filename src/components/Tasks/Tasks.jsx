import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Tasks.scss';

import AddTaskForm from './AddTaskForm';
import Task from './Task';

import {ReactComponent as EditSvg} from '../../assets/img/edit.svg';

const Tasks = ({ list, onAddTask, onEditTitle, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask }) => {
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

  return (
    <div className="Tasks">
      <div className="Tasks__header">
        <Link
          to={`/lists/${list.id}`}
          className="Tasks__title-link"
        >
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
        </Link>
      </div>
      <div className="Tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <div className="Tasks__info-label">Задачи отсутствуют</div>
        )}
        {list.tasks &&
          list.tasks.map(task => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
              {...task}
            />
        ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
