import React from 'react';
import TagsList from './components/TagsList/TagsList';

import { ReactComponent as ListSvg } from './assets/img/list.svg';

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <TagsList items={[
          {
            active: true,
            icon: <ListSvg className="tags-list__icon" />,
            name: 'All tasks'
          }
        ]} />
        <TagsList items={[
          {
            color: 'mint',
            name: 'Purchases'
          },
          {
            color: 'blue',
            name: 'Frontend'
          },
          {
            color: 'pink',
            name: 'Movies and TV series'
          },
          {
            color: 'celadon',
            name: 'Books'
          },
          {
            color: 'gray',
            name: 'Personal'
          }
        ]} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
