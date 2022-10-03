import { useContext, useEffect, useState } from "react";

import { ReactComponent as DataIcon } from "../assets/svgs/data.svg";
import SubjectIcon from '@mui/icons-material/Subject';
import HubIcon from "@mui/icons-material/Hub";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function useSideBarMenu() {
  

  const [firstProjectId, setFirstProjectId] = useState("");

 

  const menu = [
    {
      icon: HubIcon,
      title: "Enterprise",
      to: "/enterprise",
      items: [],
    },
    {
      icon: SubjectIcon,
      title: "Enterprise Licence",
      to: `/dataset/${firstProjectId ? firstProjectId : ""}`,
    },
    {
      icon: PersonOutlineIcon,
      title: "Enterprise Licence",
      to: "/view",
      items: [],
    },
    
  ];

  return menu;
}
