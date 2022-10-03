import { Navigate, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import DrawerSidebar from "./components/Sidenav/DrawerSidebar";
import Header from "./components/Header/Header";
import IconButton from "@mui/material/IconButton";
import JsonForm from "./components/JsonForm/JsonForm";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Enterprise from "./container/enterprise"

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#203E7A",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Dashboard = () => {
 
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };
  

  return (
    <>
      <Box sx={{ display: "flex" }}>

        <AppBar
          position="fixed"
          open={open}
          sx={{
            zIndex: 1000,
            backgroundColor: "#fff",
            boxShadow: "none",
            borderBottom: "1px solid #e4e4e4",
          }}
        >
          <Toolbar style={{ padding: 0 }}>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Header handleSideNavShow={handleDrawerOpen} />
            </Stack>
          </Toolbar>
        </AppBar>

        <ClickAwayListener onClickAway={handleDrawerClose}>
          <Drawer
            variant="permanent"
            open={open}
            sx={{ zIndex: 1001, backgroundColor: "#203E7A" }}
          >
            <DrawerHeader
              sx={{
                zIndex: 1001,
                backgroundColor: "#203E7A",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerToggle}
              >
                {open ? (
                  <ArrowBackIcon sx={{ color: "#fff", ml: 1 }} />
                ) : (
                  <MenuIcon sx={{ color: "#fff", ml: 1 }} />
                )}
              </IconButton>
            </DrawerHeader>
            <DrawerSidebar
              open={open}
              handleDrawerClose={handleDrawerClose}
            />
          </Drawer>
        </ClickAwayListener>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            pl: 11,
            position: "fixed",
            width: "100%",
            height: "calc(100vh - 84px)",
            overflowY: "auto",
          }}
        >
          <Routes>
          <Route
              path="/enterprise"
              element={
                
                  <Enterprise />
                
              }
            />
             
          </Routes>
          {/* <Routes>
            <Route path="/" element={<Navigate to="/login" />} />


            <Route
              path="/login"
              element={isLogIn ? <Navigate to="/projects" /> : <SignIn />}
            />
            <Route
              path="/projects"
              element={
                <AuthGuard>
                  <Projects />
                </AuthGuard>
              }
            />

            <Route
              path="/projects/:id"
              element={
                <AuthGuard>
                  <ProjectDetails />
                </AuthGuard>
              }
            />

            <Route
              path="/dataset/:id"
              element={
                <AuthGuard>
                  <DatasetNested />
                </AuthGuard>
              }
            />

            <Route
              path="/add-dataset/:id"
              element={
                <AuthGuard>
                  <AddDataset />
                </AuthGuard>
              }
            />

            <Route
              path="/connections/:id"
              element={
                <AuthGuard>
                  <Connections />
                </AuthGuard>
              }
            />

            <Route
              path="/features-models"
              element={
                <AuthGuard>
                  <FeaturesAndModelsIndex />
                </AuthGuard>
              }
            />

            <Route
              path="/run-models"
              element={
                <AuthGuard>
                  <RunModal />
                </AuthGuard>
              }
            />

            <Route
              path="/Models"
              element={
                <AuthGuard>
                  <Model />
                </AuthGuard>
              }
            />

            <Route
              path="/Features"
              element={
                <AuthGuard>
                  <Feature />
                </AuthGuard>
              }
            />

            <Route
              path="/data-transformation"
              element={
                <AuthGuard>
                  <DataTransformation />
                </AuthGuard>
              }
            />

            <Route
              path="/view"
              element={
                <AuthGuard>
                  <ComputerVision />
                </AuthGuard>
              }
            />

            <Route path="/jsonForm" element={<JsonForm />} />
            <Route path="/errorpage" element={<PageError />} />
            <Route path="/loginerror" element={<PageLoginError />} />
          </Routes> */}
        </Box>
      </Box>

      
        {/* <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={isLogIn ? <Navigate to="/projects" /> : <SignIn />}
          />
          <Route
            path="/projects"
            element={
              <AuthGuard>
                <Projects />
              </AuthGuard>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <AuthGuard>
                <ProjectDetails />
              </AuthGuard>
            }
          />

          <Route
            path="/dataset/:id"
            element={
              <AuthGuard>
                <DatasetNested />
              </AuthGuard>
            }
          />

          <Route
            path="/add-dataset/:id"
            element={
              <AuthGuard>
                <AddDataset />
              </AuthGuard>
            }
          />

          <Route
            path="/connections/:id"
            element={
              <AuthGuard>
                <Connections />
              </AuthGuard>
            }
          />

          <Route
            path="/features-models"
            element={
              <AuthGuard>
                <FeaturesAndModelsIndex />
              </AuthGuard>
            }
          />

          <Route
            path="/run-models"
            element={
              <AuthGuard>
                <RunModal />
              </AuthGuard>
            }
          />

          <Route
            path="/Models"
            element={
              <AuthGuard>
                <Model />
              </AuthGuard>
            }
          />

          <Route
            path="/Features"
            element={
              <AuthGuard>
                <Feature />
              </AuthGuard>
            }
          />

          <Route
            path="/data-transformation"
            element={
              <AuthGuard>
                <DataTransformation />
              </AuthGuard>
            }
          />

          <Route
            path="/view"
            element={
              <AuthGuard>
                <ComputerVision />
              </AuthGuard>
            }
          />

          <Route path="/jsonForm" element={<JsonForm />} />
          <Route path="/errorpage" element={<PageError />} />
          <Route path="/loginerror" element={<PageLoginError />} />

        </Routes> */}
      
    </>
  );
};

export default Dashboard;
