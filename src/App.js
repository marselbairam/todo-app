import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TagsList from './components/TagsList/TagsList';
import AddTagsButton from './components/AddTagsButton/AddTagsButton';

import { ReactComponent as ListSvg } from './assets/img/list.svg';
import { ReactComponent as CheckSvg } from './assets/img/check.svg';

import DB from './assets/db.json';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios('http://localhost:3001/lists?_expand=color').then(({ data }) => {
      setLists(data);
    });
    axios('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    console.log(obj);
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
        <TagsList
          items={lists}
          onRemove={(item) => console.log(item)}
          isRemovable
        />
        <AddTagsButton
          onAdd={onAddList}
          colors={DB.colors}
        />
      </div>
      <div className="Todo__tasks">
        <div className="Tasks">
          <h2 className="Tasks__title">Фронтенд</h2>
          <div className="Tasks__items">
            <div className="Tasks__item">
              <label className="Control Control_checkbox">
                <input className="Control__field" type="checkbox" />
                <span className="Control__mark">
                  <CheckSvg className="Control__mark-icon" />
                </span>
              </label>
              <input className="Field Field_fullWidth" type="text" value="ReactJS Hooks (useState, useReducer, useEffect и т.д.)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
