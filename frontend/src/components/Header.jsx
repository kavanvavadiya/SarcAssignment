import React from 'react'
import './header.css'
import {NotificationsActive} from '@mui/icons-material';
function Header() {
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <span className="logo">Post</span>
        </div>
        
        <div className="topbarRight">
        <div className="topbarIcons">
        <div className="topbarLinks">
            {/* <span className="topbarLink">Timeline</span> */}
        </div>
            <div className="topbarIconItem">
            {/* <Person /> */}
            <NotificationsActive />
            <span className="topbarIconBadge">2</span>
            </div>
        </div>
        {/* <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/> */}
        </div>
    </div>
  )
}

export default Header