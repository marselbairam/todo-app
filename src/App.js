import React, { useState } from 'react';
import TagsList from './components/TagsList/TagsList';
import AddTagsButton from './components/AddTagsButton/AddTagsButton';

import { ReactComponent as ListSvg } from './assets/img/list.svg';

import DB from './assets/db.json';

function App() {
  const [lists, setLists] = useState(
    DB.lists.map(item => {
      item.color = DB.colors.find(({ id }) => id === item.colorId).name;
      return item;
    })
  );

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
      <div className="Todo__Sidebar">
        <TagsList
          items={[
            {
              active: true,
              icon: <ListSvg className="TagsList__Icon" />,
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
      <div className="Todo__Tasks">
        <div className="Tasks">
          <h2 className="Tasks__Title">Фронтенд</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
