import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TagsList from './components/TagsList/TagsList';
import AddTagsButton from './components/AddTagsButton/AddTagsButton';
import Tasks from './components/Tasks/Tasks';

import { ReactComponent as ListSvg } from './assets/img/list.svg';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newLists = [
      ...lists,
      obj
    ];
    setLists(newLists);
  };

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
        />
        {lists ?
          <TagsList
            items={lists}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id);
              setLists(newLists);
            }}
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
        {lists && <Tasks list={lists[1]} />}
      </div>
    </div>
  );
}

export default App;
