import AddIcon from "@mui/icons-material/Add";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  IconButton,
  InputAdornment,
  Paper,
  Portal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../assets/icons/profile.png";
import DataGridTable from "../components/DataGridTable/Datagridtable";
import ProfileUser from "../assets/icons/profile-2user.png";
import Hierarchy from "../assets/icons/hierarchy-3.png";
import Textblock from "../assets/icons/text-block.png";
import Trash from "../assets/icons/trash.png";
import { ReactComponent as DeleteProjectIcon } from "../assets/svgs/delete.svg";
import { ReactComponent as TableIcon } from "../assets/svgs/table.svg";
import { ReactComponent as UserIcon } from "../assets/svgs/team.svg";
import { ReactComponent as RenameProjectIcon } from "../assets/svgs/renameProject.svg";
import { ReactComponent as SearchIcon } from "../assets/svgs/search.svg";
import CustomAlert from "../components/Alert/CustomALert";
import { ReactComponent as CloseIcon } from "../assets/svgs/close-circle.svg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Tooltip from "@mui/material/Tooltip";
import CreateProjectPopUp from "./CreateProjectPopup/CreateProjectPopUp";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function Enterprise() {
  let navigate = useNavigate();

  const [rowsData, setRowsData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreatePopUp, setShowCreatePopUp] = React.useState(false);
  const [hoveredRow, setHoveredRow] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [ShowDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [deleteProjectname, setDeleteProjectname] = useState("");
  const [disableDelete, setDisableDelete] = useState(true);
  const [searchError, setSearchError] = useState("");
  const [projectid, setProjectId] = useState();
  const [projectName, setProjectName] = useState("");
  const [inputValues, setInputValue] = React.useState({
    fName: "",
    id: "",
  });
  
  const handleSearch = (queryString) => {
    const _data = {
      search_string: queryString,
    };
    // getProjectsBySearch(_data);
  };
  const chipStyles = {
    // border: "1px solid #1C96F2",
    padding: "6px 10px",
    gap: "10px",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "12px",
    letterSpacing: "0.4px",
    color: "#0A9CEE",
    backgroundColor: "rgba(10, 156, 238, 0.1)",
    borderRadius: "18px",
  };

  const dataGridColumns = [
    {
      field: "enterprise_name",
      minWidth: 180,
      renderHeader: () => <strong>{"Enterprise name "} </strong>,
      flex: 1,
    },
    {
      field: "country",
      minWidth: 150,
      flex: 1,
      renderHeader: () => <strong>{"Country "}</strong>,
      
    },
    {
      field: "url",
      minWidth: 200,
      renderHeader: () => <strong>{"URL "}</strong>,
      flex: 1,
    },
    {
      field: "billing_user_name",
      minWidth: 200,
      renderHeader: () => <strong>{"Billing user name"}</strong>,
      renderCell: (cellValues) => {
        return (
          <Chip
            sx={chipStyles}
            color="primary"
            label="example"
            avatar={<Avatar src={Profile} />}
          />
        );
      },
      flex: 1,
    },
    {
        field: "billing_user_email_phone",
        minWidth: 180,
        renderHeader: () => <strong>{"Billing user Email/Phone"}</strong>,
        flex: 1,
    },
      {
        field: "number_of_licences",
        minWidth: 200,
        renderHeader: () => <strong>{"Number of licenses"}</strong>,
        flex: 1,
      },
      {
        field: "licence_type",
        minWidth: 200,
        renderHeader: () => <strong>{"Licence type"}</strong>,
        flex: 1,
      },
      {
        field: "expiry_date",
        minWidth: 200,
        renderHeader: () => <strong>{"Expiry date"}</strong>,
        flex: 1,
      },
    
    
  ];

//   const dataGridRows = rowsData?.map((row) => {
//     return {
//      enterprise_name:"xyz",
//      country:"India",
//      url:"www.com",
//      billing_user_name:"abc",
//      billing_user_email_phone:"123456789",
//      number_of_licences:"2",
//      licence_type:"unknown",
//      expiry_date:"20/20/2025",
//     };
//   });
const rows = [
    { id:1,enterprise_name: "xyz", country: 'India', url: 'www.com', billing_user_name:'abc', billing_user_email_phone:'123456789', number_of_licences:"2", licence_type:"un", expiry_date:"20/01/2025"  },
    { id:2,enterprise_name: "abc", country: 'India', url: 'www.com', billing_user_name:'abc', billing_user_email_phone:'123456789', number_of_licences:"2", licence_type:"un", expiry_date:"20/01/2025"  },
    { id:3,enterprise_name: "aaa", country: 'India', url: 'www.com', billing_user_name:'abc', billing_user_email_phone:'123456789', number_of_licences:"2", licence_type:"un", expiry_date:"20/01/2025"  },
    { id:4,enterprise_name: "bbb", country: 'India', url: 'www.com', billing_user_name:'abc', billing_user_email_phone:'123456789', number_of_licences:"2", licence_type:"un", expiry_date:"20/01/2025"  },
    { id:5,enterprise_name: "acd", country: 'India', url: 'www.com', billing_user_name:'abc', billing_user_email_phone:'123456789', number_of_licences:"2", licence_type:"un", expiry_date:"20/01/2025"  },
    { id:6,enterprise_name: "xyz", country: 'India', url: 'www.com', billing_user_name:'abc', billing_user_email_phone:'123456789', number_of_licences:"2", licence_type:"un", expiry_date:"20/01/2025"  },
    { id:7,enterprise_name: "xyz", country: 'India', url: 'www.com', billing_user_name:'abc', billing_user_email_phone:'123456789', number_of_licences:"2", licence_type:"un", expiry_date:"20/01/2025"  },

  ];
 
  


  const onMouseEnterRow = (event) => {
    const id = event.currentTarget.getAttribute("data-id");
    setHoveredRow(id);
  };

  const onMouseLeaveRow = () => {
    setHoveredRow(null);
  };

  const navigateTo = (event, project) => {
    event.preventDefault();
    navigate("/dataset/" + project.id);
  };

  const handleRowClick = (params) => {
    // navigate("/dataset/" + params.row.id);
  };
  const handleShowPopUp = (data) => {
    setShowCreatePopUp(data);
    setUpdateMode(false);
    setInputValue({
      fName: "",
      id: "",
    });
  };
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }
  const [data, setData] = useState({
    enterprise_name:"xyz",
    country:"India",
    url:"www.com",
    
    billing_user_email_phone:"123456789",
    number_of_licences:"2",
    licence_type:"unknown",
    expiry_date:"20/20/2025",
  });

  return (
    <>
      <Paper
        sx={{
          pb: 3,
          width: "100%",
          boxShadow: 0,
          border: 1,
          borderColor: "#efefef",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          p={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E4E4E4",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Typography variant="h4" className="_link-active">
              Enterprise Licence
            </Typography>
          </Breadcrumbs>
          <Stack direction="row" sx={{ display: "flex", ml: "auto" }}>
            <div
              style={{
                marginRight: "20px",
                boxSizing: "border-box",
                border: "1px solid #e4e4e4",
                padding: "0 0 0 15px",
                width: "267px",
                borderRadius: "4px",
                height: "32px",
                overflow: "hidden",
              }}
            >
              <TextField
                variant="outlined"
                id="standard"
                fullWidth
                size="small"
                placeholder="Search by Enterprise licence"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                      {/* <img src={SearchIcon} /> */}
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                sx={{
                  height: "100%",
                  "& input": {
                    backgroundColor: "transparent",
                    width: "100%",
                  },
                  "& div": {
                    height: "100%",
                  },
                }}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Basic example"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                     }}
                     renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider> */}
            </div>
            <Button
              size="medium"
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
              onClick={() => setShowCreatePopUp(true)}
              sx={{
                height: "32px",
              }}
            >
              Add
            </Button>
          </Stack>
        </Stack>
        {/* {loadingProject && <p className="text-center">Loading....</p>} */}
        
          <DataGridTable
            rows={rows}
            columns={dataGridColumns}
            // loading={isLoading}
            checkboxSelection={false}
            // NoRowsMessage={searchError && searchError.length ? searchError : ""}
            onMouseEnterRow={onMouseEnterRow}
            onMouseLeaveRow={onMouseLeaveRow}
            onRowClick={handleRowClick}
          />
      </Paper>
      {/* {showCreatePopUp ? (
        <CreateProjectPopUp
          handleShowPopUp={handleShowPopUp}
          showCreatePopUp={showCreatePopUp}
          updateMode={updateMode}
          setData={setData}
          data={data}
        //   handleClickToast={handleClickToast}
          handleChange={(e) => {
            handleChange(e);
          }}
          projectName={projectName}
          inputValues={inputValues}
          renderNewAddedProject={(data) => {
            handleRenderAddedProject(data);
          }}
        />
      ) : (
        ""
      )}
      {showUsersModal && (
        <UsersModal
          open={showUsersModal}
          project_id={projectid}
          close={() => {
            setShowUsersModal(false);
          }}
        />
      )}
      {ShowDeleteDialog && (
        <div>
          <Dialog
            open={ShowDeleteDialog}
            onClose={handleCloseDeletePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box
              sx={{
                width: "534px",
                minHeigth: "256px",
              }}
            >
              <DialogContent
                sx={{
                  padding: "26px 26px 0",
                }}
              >
                <Box
                  onClick={handleCloseDeletePopup}
                  sx={{
                    cursor: "pointer",
                    textAlign: "end",
                    marginBottom: "11px",
                  }}
                >
                  <HighlightOffIcon
                    sx={{ color: "#C74C3C", fontSize: "24px" }}
                  />
                </Box>
                <Typography
                  variant="h3"
                  id="alert-dialog-title"
                  sx={{
                    fontFamily: "Lato",
                    fontSize: "20px",
                    fontWeight: "700",
                    lineHeight: "24px",
                    letterSpacing: "0em",
                    textAlign: "center",
                    marginBottom: "14px",
                    color: "#292D32",
                  }}
                >
                  {"Are you sure you want to delete your project?"}
                </Typography>

                <DialogContentText
                  id="alert-dialog-description"
                  sx={{
                    width: "309px",
                    margin: "0 auto 32px",
                    fontFamily: "Lato",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "130%",
                    textAlign: "center",
                  }}
                >
                  All datasets, models, and pipelines associated with this
                  project will be deleted.
                </DialogContentText>

                <Typography
                  id="alert-dialog-description"
                  sx={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "17px",
                    textAlign: "center",
                    color: "#292D32",
                    marginBottom: "8px",
                  }}
                >
                  Kindly enter "{deleteProjectname}" in the textbox below.
                </Typography>
                <Box
                  sx={{
                    width: "378px",
                    height: "40px",
                    margin: "0 auto 32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    type="text"
                    fullWidth
                    margin="dense"
                    name="deleteProject"
                    placeholder="Please enter project name, shown above."
                    onChange={handleChangeDeleteProjectName}
                    sx={{
                      "& input": {
                        width: "100%",
                        height: "100%",
                        fontSize: "16px",
                      },
                    }}
                  />
                </Box>
              </DialogContent>
              <DialogActions
                sx={{
                  paddingBottom: "49px",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <Button
                  // color="primary"
                  sx={{
                    backgroundColor: "#FFFF",
                    color: "#4F535A",
                    border: "1px solid #E4E4E4",
                    "&:hover": {
                      backgroundColor: "#FFFF",
                      color: "#4F535A",
                    },
                  }}
                  onClick={handleCloseDeletePopup}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  sx={{
                    backgroundColor: "#C74C3C",
                    color: "#FAFBFD",
                    marginLeft: "0 !important",
                    "&:hover,&:disabled": {
                      backgroundColor: "#C74C3C",
                      color: "#FAFBFD",
                    },
                  }}
                  variant="contained"
                  disabled={disableDelete}
                  onClick={deleteProjectHandler}
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </div>
      )} */}
    </>
  );
}
