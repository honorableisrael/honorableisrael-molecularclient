import React, { Component } from "react";
import {
  Switch,
  Route,
  BrowserRouter,
  HashRouter,
  Router,
} from "react-router-dom";
import "./App.css";
import ContractorDashboard from "./Components/Contractor/ContractorDashboard";
import NewWorkOrderForm from "./Components/Contractor/New_Work_Order";
import ContractorWorkOrder from "./Components/Contractor/Work_Order";
import SignUp from "./Components/Specialist/signup";
import Home from "./Components/Landing_page/home";
import NewWorkOrderStep2 from "./Components/Contractor/New_Work_Order_Step2";
import NewWorkOrderStep3 from "./Components/Contractor/New_Work_Order_Step3";
import WorkOrderDetails from "./Components/Contractor/Work_Order_Details";
import ContractorLanding from "./Components/Landing_page/contractorlanding";
import Learnmore from "./Components/Landing_page/learnmore";
import Blog from "./Components/Landing_page/blog";
import SpecialistLanding from "./Components/Landing_page/specialistlanding";
import Notification from "./Components/Contractor/Notification";
import Contractor_Payment_Invoice from "./Components/Contractor/Payment_Invoice";
import Invoice_details from "./Components/Contractor/Invoice_Details";
import ContractorsignUp from "./Components/Contractor/contractorsignup";
import ContractorOTP from "./Components/Contractor/contractorOTP";
import SpecialistDashboard from "./Components/Specialist/specialistDashboard";
import Works from "./Components/Specialist/works";
import Payments from "./Components/Specialist/payments";
import SpecialistSettings from "./Components/Specialist/settings";
import Contractor_Profile from "./Components/Contractor/ContractorProfile/ProfileSettings";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import SpecialistWorkOrderDetails from "./Components/Specialist/specialistWorkCardDetail";
import ListOfContractor from "./Components/Admin/ContractorList";
import ContractorOnboarding from "./Components/Admin/contractorsignup";
import AdminViewWorkOrderDetails from "./Components/Admin/Work_Order_Details";
import AdminWorkOrder from "./Components/Admin/Admin_Work_Order";
import SpecialistNotification from "./Components/Specialist/Specialistnotification";
import Specialist_Payment_Invoice from "./Components/Specialist/SplPaymentInvoice";
import AssignSpecialist from "./Components/Admin/AssignSpecialist";
import ForgotPassword from "./Components/Sign_in/forgotpassword";
import Contractorsignup from "./Components/Contractor/contractorsignup";
import AdminWorkOrderEvaluation from "./Components/Admin/Work_Order_Evaluation";
import AdminWorkOrderEvaluationStep2 from "./Components/Admin/Work_Order_EvaluationStep2";
import AdminWorkOrderEvaluationStep3 from "./Components/Admin/Work_Order_EvaluationStep3";
import AdminWorkOrderEvaluationStep4 from "./Components/Admin/Work_Order_EvaluationStep4";
import Admin_Notification from "./Components/Admin/Notification";
import All_Specialist from "./Components/Admin/All_Specialist";
import ContactUs from "./Components/Landing_page/contactUs";
import Projects from "./Components/Landing_page/projects";
import IndustrySegments from "./Components/Landing_page/IndustrySegments";
import Admin_Payment_Invoice from "./Components/Admin/Payment_Invoice";
import DeployedSpecialist from "./Components/Admin/deployedSpecialist";
import Specialistdetails from "./Components/Admin/SpecialistPersonalDetails";
import "react-toastify/dist/ReactToastify.css";
import Admin_NewWorkOrderForm from "./Components/Admin/Admin_Raise_Work_Order/New_Work_Order";
import Admin_NewWorkOrderStep2 from "./Components/Admin/Admin_Raise_Work_Order/New_Work_Order_Step2";
import Amin_NewWorkOrderStep3 from "./Components/Admin/Admin_Raise_Work_Order/New_Work_Order_Step3";
import Admin_Invoice_details from "./Components/Admin/Invoice_Details";
import AdminRaiseProformaInvoice from "./Components/Admin/RaiseProformaInvoice";
import ProformaInvoiceAccepted from "./Components/Contractor/Invoice_Accepted";
import ScheduledPayments from "./Components/Admin/scheduledpayments";
import SignIn from "./Components/Sign_in/signin";
import AdminSpecialistSettings from "./Components/Admin/Specailist_Settings/specialist_settings";
import Password_Reset from "./Components/Sign_in/password_reset";
import Privacy from "./Components/Landing_page/Privacy";
import AdminProfile from "./Components/Admin/ContractorProfile/ProfileSettings";
import AdminSettingManagment from "./Components/Admin/admin_setting_management";
import Contractor_Details from "./Components/Admin/Contractor_Details";
import ContractorInvoiceDetails from "./Components/Contractor/Contractor_invoice_details";
import Contractor_Invoices from "./Components/Admin/Contractor_Invoices";
import ScheduledPaymentDetails from "./Components/Admin/scheduledpayment_details";
import Admin_Sub_Invoice_Details from "./Components/Admin/Sub_Invoice_Details";
import Invoice_details_view_only from "./Components/Admin/Invoice_Details_View_Only";
import Contractor_Transactions from "./Components/Admin/Contractor_Transactions";
import Contractor_Transactions_details from "./Components/Admin/Contractor_Transactions_details";
import Specialist_Transactions from "./Components/Admin/Specialist_Transactions";
import Specialist_Details_For_Contractor from "./Components/Contractor/SpecialistPersonalDetails";
import BlogList from "./Components/Admin/Blog";
import NewBlogPost from "./Components/Admin/New_Blog_Post";
import BlogDetails from "./Components/Landing_page/blogdetails";
import previewBlog from "./Components/Landing_page/blogpreview";

