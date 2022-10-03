import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ActiveListBorder from "../../assets/icons/sidenav_active_list_item.png";
import InActiveListBorder from "../../assets/icons/sidenav_inactive_list_item.png";
import { ReactComponent as LogoIcon } from "../../assets/svgs/logo-icon.svg";
import { ReactComponent as LogoIconWithText } from "../../assets/svgs/logo-icon-with-text.svg";
import { NavLink } from "react-router-dom";
import useSideBarMenu from "../../utils/menu";

export default function DrawerSidebar({ open, handleDrawerClose }) {
  const menu = useSideBarMenu();

  return (
    <>
      <List sx={{ backgroundColor: "#203E7A", flexGrow: 1 }}>
        {menu.map((item, index) => {
          const { icon: ItemIcon } = item;

          return (
            <NavLink
              to={item.to}
              key={index}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <>
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    key={index}
                  >
                    <img
                      src={isActive ? ActiveListBorder : InActiveListBorder}
                      alt="menu icon"
                      style={{
                        width: "8px",
                        height: "48px",
                        objectFit: "contain",
                      }}
                    />
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{
                        display: "block",
                      }}
                    >
                      <ListItemButton
                        selected={isActive}
                        onClick={handleDrawerClose}
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          pl: 1.75,
                          pr: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                            color: isActive ? "#ffffff" : "#607DB9",
                          }}
                        >
                          <ItemIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          sx={{
                            opacity: open ? 1 : 0,
                            color: isActive ? "#fff" : "#607DB9",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </List>
      <List sx={{ zIndex: 1001, backgroundColor: "#203E7A" }}>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                display: open ? "none" : "block",
                justifyContent: "center",
              }}
            >
              <LogoIcon />
            </ListItemIcon>
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                display: open ? "block" : "none",
                padding: "8px",
              }}
            >
              <LogoIconWithText />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
