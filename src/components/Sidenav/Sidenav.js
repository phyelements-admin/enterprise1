import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as ArrowLeftIcon } from "../../assets/svgs/arrow-left.svg";
import { ReactComponent as LogoIcon } from "../../assets/svgs/logo-icon.svg";
import { ReactComponent as LogoIconWithText } from "../../assets/svgs/logo-icon-with-text.svg";
import activeListItem from "../../assets/svgs/sidenav_active_list_item.svg";
import inActiveListItem from "../../assets/icons/sidenav_inactive_list_item.png";
import { menu } from "../../utils/menu";
import { hasChildren } from "../../utils/menuChildren";

const MenuItem = ({ item, props }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return (
    <div className="_menuItem flex items-center justify-center">
      <Component item={item} props={props} />
    </div>
  );
};

const SingleLevel = ({ item, props }) => {
  const clickHandler = () => {};
  return (
    <ListItem
      button
      component={Link}
      to={item.to ? item.to : "/"}
      onClick={clickHandler}
      className={props.id === "collapse" ? "collapse-sidenav" : ""}
      style={{
        flexDirection: props.id === "collapse" ? "column" : "",
        justifyContent: props.id === "collapse" ? "left" : "",
        alignItems: props.id === "collapse" ? "center" : "",
        color: props.id === "collapse" ? "#000" : "#607DB9",
      }}
    >
      <ListItemIcon style={{ marginTop: props.id === "collapse" ? "0px" : "" }}>{item.icon}</ListItemIcon>
      {props.id === "collapse" ? "" : <ListItemText  primary={item.title} className={props.id === "collapse" ? "collapse" : ""} />}
    </ListItem>
  );
};

const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const Sidenav = (props) => {
  const location = useLocation();

  const handleBackClick = () => {
    props.handleSideNavShow(false);
  };
  return (
    <div
      className="sidenav-container"
      style={{
        width: props.id === "collapse" ? "60px" : "260px",
        height: props.id === "collapse" ? "calc(100vh - 80px)" : "",
      }}
    >
      <div
        className="back-btn"
        onClick={handleBackClick}
        style={{
          cursor: "pointer",
          display: props.id === "collapse" ? "none" : "",
        }}
      >
        <ArrowLeftIcon />
      </div>
      <div className="side-menu">
        <div className="inner-side-menu flex flex-col items-start justify-center">
          {menu.map((item, key) => (
            <div className="_menuItem flex items-center justify-center" key={key}>
              <img src={item.to === location.pathname ? activeListItem : inActiveListItem} />
              <MenuItem key={key} item={item} props={props} />
            </div>
          ))}
        </div>
        <span className="menu-down"></span>
      </div>
      {props.id === "collapse" ? (
        <div className="collapse-logo">
          <LogoIcon />
        </div>
      ) : (
        <div className="logo">
          <LogoIconWithText />
        </div>
      )}
    </div>
  );
};

export default Sidenav;
