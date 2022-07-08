import React, { useState, useEffect } from "react";
import { Col, Row, Form, Modal, Alert } from "react-bootstrap";
import Axios, { AxiosResponse } from "axios";
import closeimg from "../../images/closeimg.png";
import editicon from "../../images/editicon.png";
import { API } from "../../config";
import cert from "../../images/certificate.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import document from "../../images/document 1.png";
import formCaret from "../../images/caret.png";

const SplstBankDetails = () => {
  const [state, setState] = useState({
    bank_details: {},
    certificateEditModal: false,
    noCertificateAdded: true,
    certificationActive: "",
    certificationbtn: "",
    qualification: "",
    qualification_id: "",
    certificateAddModal: false,
    institution: "",
    field: "",
    from: "",
    to: "",
    bank_detal_id: "",
    deleteCredential: false,
    errorMessage: "",
    successMessage: "",
    isloading: false,
    banks: [],
    bank_id: 1,
    account_name: "",
    account_number: "",
    user: "",
    bank_name: "",
  });
  const {
    errorMessage,
    bank_id,
    user,
    successMessage,
    account_name,
    account_number,
    isloading,
    bank_details,
    bank_detal_id,
    deleteCredential,
    certificateEditModal,
    noCertificateAdded,
    certificationActive,
    certificateAddModal,
    certificationbtn,
    qualification,
    qualification_id,
    banks,
    bank_name,
  }: any = state;

  const onchange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const editCertificate = (id, account_name, account_number, bank_name) => {
    setState({
      ...state,
      certificateEditModal: true,
      bank_detal_id: id,
      account_number,
      account_name,
      bank_name,
    });
  };
  const inputModalChange = (state, bank_detal_id) => {
    let tempBankDetails = state.bank_details;
    tempBankDetails.bank_detal_id = state;
    setState({
      ...state,
      isloading: true,
    });
    //post to API
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      account_name,
      account_number,
      bank_id,
    };
    Axios.put(`${API}/specialist/banks/${bank_detal_id}`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          setState({
            ...state,
            isloading: false,
            bank_details: tempBankDetails,
            certificateEditModal: false,
          });
          notify("Bank details updated successfully ");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          setState({
            ...state,
            isloading: false,
          });
          notify("failed to Update");
        }
      });
  };

  const certEditModal = () => {
    setState({
      ...state,
      certificateEditModal: true,
    });
  };
  const closeEditModal = () => {
    setState({
      ...state,
      certificateEditModal: false,
    });
  };
  const addCertModal = (bank_name) => {
    setState({
      ...state,
      certificateAddModal: true,
      bank_name: bank_name,
    });
  };
  const closeAddModal = () => {
    setState({
      ...state,
      certificateAddModal: false,
    });
  };

  const notify = (message: string, type = "B") => {
    toast(message, { containerId: type, position: "top-right" });
  };

  const displayBankDetails = () => {
    //add certhification to UI
    setState({
      ...state,
      isloading: true,
    });
    //post to API
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      account_name,
      account_number,
      bank_id,
    };
    Axios.post(`${API}/specialist/banks`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
      .then((res) => {
        console.log(res.data);
        if (res.status == 201) {
          setState({
            ...state,
            noCertificateAdded: false,
            bank_details: { account_name, account_number },
            isloading: false,
            certificateAddModal: false,
          });
          notify("Bank account added successfully");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          notify("failed to add Bank account");
          setState({
            ...state,
            isloading: false,
            errorMessage: err?.response?.data?.message,
          });
        }
      });
  };
  const getBankDetails = () => {
    //add certhification to UI
    setState({
      ...state,
      isloading: true,
    });
    //post to API
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    const data = {
      account_number,
      bank: bank_id,
    };
    Axios.post(`${API}/verify/bank-account`, data, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
      .then((res) => {
        console.log(res.data);
        setState({
          ...state,
          account_name: res?.data?.data?.account_name,
          isloading: false,
          // certificateAddModal: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          notify("Incorrect bank details");
          setState({
            ...state,
            isloading: false,
            account_name: "",
            errorMessage: err?.response?.data?.message,
          });
        }
      });
  };
  useEffect(() => {
    window.scrollTo(-0, -0);
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    setState({
      ...state,
      bank_details: {},
    });
    console.log(bank_details);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);
    Axios.all([
      Axios.get(`${API}/specialist/banks`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
      Axios.get(`${API}/banks`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }),
    ])
      .then(
        Axios.spread((res, res2) => {
          console.log(res.data);
          console.log(res2.data);
          console.log(res.data.data);
          const user = res.data.data;
          setState({
            ...state,
            bank_details: res.data.data,
            banks: res2.data.data.data,
            // noCertificateAdded: user.length<=0? true:false,
            // certificationActive: user.length<=0? "nowrapdemacator":"bnkwrapdemacator",
            // certificationbtn: user.length<=0? "nowrapdemacator":"profcerbtnwrapper",
          });
        })
      )
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const deleteQualification = (id) => {
    setState({
      ...state,
      deleteCredential: true,
      bank_detal_id: id,
    });
  };
  const closeDeleteModal = () => {
    setState({
      ...state,
      deleteCredential: false,
    });
  };

  const deleteModalChange = (state, bank_detal_id) => {
    //post to API
    setState({
      ...state,
      isloading: true,
    });
    const availableToken = localStorage.getItem("loggedInDetails");
    console.log(availableToken);
    const token = availableToken ? JSON.parse(availableToken) : "";
    console.log(token);

    Axios.delete(`${API}/specialist/banks/${bank_detal_id}`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          setState({
            ...state,
            isloading: false,
          });
          notify("bank account successfully deleted");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          setState({
            ...state,
            isloading: false,
          });
          notify("failed to Delete");
        }
      });
  };

  return (
    <>
      <Modal show={deleteCredential} centered={true} onHide={closeDeleteModal}>
        <div className='usermodaltitle'>Delete Bank Account ?</div>
        <Modal.Body>
          <div className='wrkmodal-btnwrap'>
            <span className='wrkmodal-cancelbtn' onClick={closeDeleteModal}>
              Cancel
            </span>
            <span
              className='wrkmodal-declinebtn'
              onClick={() => deleteModalChange(state, bank_detal_id)}>
              {!isloading ? "  Delete " : "Deleting..."}
            </span>
          </div>
        </Modal.Body>
      </Modal>
      <Modal centered={true} onHide={closeAddModal} show={certificateAddModal}>
        <div className='terminateworkmodalwrap'>
          <div className='terminateworkmodalimg'>
            <img src={closeimg} alt='close' onClick={closeAddModal} />
          </div>
          <div className='terminateworkmodaltitle'>Add Bank Account </div>
          {successMessage && (
            <Alert key={2} variant='success' className='alertmessg'>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert key={2} variant='danger' className='alertmessg'>
              {errorMessage}
            </Alert>
          )}
          <Row>
            <Col md={12}>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Bank Name</h6>
                <select
                  className='forminput profsettinformselect form-control'
                  required
                  name='bank_id'
                  onChange={onchange}
                  onBlur={getBankDetails}>
                  <option value='' className='rdsltopt' selected hidden>
                    {bank_name}
                  </option>
                  {banks?.map((data, i) => (
                    <option value={data.id} className='profsettinformselect'>
                      {data.name}
                    </option>
                  ))}
                </select>
                <div className='text-right'>
                  <img src={formCaret} className='drparr' />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Col md={12}>
            <Form.Group>
              <h6 className='userprofile userprofile12'>Bank Name</h6>
              <select
                className='forminput profsettinformselect form-control'
                required
                name='bank_id'
                onChange={onchange}>
                <option value='' className='rdsltopt' selected hidden>
                  {bank_name}
                </option>
                {banks?.map((data, i) => (
                  <option value={data.id} className='profsettinformselect'>
                    {data.name}
                  </option>
                ))}
              </select>
              <div className='text-right'>
                <img src={formCaret} className='drparr' />
              </div>
            </Form.Group>
          </Col>
          <Row>
            <Col md={6}>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Account Name</h6>
                <Form.Control
                  className='userfield'
                  name='account_name'
                  value={account_name}
                  onChange={onchange}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Account Number</h6>
                <Form.Control
                  className='userfield'
                  name='account_number'
                  type='number'
                  value={account_number}
                  onChange={onchange}
                  onBlur={getBankDetails}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className='wrkmodal-btnwrap'>
            <span className='wrkmodal-cancelbtn' onClick={closeAddModal}>
              Cancel
            </span>
            <span
              className='wrkmodal-declinebtn addexpbtn'
              onClick={displayBankDetails}>
              {!isloading ? "  Add Bank Details" : "Adding..."}
            </span>
          </div>
        </div>
      </Modal>
      <Modal
        centered={true}
        onHide={closeEditModal}
        show={certificateEditModal}>
        <div className='terminateworkmodalwrap'>
          <div className='terminateworkmodalimg'>
            <img src={closeimg} alt='close' onClick={closeEditModal} />
          </div>
          <div className='terminateworkmodaltitle'>Edit Bank Account </div>
          <Col md={12}>
            <Form.Group>
              <h6 className='userprofile userprofile12'>Bank Name</h6>
              <select
                className='forminput profsettinformselect form-control'
                required
                name='bank_id'
                onChange={onchange}>
                <option value='' className='rdsltopt' selected hidden>
                  {bank_name}
                </option>
                {banks?.map((data, i) => (
                  <option value={data.id} className='profsettinformselect'>
                    {data.name}
                  </option>
                ))}
              </select>
              <div className='text-right'>
                <img src={formCaret} className='drparr' />
              </div>
            </Form.Group>
          </Col>
          <Row>
            <Col md={6}>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Account Name</h6>
                <Form.Control
                  className='userfield'
                  name='account_name'
                  value={account_name}
                  onChange={onchange}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <h6 className='userprofile userprofile12'>Account Number</h6>
                <Form.Control
                  className='userfield'
                  name='account_number'
                  type='number'
                  value={account_number}
                  onChange={onchange}
                  onBlur={getBankDetails}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row></Row>
          <div className='wrkmodal-btnwrap'>
            <span className='wrkmodal-cancelbtn' onClick={closeEditModal}>
              Cancel
            </span>
            <span
              className='wrkmodal-declinebtn addexpbtn'
              onClick={() => inputModalChange(state, bank_detal_id)}>
              {!isloading ? "  Save " : "Processing..."}
            </span>
          </div>
        </div>
      </Modal>
      <div className='text-center'>
        <h3 className=' profillabels '>
          Bank Account Details <small>(to receive payment for work done)</small>
        </h3>
        {bank_details == null && (
          <div>
            <img
              src={document}
              alt='no work request'
              className='no_work_order'
            />
            <p>You have no Bank Account Added</p>
            <span className='profcertbtn' onClick={addCertModal}>
              Add Bank Account
            </span>
          </div>
        )}
        {bank_details && (
          <div className={`bnkwrapdemacator ${certificationActive}`}>
            <div className='profcertifncntent'>
              <div className='profilequaltnwrap'>
                <p className='profcertheading'>Account Name</p>
                <p>{bank_details.account_name}</p>
              </div>
              <div className='profqualiInstitutwrap'>
                <p className='profcertheading'>Account Number</p>
                <p>{bank_details.account_number}</p>
              </div>
              <div className='credentialsactions'>
                <div>
                  <img
                    src={editicon}
                    onClick={() =>
                      editCertificate(
                        bank_details.id,
                        bank_details.account_name,
                        bank_details.account_number,
                        bank_details.bank_name
                      )
                    }
                    className='editimg'
                  />
                </div>
                <div
                  className='credentialdeletebtn'
                  onClick={() => deleteQualification(bank_details.id)}>
                  X
                </div>
              </div>
            </div>
            <div className='profcertifncntent'>
              <div className='profilequaltnwrap'>
                <p className='profcertheading'>Bank Name</p>
                <p>{bank_details.bank_name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default SplstBankDetails;
