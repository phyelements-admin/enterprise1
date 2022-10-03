import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./createProjectPopUp.scss";
import { ReactComponent as CloseIcon } from "../../assets/svgs/close-circle.svg";
// import { getProjects, updateProject, createProject, checkProjectNameUniqe, getProjectById } from "../../services/projectService";
import { Alert, Button, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect } from "react";
// import { ProjectContext } from "context/ProjectContextProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: "background.paper",
  borderRadius: "8px",
  boxShadow: "0px 6px 30px rgba(181, 185, 192, 0.2)",
};

export default function CreateProjectPopUp(props) {
  const inputValue = props.inputValues.fName;
  const project_id = props.inputValues.id;
  const updateMode = props.updateMode;
  const [validation, setValidation] = React.useState({
    fName: "",
  });
  const [projectNameStatus, setProjectNameStatus] = React.useState({
    status: '',
    error: ''
  })

  // const { getAllProjectData } = React.useContext(ProjectContext)

  // useEffect(() => {
  //   handleCheckProjectName()
  // }, [inputValue])

  const handleClose = () => {
    props.handleShowPopUp(false);
    setValidation({ fName: '' })

  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (inputValue.trim() === '') {
  //     setValidation({ fName: 'This field is required.' })
  //     return
  //   }

  //   if (projectNameStatus.status !== "") {
  //     return
  //   }

  //   if (updateMode) {
  //     if (props.projectName.toLowerCase() === inputValue.toLowerCase()) {
  //       handleClose()
  //       return
  //     }
  //     if (validation.fName === "") {
  //       const dataFormat = {
  //         name: inputValue.trim(),
  //         id: project_id,
  //       };
  //       await updateProject(dataFormat).then((res) => {
  //         getAllProjectData();
  //         handleClose();
  //         props.handleClickToast({
  //           show: true,
  //           message: "Updated new project",
  //           severity: "success",
  //         });
  //         <Alert severity="success">Updated new project</Alert>;
  //       });
  //     }
  //   } else {
  //     if (validation.fName === "" && inputValue !== '') {
  //       const dataFormat = {
  //         name: inputValue.trim(),
  //       };
  //       await createProject(dataFormat)
  //         .then((res) => {
  //           getAllProjectData();
  //           handleClose();
  //           props.handleClickToast({
  //             show: true,
  //             message: "created new project",
  //             severity: "success",
  //           });
  //           <Alert severity="success">created new project</Alert>;
  //         })
  //         .catch((err) => <Alert severity="error">{err.message}</Alert>);
  //     }
  //   }
  // };

  const handleChange = (e) => {
    props.handleChange(e)
    let myRegEx = /^([A-Za-z0-9-(),-_@.-{}\[\]]+\s)*[A-Za-z0-9-(),-_@.-{}\[\]]*$/;
    if (e.target.value.trim() !== '') {
      if (myRegEx.test(e.target.value) && /^[^:<>\=`\\/\^;&$\?]+$/.test(e.target.value)) {
        setValidation({ fName: '' })
      } else {
        setValidation({ fName: 'The project name you have entered consists invalid characters, the following characters are supported for this field Alphabets numerals, single space, underscore, hyphen, @, (,),[,],{,}, comma and dot.' })
      }
    } else {
      setValidation({ fName: 'This field is required.' })
    }
  }

  // const handleCheckProjectName = async () => {

  //   if (inputValue !== props.projectName) {
  //     const nameRes = await checkProjectNameUniqe({ name: inputValue })
  //     if (nameRes.status === 200) {
  //       if (nameRes.data === false) {
  //         setProjectNameStatus({ ...projectNameStatus, status: "Project name must be unique." })
  //       } else {
  //         setProjectNameStatus({ ...projectNameStatus, status: "" })
  //       }
  //     }
  //   }

  // }

  return (
    <div>
      <Modal open={props.showCreatePopUp} onClose={handleClose}>
        <Box sx={style}>
          <div className="modal-container">
            <div className="modal-header-container">
              <h3 className="header">Create Project</h3>
              <span onClick={() => handleClose()} style={{ cursor: "pointer" }}>
                {/* <CloseIcon /> */}
                <HighlightOffIcon sx={{ color: "#C74C3C", fontSize: "24px" }} />
              </span>
            </div>
            <div className="modal-form-container">
              <form>
                <div className="form-control">
                  <h4>Project Name</h4>
                  <input
                    placeholder="Enter Project Name"
                    type="text"
                    name="fName"
                    id="fName"
                    className="input-field"
                    onChange={handleChange}
                    onBlur={handleChange}
                    value={inputValue}
                  />
                  {validation.fName !== "" ? <p className="error-message">{validation.fName}</p> : ""}
                  {projectNameStatus.status && !validation.fName && <p className="error-message">{projectNameStatus.status}</p>}
                </div>
              </form>
              <div className="modal-action-buttons">
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => handleClose()}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  disableElevation
                  // onClick={($event) => {
                  //   handleSubmit($event);
                  // }}
                >
                  {updateMode ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}