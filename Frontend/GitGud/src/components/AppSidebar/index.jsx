import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../../../public/assets/logo.png'; // ajustează calea dacă e necesar
import '../../styles/AppSidebar.scss'; // asigură-te că ai acest fișier pentru stiluri

const AppSidebar = () => {
  return (
    <Sidebar>
      <div className="sidebar-logo text-center py-3">
        <img src={logo} alt="Logo" style={{ width: '120px', height: 'auto' }} />
      </div>

      <Menu iconShape="circle">
          <SubMenu label="Projects"
          rootStyles={{ color: '#000' }}
  >
            <MenuItem><Link to="/projects/active">All Projects</Link></MenuItem>
            <MenuItem><Link to="/myprojects">My Projects</Link></MenuItem>
          </SubMenu>
        <MenuItem>
          My Friends
          <Link to="/friends" />
        </MenuItem>

        <div className="sidebar-footer mt-auto">
          <MenuItem>
            Logout
            <Link to="/logout" />
          </MenuItem>
        </div>
      </Menu>
    </Sidebar>
  );
};

export default AppSidebar;
