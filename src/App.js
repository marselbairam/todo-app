import React from 'react';
import TagsList from './components/TagsList/TagsList';
import AddTagsButton from './components/AddTagsButton/AddTagsButton';

import { ReactComponent as ListSvg } from './assets/img/list.svg';

import DB from './assets/db.json';

function App() {
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
          items={[
            {
              color: 'Mint',
              name: 'Purchases'
            },
            {
              color: 'Blue',
              name: 'Frontend'
            },
            {
              color: 'Pink',
              name: 'Movies and TV series'
            },
            {
              color: 'Celadon',
              name: 'Books'
            },
            {
              color: 'Grey',
              name: 'Personal'
            }
          ]}
          isRemovable
        />
        <AddTagsButton colors={DB.colors} />
      </div>
      <div className="Todo__Tasks"></div>
    </div>
  );
}

export default App;
