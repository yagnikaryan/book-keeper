import { useState } from 'react'
import './App.css'
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Routes, Route, Link } from "react-router-dom"
import { ProSidebarProvider, useProSidebar } from "react-pro-sidebar"
import SearchIcon from '@mui/icons-material/Search';
import Dashboard from './components/Dashboard'
import Search from './components/Search'
import Library from './components/Library'

function App() {

  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "100vh"}}>
      <Sidebar className="app">
        <Menu>
          <MenuItem className="menu1" icon={<MenuRoundedIcon  onClick={() => {collapseSidebar()}}/>}>
            <h2  onClick={() => {collapseSidebar()}}> Book Keeper</h2>
          </MenuItem>
          <MenuItem component={<Link to="dashboard" className="link" />} icon={<GridViewRoundedIcon />}> Dashboard </MenuItem>
          <MenuItem component={<Link to='library' className='link' />} icon={<MenuBookIcon />}> Library </MenuItem>
          <MenuItem component={<Link to="search" className="link"/>} icon={<SearchIcon />}> Search </MenuItem>
          <SubMenu label="Settings" icon={<SettingsApplicationsRoundedIcon />}>
            <MenuItem icon={<AccountCircleRoundedIcon />}> Account </MenuItem>
            <MenuItem icon={<ShieldRoundedIcon />}> About </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <section>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path='library' element={<Library/>}/>
          <Route path="search" element={<Search/>} />
        </Routes>
      </section>
    </div>
  );
}

export default App
