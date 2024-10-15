import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleListItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <div style={{ overflowY: 'auto', height: '85vh' }}>
      <List>
        {/* Rest of the code */}
        {['Calendar','Subheader' ,'Header' ,'Card', 'Nodata', 'Grid', 'Avatar', 'Calculation' , 'Tab', 'Buttons', 'Dropdown','Input', 'Popup', 'Phoneno','Progressbar'].map((text, index) => (
          <ListItem
            key={text}
            button
            component={Link}
            to={`/kitchensink/${text.toLowerCase()}`}
            selected={selectedItem === index}
            onClick={() => handleListItemClick(index)}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
