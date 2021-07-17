import   React, { useState, useRef, useEffect } from "react";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";
import "../Contractor/contractor.css";
import DashboardNav from "./specialistNavbar";
import "react-rangeslider/lib/index.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../config";
import useravatar from "../../images/user-avatar.png";
import formCaret from "../../images/caret.png";
import cert from "../../images/certificate.png";
import helmet from "../../images/helmet.png";
import closeimg from "../../images/closeimg.png";
import { NavHashLink } from "react-router-hash-link";
import StarRatingComponent from "react-star-rating-component";
import camimg from "../../images/imagecam.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios, { AxiosResponse } from "axios";
import editicon from "../../images/editicon.png";




const SpecialistSettings = () => {
  useEffect(() => {
    window.scrollTo(-0, -0);
  }, []);
  const [state, setState] = useState({
    work_orders: [],
    firsttab: true,
    secondtab: false,
    thirdtab: false,
    fourthtab: false,
    show: false,
    user: "",
    userExperience:"",
    email: "",
    city: "",
    address: "",
    experience_years: "",
    bio: "",
    terminateWorkModal: false,
    certificateModal:false,
    certificateDisplay: false,
    noCertificateAdded: true,
    certification:"",
    year:"",
    description:"",
    noExperienceAdded: true,
    experienceAdded: false,
    messageModal: true,
    viewPopup: false,
    reason: "",
    isloading: false,
    rating: null,
    age: null,
    certifications: [{}],
    dob: null,
    experience: null,
    experiences: [{}],
    experienceDescription:"",
    title: "",
    first_name: "",
    last_name: "",
    phone: "",
    photo: null,
    qualifications: [],
    skills: [],
    sKill_id: "",
    qualification: "",
    institution: "",
    experienceActive: "",
    addexperiencebtn:"",
    certificationActive: "",
    certificationbtn: "",
    noProjectsAdded: true,
    projects:[{}],
    projectModal: false,
    projectbtn:"",
    projectActive:"",
    field: "",
    from: "",
    to: "",
    verified: false,
    unverified: false,
    status: "",
    total_works:  null,
    fourthtabInactive: "",
    projectTitle:"",
    projectDescription:"",
    projectFrom:"",
    projectTo:"",
  });

  const {
    firsttab,
    secondtab,
    thirdtab,
    noProjectsAdded,
    projects,
    projectModal,
    projectTitle,
    projectbtn,
    projectActive,
    projectDescription,
    projectFrom,
    projectTo,
    experienceActive,
    certificationActive,
    fourthtabInactive,
    certificationbtn,
    addexperiencebtn,
    fourthtab,
    terminateWorkModal,
    certificateModal,
    total_works,
    certificateDisplay,
    noCertificateAdded,
    noExperienceAdded,
    userExperience,
    status,
    experienceAdded,
    certification,
    year,
    verified,
    unverified,
    photo,
    skill_id,
    qualification,
    institution,
    field,
    from,
    to,
    experienceDescription,
    messageModal,
    email,
    viewPopup,
    show,
    user,
    city,
    address,
    phone,
    dob,
    experience_years,
    bio,
    rating,
    reason,
    skills,
    first_name,
    experiences,
    certifications,
    qualifications,
    last_name,
    title,
    description,
    
  }: any = state;
  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
 const handleImageChange = (e) => {

  const reader: any= new FileReader();
  reader.onload =()=>{
    if(reader.readyState === 2){
      setState({
        ...state,
        photo: reader.result
      })
    }
  }
  reader.readAsDataURL(e.target.files[0]);
};
  console.log("image",photo)
  const hiddenFileInput: any= useRef();
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const switchTab = (a) => {
    if (a == "firsttab") {
      return setState({
        ...state,
        firsttab: true,
        secondtab: false,
        thirdtab: false,
        fourthtab: false,
      });
    }
    if (a == "secondtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: true,
        thirdtab: false,
        fourthtab: false,
      });
    }
    if (a == "thirdtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: false,
        thirdtab: true,
        fourthtab: false,
      });
    }
    if (a == "fourthtab") {
      return setState({
        ...state,
        firsttab: false,
        secondtab: false,
        thirdtab: false,
        fourthtab: true,
      });
    }
  };
  const submitProfile = () => {
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      phone,
      dob,
      city: city,
      address: address,
      experience_years,
      bio: bio,
      first_name,
      last_name,
    };
    console.log(data);
    axios
      .put(`${API}/specialist/update`, data, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        notify("Successfull");
        setTimeout(() => {
          setState({
            ...state,
            firsttab: false,
            secondtab: true,
            thirdtab: false,
            fourthtab: false,
          });
        }, 2000);
        console.log(res);
      })
      .catch((err) => {
        notify("Failed to save", "D");
        console.log(err.response);
      });
      
      // upload image to server; 
       const imageData = new FormData()
       imageData.append("image" , photo);
     console.log(imageData);
      axios.post(`${API}/photo`,imageData, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res)=>{
        console.log(res.data);
        setTimeout(()=>{
           notify("Successful")
        },1000)
      })
      .catch((err)=>{
        console.log(err.response)
        notify("failed to Upload Image")
      })
  }
  const certModal = () => {
    setState({
      ...state,
      certificateModal: true,
    });
  };
  const closecertModal = () => {
    setState({
      ...state,
      certificateModal: false,
    });
  };
  const workModal = () => {
    setState({
      ...state,
      terminateWorkModal: true,
    });
  };
  const closeworkModal = () => {
    setState({
      ...state,
      terminateWorkModal: false,
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
  const closeMessageModal = () => {
    setState({
      ...state,
      viewPopup: false,
    });
  };
  const onStarClick = (nextValue, prevValue, name) => {
    setState({
      ...state,
      [name]: nextValue.toString(),
    });
  };
  const notify = (message: string, type = "B") =>{
    toast(message, { containerId: type, position: "top-right" });
  }
   useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
  
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    Axios.all([
      Axios.get(`${API}/specialist`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
      Axios.get<any, AxiosResponse<any>>(`${API}/skills`),
      Axios.get(`${API}/specialist/projects`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        axios.spread((res,res2,res3) => {
          console.log(res.data);
          console.log(res2.data);
          console.log(res3.data);
          const user= res.data.data;
          const userProject= res3.data.data.data
          setState({
            ...state,
            ...res.data.data,
            projects:res3.data.data.data,
            user: res.data.data,
            noExperienceAdded: user.experiences.length<=0? true: false,
            noCertificateAdded: user.certifications.length<=0? true:false,
            verified: user.status === "Active"? true: false,
            unverified: user.status === "New"? true : false,
            viewPopup: user.status === "Active"? false : true,
            experienceActive: user.experiences.length<=0? "nowrapdemacator":"wrapdemacator",
            addexperiencebtn: user.experiences.length<=0? "noprofcerbtnwrapper":"profcerbtnwrapper",
            certificationActive: user.certifications.length<=0? "nowrapdemacator":"profcertifncntent",
            certificationbtn: user.certifications.length<=0? "nowrapdemacator":"profcerbtnwrapper",
            fourthtabInactive: user.status === "New" ? "inactivetab": "activetab",
            projectbtn: userProject.length <= 0? "noprofcerbtnwrapper":"profcerbtnwrapper",
            noProjectsAdded : userProject.length <= 0? true : false,
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const displayExperience =()=>{
    //add experience to UI
    if(title && experienceDescription){
      setState({
        ...state,
        terminateWorkModal: false,
        noExperienceAdded: experiences.length>=0? false: true,
        experiences : [...experiences, {title: title, description: experienceDescription}],
        experienceActive: experiences.length>=0? "wrapdemacator":"nowrapdemacator",
        addexperiencebtn: experiences.length<=0? "profcerbtnwrapper":"noprofcerbtnwrapper",
      })
    }  
  };
  
   const displayProject =()=>{
     //add project to UI
     if (projectTitle && projectDescription && projectFrom && projectTo){
      setState({
        ...state,
        noProjectsAdded : false,
       projects: [...projects, {title:projectTitle, description:projectDescription,from:projectFrom,to:projectTo}],
       projectModal: false,
       projectActive: projects.length>=0? "wrapdemacator":"nowrapdemacator",
      projectbtn: projects.length <= 0? "profcerbtnwrapper":"noprofcerbtnwrapper",
    })
     }
   };
 
  const displayCertification =()=>{
    //add certhification to UI
    if (certification && year){
     setState({
       ...state,
       noCertificateAdded: false,
       certifications: [...certifications, {title:certification, year:year}],
       certificateModal: false,
       certificationActive: certifications.length>=0? "profcertifncntent":"nowrapdemacator",
       certificationbtn: certifications.length>=0? "profcerbtnwrapper":"nowrapdemacator",
     })
    }
  };

  const post_Credentials = () => {
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data1 = {
      skill_id
    };
    console.log(skill_id)

    const data2={
      title,
     description: experienceDescription,
   }
    const data3 = {
      title: projectTitle,
      description: projectDescription,
      from: projectFrom,
      to: projectTo,
    };
    Axios.all([
      Axios.post(`${API}/specialist/skills`, data1, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
  
      Axios.post(`${API}/specialist/experiences`,data2 , {
        headers: { Authorization: `Bearer ${token.access_token}` }
      }),
    
      Axios.post(`${API}/specialist/projects`, data3, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        axios.spread((...responses) => {
          console.log(responses[0]);
          console.log(responses[1]);
          console.log(responses[2]);
          setState({
            ...state,
            firsttab: false,
            secondtab: false,
            thirdtab: true,
            fourthtab: false,
          });
          notify("Successful");
        })
      )
      .catch((err) => {
        console.log(err.response[0]);
        console.log(err.response[1]);
        console.log(err.response[2]);
        notify("Failed to save", "D");
      });
  };

  const post_qualification_and_experience =()=>{
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data4 ={
      qualification,
      institution,
      field,
      from,
      to
    }
    const data5 = {
      certification,
      year,
      description,
    };

    Axios.all([
      Axios.post(`${API}/specialist/qualifications`, data4, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
      Axios.post(`${API}/specialist/certifications`, data5, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
    .then(
      axios.spread ((...responses)=>{
        console.log(responses[0]);
        console.log(responses[1]);
       if(responses[0].status==201 && responses[1].status==201 &&  user.status === "New"){ 
         notify("Profile Successfully Completed, awaiting aprroval..")
       }
       else if(responses[0].status==201 && responses[1].status==201){
        notify("Profile Successfully Completed")
       }
       else{
        notify("unSuccessfull");
       }
        }))
    .catch((err)=>{
      console.log(err.response);
      notify("Failed to save", "D");
    })
  }

  return (
    <>
      <Container fluid={true}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Molecular - Specialialist Profile Settings</title>
          <link />
        </Helmet>
        <Row>
          <DashboardNav />
        </Row>
        <Row>
          <div className="settingtop"></div>
        </Row>
        <Row className="rowt3 rowta negmargin">
          <Col md={12} className="job34">
            <div className="psettings">
              <Modal
                show={viewPopup}
                centered={true}
                onHide={closeMessageModal}
              >
                <div className="usermodaltitle">
                  <i
                    className="fa fa-exclamation fa-rotate-180 exclamicon"
                    aria-hidden="true"
                  ></i>
                </div>
                <Modal.Body>
                  <div className="modalmessage">
                    Please complete your profile for verification
                  </div>
                </Modal.Body>
              </Modal>
              <div className="settings11">
                <div className="titleprofile1">Settings</div>
                <div id="skilltab"></div>
                <div id="experiencetab"></div>
                <div className="setting1">
                  <div className="namestyle111">
                    <div>
                      <span className="spluserimg">
                         <img src={photo !== null ? photo: useravatar} className="useravatar" /> 
                      </span>
                      <div className="camdv">
                        <img
                          src={camimg}
                          className="user-cam-img"
                          alt="cam-img"
                          onClick={handleClick}
                        />
                      </div>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        accept="image/*"
                        ref={hiddenFileInput}
                        />
                      <p className="upldtxt" onClick={handleClick}>Upload Picture</p>
                    </div>
                    <div className="home_pone12">
                      <div className="username">{user.first_name}</div>
                      <div className="helmot11">{user.email}</div>
                      <StarRatingComponent
                        name="specialist_rating"
                        className="specialist_rating"
                        starCount={5}
                        value={rating}
                        // onStarClick={onStarClick}
                        emptyStarColor={"#444"}
                      />
                      <div className="helmot112"></div>
                    </div>
                  </div>
                  <div className="orders1">
                    Total Work Orders
                    <div>
                      <span className="num12a">{total_works}</span>
                    </div>
                    {verified  &&( 
                     <span className="splverifiduser">Verified user</span> 
                    )}
                    {unverified &&(
                     <span className="splunverifieduser ">Unverified user</span>
                    )}
                     </div>
                </div>
                <div className="section_form">
                  <div className="profile__001">
                    {firsttab ? (
                      <div
                        className="Profile2002 Profile2002a"
                        onClick={() => switchTab("firsttab")}
                      >
                        Profile
                      </div>
                    ) : (
                      <div
                        className="Profile2002 Profile2002a inactivebordr"
                        onClick={() => switchTab("firsttab")}
                      >
                        Profile
                      </div>
                    )}
                    {secondtab ? (
                      <div
                        className="Profile2002 Profile2002a"
                        onClick={() => switchTab("secondtab")}
                      >
                        Skill and Experience
                      </div>
                    ) : (
                      <div
                        className="Profile2002 Profile2002a inactivebordr"
                        onClick={() => switchTab("secondtab")}
                      >
                       Skill and Experience
                      </div>
                    )}
                    {thirdtab ? (
                      <div
                        className="Profile2002 Profile2002a"
                        onClick={() => switchTab("thirdtab")}
                      >
                       Qualifications
                      </div>
                    ) : (
                      <div
                        className="Profile2002 Profile2002a inactivebordr"
                        onClick={() => switchTab("thirdtab")}
                      >
                       Qualifications
                      </div>
                    )}
                    {fourthtab ? (
                      <div
                        className="Profile2002 Profile2002a"
                        onClick={() => switchTab("fourthtab")}
                      >
                        Deactivate Account
                      </div>
                    ) : (
                      <div
                        className={`Profile2002 Profile2002a inactivebordr ${fourthtabInactive}`}
                        onClick={() => switchTab("fourthtab")}
                      >
                        Deactivate Account
                      </div>
                    )}
                  </div>
                  {firsttab && (
                    <div>
                      {" "}
                      <Row className="section_form1">
                        <Col md={6} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              First Name
                            </h6>
                            <Form.Control
                              className="userfield"
                              name="firstName"
                              value={user.first_name}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Last Name
                            </h6>
                            <Form.Control
                              type="text"
                              name="lastName"
                              className="userfield"
                              value={user.last_name}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">Email</h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              name="email"
                              value={email}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="section_form1">
                        <Col md={6} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Date of Birth
                            </h6>
                            <Form.Control
                              type="date"
                              name="dob"
                              className="userfield"
                              value={dob}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Phone Number
                            </h6>
                            <Form.Control
                              type="text"
                              className="userfield"
                              name="phone"
                              value={phone}
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Home Address
                            </h6>
                            <Form.Control
                              type="text-area"
                              className="userfield"
                              name="address"
                              value={address}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Experience Years
                            </h6>
                            <Form.Control
                              type="number"
                              name="experience_years"
                              value={experience_years}
                              className="userfield"
                              onChange={onchange}
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="formsection1">
                          <h6 className="userprofile userprofile12">City</h6>
                          <Form.Control
                            type="text"
                            name="city"
                            value={city}
                            className="userfield"
                            onChange={onchange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              About yourself (Optional)
                            </h6>
                            <Form.Control
                              type="text"
                              name="bio"
                              value={bio}
                              className="userfield"
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <NavHashLink to="#skilltab">
                            <div
                              className="job31"
                              onClick={() => submitProfile()}
                            >
                              Next
                            </div>
                          </NavHashLink>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {/* Second Tab Starts*/}
                  {secondtab && (
                    <div>
                      <Row className="section_form1">
                        <Col md={12} className="profpriski">
                          <h6 className="profillabels">
                            Primary skill
                          </h6>
                          <select
                            className="forminput profsettinformselect form-control"
                            required
                          >
                            {skills?.map((data, i) => (
                              <option
                                value={data.id}
                                className="profsettinformselect"
                              >
                                {data.name}
                              </option>
                            ))}
                          </select>
                          <div className="text-right">
                            <img src={formCaret} className="drparr" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <h6 className="profillabels">
                            Other skill
                          </h6>
                          <p>Tick the skills applicable</p>
                          <div>
                            <label className="form-check-label">
                              <input
                                className="profilecheckbox"
                                type="checkbox"
                                value="1"
                                name="skill_id"
                                onChange={onchange}
                                checked={skill_id ==="1"}
                              />
                              Fitting
                            </label>
                            <label className="form-check-label weldinbox">
                              <input
                                className="profilecheckbox "
                                type="checkbox"
                                value= "2"
                                name="skill_id"
                                id="flexCheckDefault"
                                onChange={onchange}
                                checked={skill_id ==="2"}
                              />
                              Welding
                            </label>
                          </div>
                          <div className="sectndivider"></div>
                        </Col>
                      </Row>
                      <Row className="section_form1">
                      <Col md={12}>
                        <Modal
                        centered={true}
                        onHide={closeworkModal}
                        show={terminateWorkModal}
                        >
                        <div className="terminateworkmodalwrap">
                          <div className="terminateworkmodalimg">
                            <img
                              src={closeimg}
                              alt="close"
                              onClick={closeworkModal}
                            />
                          </div>
                          <div className="terminateworkmodaltitle">
                            Add Experience
                          </div>
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
                            <label className="addexptitle">
                              Description
                              <textarea
                                name= "experienceDescription"
                                value={experienceDescription}
                                onChange={onchange}
                                className="form-control wrkmodaltextarea"
                                placeholder="Enter Description"
                                rows={5}
                                cols={5}
                              />
                            </label>
                          </form>
                          <div className="wrkmodal-btnwrap">
                            <span
                              className="wrkmodal-cancelbtn"
                              onClick={closeworkModal}
                            >
                              Cancel
                            </span>
                            <span className="wrkmodal-declinebtn addexpbtn" onClick={displayExperience}>
                              Add Experience
                            </span>
                          </div>
                        </div>
                      </Modal>
                          <div className="profileexperiencesectn">
                          <h3 className=" profillabels">
                            Experiences
                           </h3>
                          {noExperienceAdded &&(
                           <div>
                             <img src={helmet} alt="img" />
                             <p>You have no Experience Added</p>
                             <span className="profcertbtn" onClick={workModal}>
                               Add Experience
                             </span>
                           </div>
                           )}
                           <div className="profecperince-content">
                            {experiences.map((item, index)=>{
                                return(
                                  <div key={index} className={`wrapdemacator ${experienceActive}`}>
                                    <div className="profiexpernceheaderwrap">
                                      <p className="profiexpetitle">Title</p>
                                     <div>
                                       <img src={editicon} onClick={workModal} className="editimg"/>
                                    </div>
                                    </div>
                                    <p>{item.title}</p>
                                    <p className="profiexpetitle">Experience</p>
                                    <p>{item.description}</p>
                                
                                </div>
                              )
                            })}
                                <div className={`profcerbtnwrapper ${addexperiencebtn}`}>
                             <span className="wrkmodal-declinebtn profcertbtn" onClick={workModal}>
                               Add Experience
                             </span>
                            </div>
                           </div>
                          </div>
                          </Col>
                          <Col md={12}>
                        <Modal
                        centered={true}
                        onHide={closeProjectModal}
                        show={projectModal}
                        >
                        <div className="terminateworkmodalwrap">
                          <div className="terminateworkmodalimg">
                            <img
                              src={closeimg}
                              alt="close"
                              onClick={closeProjectModal}
                            />
                          </div>
                          <div className="terminateworkmodaltitle">
                            Add Project
                          </div>
                          <form>
                            <label className="addexptitle">
                              Title
                              <input
                                type="text"
                                className="userfield form-control"
                                name="projectTitle"
                                value={projectTitle}
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
                                name="projectFrom"
                                value={projectFrom}
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
                                name="projectTo"
                                value={projectTo}
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
                                name= "projectDescription"
                                value={projectDescription}
                                onChange={onchange}
                                className="form-control wrkmodaltextarea"
                                placeholder="Enter Description"
                                rows={5}
                                cols={5}
                              />
                            </label>
                          </form>
                          <div className="wrkmodal-btnwrap">
                            <span
                              className="wrkmodal-cancelbtn"
                              onClick={closeProjectModal}
                            >
                              Cancel
                            </span>
                            <span className="wrkmodal-declinebtn addexpbtn" onClick={displayProject}>
                              Add Project
                            </span>
                          </div>
                        </div>
                      </Modal>
                          <div className="profileexperiencesectn">
                            <h3 className="profillabels ">
                            Project Completed In the last 3 Years
                           </h3>
                          {noProjectsAdded &&(
                           <div>
                             <img src={helmet} alt="img" />
                             <p>You have no Projects Added</p>
                             <span className="profcertbtn" onClick={openProjectModal}>
                             Add Project
                             </span>
                           </div>
                           )}
                           <div className="profecperince-content">
                            {projects.map((item, index)=>{
                                return(
                                  <div key={index} className={`wrapdemacator ${projectActive}`}>
                                    <div className="profiexpernceheaderwrap">
                                      <p className="profiexpetitle">Title</p>
                                     <div>
                                       <img src={editicon} onClick={openProjectModal} className="editimg"/>
                                    </div>
                                    </div>
                                    <p className="stprojtitle">{item.title}</p>
                                    <p className="projdateperiod">from  {item.from}  to  {item.to} </p>
                                    <p className="profiexpetitle">Projects</p>
                                    <p>{item.description}</p>
                                
                                </div>
                              )
                            })}
                                <div className={`profcerbtnwrapper ${projectbtn}`}>
                             <span className="wrkmodal-declinebtn profcertbtn" onClick={openProjectModal}>
                               Add Project
                             </span>
                            </div>
                           </div>
                          </div>
                          </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <NavHashLink to="#experiencetab">
                            <div
                              className="job31"
                              onClick={post_Credentials}
                            >
                              Next
                            </div>
                          </NavHashLink>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {/* Second Tab ends*/}
                  {/* Third Tab start*/}
                  {thirdtab && (
                    <div>
                      <Row className="section_form1">
                      <Col md={12}>
                          <h3 className=" profillabels">
                            Qualification
                          </h3>
                        </Col>
                        <Col md={6}>
                        <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Enter Qualification
                            </h6>
                            <Form.Control
                              className="userfield"
                              name="qualification"
                              value={qualification}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                        <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Institution
                            </h6>
                            <Form.Control
                              className="userfield"
                              name="institution"
                              value={institution}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                        <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Field of Study
                            </h6>
                            <Form.Control
                              className="userfield"
                              name="field"
                              value={field}
                              onChange={onchange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                        <label className="addexptitle">
                              From
                              <input
                                type="date"
                                className="userfield form-control"
                                name="from"
                                value={from}
                                onChange={onchange}
                                placeholder="From"
                                size={70}
                              />
                            </label>
                        </Col>
                        <Col md={3}>
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
                      <div className="sectndivider"></div>
                      <Modal
                        centered={true}
                        onHide={closecertModal}
                        show={certificateModal}
                      >
                        <div className="terminateworkmodalwrap">
                          <div className="terminateworkmodalimg">
                            <img
                              src={closeimg}
                              alt="close"
                              onClick={closecertModal}
                            />
                          </div>
                          <div className="terminateworkmodaltitle">
                            Add Certification
                          </div>
                          <form>
                            <label className="addexptitle">
                              Certification
                              <input
                                type="text"
                                className="userfield form-control"
                                name="certification"
                                value={certification}
                                onChange={onchange}
                                placeholder="Enter Certification"
                                size={70}
                              />
                            </label>
                            <label className="addexptitle">
                              Year
                              <input
                                type="date"
                                className="userfield form-control"
                                name="year"
                                value={year}
                                onChange={onchange}
                                placeholder="Enter Title"
                                size={70}
                              />
                            </label>
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
                            <span
                              className="wrkmodal-cancelbtn"
                              onClick={closecertModal}
                            >
                              Cancel
                            </span>
                            <span className="wrkmodal-declinebtn addexpbtn" onClick={displayCertification}>
                            Add Certificate
                            </span>
                          </div>
                        </div>
                      </Modal>
                       <div className="profileceriticatesectn">
                         <h3 className=" profillabels ">
                            Certifications
                         </h3>
                       {noCertificateAdded && (<div>
                         <img src={cert} alt="img" />
                         <p>You have no Certificates Added</p>
                         <span className="profcertbtn" onClick={certModal}>Add Certificate</span>
                        </div>
                       )}
                        {certifications.map((item, index)=>{
                          return(
                          <div  className={`profcertifncntent ${certificationActive}`} key={index}>
                            <div>
                              <p className="profcertheading">Certification</p>
                              <p>{item.title}</p>
                            </div>
                            <div className="profcertdate">
                              <p className="profcertheading">Year</p>
                              <p>{item.year}</p>
                            </div>
                          </div>
                        )})}
                        <div  className={`profcerbtnwrapper ${certificationbtn}`}>
                          <span className="profcertbtn" onClick={certModal}>Add Certificate</span>
                       </div>
                      </div>
                      <Row>
                        <Col md={12}>
                          <div className="job31" onClick={post_qualification_and_experience}>
                            Save
                          </div>
                        </Col>
                      </Row>
                      
                    </div>
                  )}
                  {/* Third Tab ends*/}
                  {fourthtab && (
                    <>
                      <Row className="section_form1">
                        <Col md={12}>
                          <h3 className="userprofile userprofile12 profillabels">
                            Deactivate Account
                          </h3>
                          <br></br>
                        </Col>

                        <Col md={8} className="formsection1">
                          <Form.Group>
                            <h6 className="userprofile userprofile12">
                              Reason for Deactivation
                            </h6>
                            <textarea
                              value={reason}
                              id="reason"
                              onChange={onchange}
                              className="form-control"
                            ></textarea>
                          </Form.Group>
                          <span className="wrkmodal-declinebtn deactivebtn">
                            Deactivate
                          </span>
                        </Col>
                      </Row>
                    </>
                  )}
                  {/* <ProFileInfo /> */}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        size="sm"
        show={show}
        onHide={() =>
          setState({
            ...state,
            show: false,
          })
        }
        dialogClassName="modal-90w"
        className="mdl12"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Warning!!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <p>
                You are about to deactivate this account, please note that this
                action cannot be undone.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="terminate2">
              <div className="terminate1">Terminate</div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        toastClassName="bg-orange text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"D"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={"top-right"}
      />
    </>
  );
};

export default SpecialistSettings;
function data1(
  arg0: string,
  data1: any,
  arg2: { headers: { Authorization: string } }
): AxiosResponse<any> | Promise<AxiosResponse<any>> {
  throw new Error("Function not implemented.");
}

function data2(
  arg0: string,
  data2: any,
  arg2: { headers: { Authorization: string } }
): AxiosResponse<any> | Promise<AxiosResponse<any>> {
  throw new Error("Function not implemented.");
}
