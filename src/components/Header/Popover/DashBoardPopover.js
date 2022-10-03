import "./DashBoardPopover.scss";

import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Popover from "@mui/material/Popover";


const DashBoardPopover = ({ anchor, setAnchor, onChangeProject }) => {
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProjectId = useMemo(
    () => +location.pathname.split("/")[2],
    [location]
  );
  const projectLocalData = localStorage.getItem("projectData")

 
  const handleNavigation = (project_id, project_name) => {
    if (
      location.pathname.split("/")[1] === "connections" ||
      location.pathname.split("/")[1] === "dataset"
    ) {
      navigate(`/${location.pathname.split("/")[1]}/${project_id}`);
    }
    setSelectedProjectName(project_name);
    onChangeProject(project_name, project_id);
    setAnchor(false);
  };

  return (
    <Popover
      open={anchor}
      onClose={() => {
        setAnchor(false);
      }}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div className="popoverContainer">
        <div className="popover_Header">
          <h3 className="title">{selectedProjectName}</h3>
          <hr />
        </div>
        <div className="ItemContainer">
          
            return (
              <div className="PopoverDataItems" >
                <div className="Popover_items">
                  <div className="item">
                    <h5>Project</h5>
                  </div>
                  <div className="item">
                    <h5>Owner</h5>
                  </div>
                  <div className="item">
                  </div>
                </div>
                <button onClick={() => handleNavigation()}>
                  Switch
                </button>
              </div>
            );
          
        </div>
      </div>
    </Popover>
  );
};
export default DashBoardPopover;
