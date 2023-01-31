import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Landing from './components/Landing.jsx'
import SetBookNumber from './components/SetBookNumber'
import React from 'react'
import SetBookSize from './components/SetBookSize'
import Dashboard from './components/Dashboard'
import MainSidebar from './global/Sidebar'
import { ProSidebarProvider } from 'react-pro-sidebar'

import {
  BrowserRouter,
  Routes,
  Route,

} from 'react-router-dom'

function App() {

 

  function handleStart(){
    setIsLanding(prevLanding => !prevLanding)
  }
  
  const [isLanding, setIsLanding] = React.useState(true);


  let landing = <div>
    <Landing
    buttonFunc = {handleStart}
    />
  </div>

  let numbers = <div>
    <SetBookNumber/>
  </div>


  return (
    <div className="main">
      
      <Dashboard/>
      
      {/*isLanding ? landing : numbers*/}
    </div> 
  ) 
}

export default App
