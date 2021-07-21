import React, { useState, useEffect } from "react";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";
import Axios, { AxiosResponse } from "axios";
import closeimg from "../../images/closeimg.png";
import helmet from "../../images/helmet.png";
import editicon from "../../images/editicon.png";
import { API } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Projects = () => {
  const [state, setState] = useState({
    projects: [{}],
    project_id:"",
    title:"",
    description:"",
    from: "",
    to: "",
    noProjectsAdded: true,
    projectModal: false,
    projectActive: "",
    projectbtn:"",
    openModal: false,
    id:"",
  });
  const { 
    projects,
    title,
    id,
    description,
    from,
    to,
    noProjectsAdded,
    projectbtn,
    projectActive,
    projectModal,
    openModal,
    project_id,
   }: any = state;

  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const openProjectModal = () => {
    setState({
      ...state,
      projectModal: true,
    });
  };
  const closeProjectModal = () => {
    setState({
      ...state,
      projectModal: false,
    });
  };
  const addModal = () => {
    setState({
      ...state,
      openModal: true
    });
  };
  const closeModal = () => {
    setState({
      ...state,
      openModal: false
    });
}
  const editProject = (id) => {
    setState({
      ...state,
      project_id: id,
      projectModal: true,
    });
  };
  
  const inputModalChange = (state, id) => {
    const project_id = state.project_id;
    let tempProjectDetails = state.projects;
    tempProjectDetails[project_id]= state
    //  edit added project
    setState({
      ...state,
      projects: tempProjectDetails,
      projectModal: false,
    });
        //post to API
        const availableToken = localStorage.getItem("loggedInDetails");
        console.log(availableToken);
        const token = availableToken ? JSON.parse(availableToken) : "";
        console.log(token);
        const data={
          title,
          description,
          from,
          to,
       }
        Axios.put(`${API}/specialist/projects/${id}`, data , {
          headers: { Authorization: `Bearer ${token.access_token}` }
        })
        .then((res)=>{
         console.log(res.data)
           if(res.status==200 ){ 
             notify("project updated successfully ")
           }
        })
        .catch((err)=>{
          console.log(err.response)
          if(err.response ){ 
            notify("failed to Update")
          }
        })
  };
  const notify = (message: string, type = "B") =>{
    toast(message, { containerId: type, position: "top-right" });
  }

  const displayProject = () => {
    //add project to UI
    if (title && description && from && to) {
      setState({
        ...state,
        noProjectsAdded: false,
        projects: [...projects,{id, title: title,description: description,from: from,to: to}],
        openModal: false,
        projectActive: projects.length >= 0 ? "wrapdemacator" : "nowrapdemacator",
        projectbtn: projects.length >= 0 ? "profcerbtnwrapper" : "noprofcerbtnwrapper"
      });
    }
    //post data to API
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      title,
      description,
      from,
      to,
    };
    Axios.post(`${API}/specialist/projects`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    .then((res)=>{
       console.log(res.data);
       if(res.status==200 ){ 
        notify("project successfully added")
      }
    })
    .catch((err)=>{
      console.log(err.response)
      if(err.response ){ 
        notify("failed to add project")
      }
    })
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    setState({
      ...state,
      noProjectsAdded: projects.length == 1? true:false,
      projectActive: projects.length == 1? "nowrapdemacator":"wrapdemacator",
      projectbtn: projects.length == 1? "noprofcerbtnwrapper":"profcerbtnwrapper",
    });
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    Axios.all([
      Axios.get(`${API}/specialist/projects`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        Axios.spread((res) => {
          console.log(res.data);
          const userProject= res.data.data.data
          setState({
            ...state,
            ...res.data.data,
            projects:res.data.data.data,
            projectbtn: userProject.length <= 0? "noprofcerbtnwrapper":"profcerbtnwrapper",
            noProjectsAdded : userProject.length <= 0? true : false,
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
    
  }, []);
  return (
    <>
      <Modal centered={true} onHide={closeProjectModal} show={projectModal}>
        <div className="terminateworkmodalwrap">
          <div className="terminateworkmodalimg">
            <img src={closeimg} alt="close" onClick={closeProjectModal} />
          </div>
          <div className="terminateworkmodaltitle">Edit Project</div>
          <form>
            <label className="addexptitle">
              Title
              <input
                type="text"
                className="userfield form-control"
                name="title"
                value={title}
                onChange={onchange}
                placeholder="Enter Title"
                size={70}
              />
            </label>
            <Row>
              <Col md={6}>
                <label className="addexptitle">
                  From
                  <input
                    type="date"
                    className="userfield form-control"
                    name="from"
                    value={from}
                    onChange={onchange}
                    placeholder="projectFrom"
                    size={70}
                  />
                </label>
              </Col>
              <Col md={6}>
                <label className="addexptitle">
                  To
                  <input
                    type="date"
                    className="userfield form-control"
                    name="to"
                    value={to}
                    onChange={onchange}
                    placeholder="TO"
                    size={70}
                  />
                </label>
              </Col>
            </Row>
            <label className="addexptitle">
              Description
              <textarea
                name="description"
                value={description}
                onChange={onchange}
                className="form-control wrkmodaltextarea"
                placeholder="Enter Description"
                rows={5}
                cols={5}
              />
            </label>
          </form>
          <div className="wrkmodal-btnwrap">
            <span className="wrkmodal-cancelbtn" onClick={closeProjectModal}>
              Cancel
            </span>
            <span
              className="wrkmodal-declinebtn addexpbtn"
              onClick={()=>inputModalChange(state,id)}
            >
              Save
            </span>
          </div>
        </div>
      </Modal>
      <Modal centered={true} onHide={closeModal} show={openModal}>
        <div className="terminateworkmodalwrap">
          <div className="terminateworkmodalimg">
            <img src={closeimg} alt="close" onClick={closeModal} />
          </div>
          <div className="terminateworkmodaltitle">Add Project</div>
          <form>
            <label className="addexptitle">
              Title
              <input
                type="text"
                className="userfield form-control"
                name="title"
                value={title}
                onChange={onchange}
                placeholder="Enter Title"
                size={70}
              />
            </label>
            <Row>
              <Col md={6}>
                <label className="addexptitle">
                  From
                  <input
                    type="date"
                    className="userfield form-control"
                    name="from"
                    value={from}
                    onChange={onchange}
                    placeholder="projectFrom"
                    size={70}
                  />
                </label>
              </Col>
              <Col md={6}>
                <label className="addexptitle">
                  To
                  <input
                    type="date"
                    className="userfield form-control"
                    name="to"
                    value={to}
                    onChange={onchange}
                    placeholder="TO"
                    size={70}
                  />
                </label>
              </Col>
            </Row>
            <label className="addexptitle">
              Description
              <textarea
                name="description"
                value={description}
                onChange={onchange}
                className="form-control wrkmodaltextarea"
                placeholder="Enter Description"
                rows={5}
                cols={5}
              />
            </label>
          </form>
          <div className="wrkmodal-btnwrap">
            <span className="wrkmodal-cancelbtn" onClick={closeModal}>
              Cancel
            </span>
            <span
              className="wrkmodal-declinebtn addexpbtn"
              onClick={displayProject}
            >
              Add Project
            </span>
          </div>
        </div>
      </Modal>
      <div className="profileexperiencesectn">
        <h3 className="profillabels ">Project Completed In the last 3 Years</h3>
        {noProjectsAdded && (
          <div>
            <img src={helmet} alt="img" />
            <p>You have no Projects Added</p>
            <span className="profcertbtn" onClick={addModal}>
              Add Project
            </span>
          </div>
        )}
        <div className="profecperince-content">
          {projects.map((item, id) => {
            return (
              <div key={item.id} className={`wrapdemacator ${projectActive}`}>
                <div className="profiexpernceheaderwrap">
                  <p className="profiexpetitle">Title</p>
                  <div>
                    <img
                      src={editicon}
                      onClick={()=>editProject(id)}
                      className="editimg"
                    />
                  </div>
                </div>
                <p className="stprojtitle">{item.title}</p>
                <p className="projdateperiod">
                  from {item.from} to {item.to}{" "}
                </p>
                <p className="profiexpetitle">Projects</p>
                <p>{item.description}</p>
              </div>
            );
          })}
          <div className={`profcerbtnwrapper ${projectbtn}`}>
            <span
              className="wrkmodal-declinebtn profcertbtn"
              onClick={addModal}
            >
              Add Project
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Projects
