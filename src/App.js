import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import axios from 'axios';

import TagsList from './components/TagsList/TagsList';
import AddTagsButton from './components/AddTagsButton/AddTagsButton';
import Tasks from './components/Tasks/Tasks';

import { ReactComponent as ListSvg } from './assets/img/list.svg';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [
      ...lists,
      obj
    ];
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  const toggleLists = () => {
    const listId = history.location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list);
    }
  };

  useEffect(() => {
    toggleLists();
    history.listen(() => {
      toggleLists();
    });
  }, [lists, history.location.pathname]);

  return (
    <div className="Todo">
      <div className="Todo__sidebar">
        <TagsList
          items={[
            {
              active: true,
              icon: <ListSvg className="TagsList__icon" />,
              name: 'All tasks'
            }
          ]}
          onClickItem={list => {
            history.push(`/`);
          }}
        />
        {lists ?
          <TagsList
            items={lists}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id);
              setLists(newLists);
            }}
            onClickItem={list => {
              history.push(`/lists/${list.id}`);
            }}
            activeItem={activeItem}
            isRemovable
          />
          : <div>Загрузка списка...</div>
        }
        <AddTagsButton
          onAdd={onAddList}
          colors={colors}
        />
      </div>
      <div className="Todo__tasks">
        <Route exact path="/">
          {lists && lists.map(list => (
            <Tasks
              key={list.id}
              list={list}
              onAddTask={onAddTask}
              onEditTitle={onEditListTitle}
              withoutEmpty
            />
          ))}
        </Route>
        <Route path="/lists/:id">
          {
            lists && activeItem &&
            <Tasks
              list={activeItem}
              onAddTask={onAddTask}
              onEditTitle={onEditListTitle}
            />
          }
        </Route>
      </div>
    </div>
  );
}

export default App;
