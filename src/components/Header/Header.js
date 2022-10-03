import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext } from "react";
import Profile from "../../assets/icons/profile.png";
import { ReactComponent as FolderIcon } from "../../assets/svgs/folder.svg";
import { ReactComponent as MessageQuestionIcon } from "../../assets/svgs/message-question.svg";
import { ReactComponent as NotificationIcon } from "../../assets/svgs/notification.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, Typography } from "@mui/material";
import DashBoardPopover from "./Popover/DashBoardPopover";
import { useLocation } from "react-router-dom";

import "./Header.scss";
import { json } from "d3";

const Header = () => {
  
  const [anchor, setAnchor] = useState(false);
  const [showDropDownIcon, setShowDropDownIcon] = useState(false);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const location = useLocation();
  const projectLocalData = localStorage.getItem("projectData")


  
  const renderDropDownIcon = () => {
    if (location.pathname == "/projects") {
      setShowDropDownIcon(false);
    } else {
      setShowDropDownIcon(true);
    }
  };

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  function getCurrentUrl() {
    const path = window.location.pathname;
    if (path === "/projects" || path === "/") setShowDropDownIcon(false);
    else setShowDropDownIcon(true);
  }

  React.useEffect(() => {
    getCurrentUrl();
  }, []);

 

  return (
    <Box className="header-container">
      <div className="left-container">
        {/* <p>.</p> */}
        {/* <p className='box2text'>Current Running Workers</p> 
            <div className='minusrectangle'>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>p</Typography>
              <Button color="inherit">Login</Button>
              <div className="box1">
                <MenuIcon className="menuicon" onClick={handleSidenav} />
              </div> 
            </div>*/}
      </div>
      <div className="right-container">

        {showDropDownIcon && (
          <div className="dropdown-container">
            <Box sx={{ display: "flex" }}>
              <FolderIcon className="foldericon" />
              <Typography variant="body2" sx={{ ml: 2 }}>
                {selectedProjectName}
              </Typography>
            </Box>
            <ExpandMoreIcon onClick={handleClick} color="action" />
          </div>
        )}

        {showDropDownIcon && (
          <DashBoardPopover
            
            anchor={anchor}
            setAnchor={setAnchor}
          />
        )}

        <div className="icon-container">
          <IconButton color="inherit" aria-label="open drawer">
            <MessageQuestionIcon />
          </IconButton>
        </div>
        <div className="icon-container">
          <IconButton color="inherit" aria-label="open drawer">
            <NotificationIcon />
          </IconButton>
        </div>
        <div className="profile-container">
          <IconButton color="inherit" aria-label="open drawer">
            <img className="profile" src={Profile} alt="" />
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default Header;