const App: any = ({ history }) => {
  return (
    <div className='App'>
      <div>
        <Router history={history}>
          <HashRouter>
            <Switch>
              {/* <Home /> */}
              {/* Contractor Dashbaord */}
              <Route
                exact={true}
                path='/contractor_dashboard'
                component={ContractorDashboard}
              />
              
              <Route path='/work_order' component={NewWorkOrderForm} />
              <Route
                exact={true}
                path='/contractor_signup'
                component={ContractorsignUp}
              />
              <Route path='/work_order' component={NewWorkOrderForm} />
              <Route path='/specialistlanding' component={SpecialistLanding} />
              <Route path='/Learnmore' component={Learnmore} />
              <Route path='/contractorlanding' component={ContractorLanding} />
              <Route
                exact={true}
                path='/molecular_OTP'
                component={ContractorOTP}
              />
              <Route path='/work_order' component={NewWorkOrderForm} />
              <Route path='/specialistlanding' component={SpecialistLanding} />
              <Route path='/blog' component={Blog} />
              <Route path='/blog_details/:id' component={BlogDetails} />
              <Route path='/testblog' component={previewBlog} />
              
              
              <Route path='/admin/blogpost' component={BlogList} />
              <Route path='/admin/new/blogpost' exact component={NewBlogPost} />
              
              <Route path='/projects' component={Projects} />
              <Route path='/contactus' component={ContactUs} />
              <Route path='/contractorlanding' component={ContractorLanding} />
              <Route path='/Industry_segments' component={IndustrySegments} />
              <Route path='/work_order' component={NewWorkOrderForm} />
              <Route
                path='/contractor_work_order'
                component={ContractorWorkOrder}
              />
              <Route
                path='/contractor_work_order_step2'
                component={NewWorkOrderStep2}
              />
              <Route
                path='/contractor_work_order_step3'
                component={NewWorkOrderStep3}
              />
              <Route
                path='/contractor_work_order_details'
                component={WorkOrderDetails}
              />
              <Route path='/notification' component={Notification} />
              <Route
                path='/payment_invoice'
                component={Contractor_Payment_Invoice}
              />
              <Route
                path='/admin_invoice_details/:id/:workorderid'
                component={Admin_Invoice_details}
              />
              <Route
                path='/admin_sub_invoice_details/:id/:workorderid'
                component={Admin_Sub_Invoice_Details}
              />
              <Route
                path='/admin_invoice_details_view_only/:id/:workorderid'
                component={Invoice_details_view_only}
              />

              <Route path='/invoice_details/:id' component={Invoice_details} />
              <Route
                path='/raise_proforma_invoice'
                component={AdminRaiseProformaInvoice}
              />
              <Route
                path='/contractor_profile'
                component={Contractor_Profile}
                exact={true}
              />
              {/* Contractor Dashbaord */}
              {/* Admin Dashboard */}
              <Route
                path='/work_order_evaluation'
                component={AdminWorkOrderEvaluation}
              />
              <Route path='/admin_assign/:id' component={AssignSpecialist} />
              <Route
                path='/admin_evaluation_step3'
                component={AdminWorkOrderEvaluationStep3}
              />
              <Route path='/admin_dashboard' component={AdminDashboard} />
              <Route path='/contractor_transactions' component={Contractor_Transactions} />
              <Route path='/specialist_transactions' component={Specialist_Transactions} />
              <Route path='/contractor_transactions_details/:id' component={Contractor_Transactions_details} />
              
              <Route path='/scheduled_payments' component={ScheduledPayments} />
              <Route
                path='/scheduled_payments_details/:id'
                component={ScheduledPaymentDetails}
              />

              <Route path='/admin/settings' component={AdminProfile} />

              <Route
                path='/contractor_onboarding'
                component={ContractorOnboarding}
              />
              <Route path='/contractor_signup' component={Contractorsignup} />
              <Route
                path='/contractor_onboarding'
                component={ContractorOnboarding}
              />
              <Route
                path='/proforma_invoice_accepted'
                component={ProformaInvoiceAccepted}
              />
              <Route
                path='/deployedspecialist/:id'
                component={DeployedSpecialist}
              />
              <Route
                path='/admin_work_details/:id'
                component={AdminViewWorkOrderDetails}
              />
              <Route path='/allspecialist' component={All_Specialist} />
              <Route
                path='/admin_payment_invoice'
                component={Admin_Payment_Invoice}
              />
               <Route
                path='/contractor/review/specailist/:id'
                component={Specialist_Details_For_Contractor}
              />
              <Route
                path='/contractor_invoices/:id'
                component={Contractor_Invoices}
              />

              <Route
                path='/admin_view/:contractorid/contractor_invoice/:id'
                component={ContractorInvoiceDetails}
              />

              <Route path='/contractor_list' component={ListOfContractor} />
              {/* <Route path="/contractor/:id" component={ListOfContractor} /> */}
              <Route
                path='/pipe_schedule_management'
                component={AdminSettingManagment}
              />

              <Route
                path='/admin_evaluation_step4'
                component={AdminWorkOrderEvaluationStep4}
              />
              <Route
                path='/admin_notification'
                component={Admin_Notification}
              />
              <Route
                path='/admin_evaluation_step2'
                component={AdminWorkOrderEvaluationStep2}
              />
              <Route path='/admin_work_order' component={AdminWorkOrder} />
              <Route
                path='/admin_new_work_order'
                component={Admin_NewWorkOrderForm}
              />
              <Route
                path='/admin_new_work_order_step2'
                component={Admin_NewWorkOrderStep2}
              />
              <Route
                path='/admin_new_work_order_step3'
                component={Amin_NewWorkOrderStep3}
              />
              <Route
                path='/admin/specialist/settings/:id'
                component={AdminSpecialistSettings}
              />
              <Route
                path='/admin_assign_specialist'
                component={AssignSpecialist}
              />
              <Route path='/specialistdetails' component={Specialistdetails} />
              <Route
                path='/admin/contractors/:id'
                component={Contractor_Details}
              />
              {/* Admin Dashboard ends */}
              {/* specialist Dashboard */}
              <Route
                path='/specialistdashboard'
                component={SpecialistDashboard}
              />
              <Route
                path='/specialistWorkOrderDetails'
                component={SpecialistWorkOrderDetails}
              />
              <Route path='/works' component={Works} />
              <Route path='/payments' component={Payments} />
              <Route path='/settings' component={SpecialistSettings} />
              {/* specialist Dashboard */}
              <Route path='/specialist_signup' component={SignUp} />
              <Route
                exact={true}
                path='/specialistnotifications'
                component={SpecialistNotification}
              />
              <Route
                exact={true}
                path='/Specialist_Payment_Invoice/:id'
                component={Specialist_Payment_Invoice}
              />
              <Route exact={true} path='/privacy' component={Privacy} />
              <Route path='/signin' exact={true} component={SignIn} />
              <Route
                path='/forgot_password'
                exact={true}
                component={ForgotPassword}
              />
              <Route
                path='/reset-password'
                exact={true}
                component={Password_Reset}
              />

              <Route path='/' exact={true} component={Home} />
            </Switch>
          </HashRouter>
        </Router>
      </div>
    </div>
  );
};

export default App;
