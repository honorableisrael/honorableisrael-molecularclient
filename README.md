Molecular Frontend App is web application built with React version 16.8.3 Clarity Frontend App goes beyond usual html and css and provides you entire intuitive user experi ence and a development friendly coding approach.The application is built with client side Rendering and API's are built on PHP backend.

Moreover, there are several versions of the Clarity frontend application, enhanced with different features.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

Background
Note

Consider this the canonical resource for contributing Javascript and CSS. We are currently in the process of modernizing our front end development procedures. You will see a lot of different styles around the code base for front end JavaScript and CSS.

Our front end development stack includes the following tools:

HTML,
Javascript,
Typescript,
CSS,
SCSS,
REACT JS

We use the following UI libraries:
Bootstrap,
React-bootstrap.

The front end application currently has some dependecies required for the application to start this are being managed in the package.json file of the application.

### `Getting Started`
You will need a working version of Node (tested with v10.17.0) and NPM to get started. We won’t cover that here, as it varies from platform to platform.

To install these tools and dependencies:

npm install

This command installs all the front end dependecies registered in the package.json.

### `Project Overview`
The image files used across the project are stored in the folder called assets. It is located in the directory "src\assets". 

The source components for the different features and screens are located in a folder called Components which can be found in the directory "src\Components"

The fonts used can be found in the folder called Fonts located in the directory "src\Fonts".

### `Project Components`
The components folder is subdivided into two folders namely; Home and Dashboard.

## `Home`
The home folder contains the components that can be accessed by a user without authentication. It is located in directory "src\Components\Home".

## `Dashboard`
The dashboard folder contains the components that can require authentication before access is given. The authentication involves user sign up or sign in.

The dashboard has three user types namely; individual, counselor & affiliate.

# `Individual`
The components for the clarity for individuals section can be found in the Dashboard folder. These componenets require authentication for user access. 

# `Counselor`
The components for the clarity for counselor section can be found in the CouncellorDasboard and CounsellorLandingPage folders located at the directories "src\Components\Dashboard\CouncellorDasboard" and "src\Components\Dashboard\CounsellorLandingPage" respectively.

The Counselor section has a separate landing page with a path "/forcounselors". The components of the CounsellorLandingPage folder contain the components that can be accessed by users without authorization.

The CouncellorDasboard folder contains the components that require authentication before access is granted.

# `Affiliate`
The components for the clarity for affiliate section can be found in the AffiliateDashboard and Clarity Affiliate landing page folders located at the directories "src\Components\Dashboard\AffiliateDashboard" and "src\Components\Home\Clarity Affiliate landing page" respectively.

The Affiliate section has a separate landing page with a path "/affiliatehomepage". The components of the Clarity Affiliate landing page folder contain the screens that can be accessed by users without authorization.

The AffiliateDashboard folder contains the components that require authentication before access is granted.

## `Routes`
The App.tsx folder located in the directory "src\App.tsx" contains the Routes to the different components accessible by the user.


## `Component Description`

**Landing page**
The component for the landing page can be found in the RedesignedHome.tsx file. The function getCurrentAssessmentPosition() is called within this page to determine the logged in user last assessment step and redirected to the page to continue session.

A get request is made within this function to fetch the last session of the user from this endpoint `{{url}}/progress`.

**About page**
No functionality applied here

**FAQ page**
No functionality applied here

**Signin page**
A controlled form is used in the sign in page and a get request is made to `/accounts/login` on the same page.

**Signup page**
A controlled form is used in the sign up page and a get request is made to `/accounts/signup/` on the same page.
The page can be found on the \Redesigned_signup_page\signup.tsx 

**Forgot password page**
A controlled form is used in the forgot password page and a get request is made to `/claritypasswordresetemail` on the same page.
The page can be found on the \Redesigned_signup_page\signup.tsx 

**Password reset page**
This page recieves two dynamic parameters via the route. These are userid and token 
a post request is sent to an endpoint with path `/resetpassword/${userid}/${token}`.

**Payment Page** 
The root component for this page can be found in the ~~ Redesigned_Payment_Page.tsx ~~
This page comprises of three component Navbar, PaymentSummary and Footer component.
The paymentsummary component can be found in the file named ClarityExperience.tsx in the same directory.
The Payment gate way is monnify and this is initailized via a content delivery network.
A function that handles the payment reference `**requestForPayref()**` is called first then the payment gate is called as a callback function.
A different function is often called when the gift a subscription `**giftSubscriptionPayref()**` is selected.

***Individual Dashboard***

**Navigation**
The root component for this can be found in the ~~ SideBarNewDashboard.tsx ~~ file for the desktop screen and the ~~ DashboardNavBar.tsx ~~ file for the mobile screen.
This component handles the navigation on the user dashboard. It comprises several elements (tabs) that are linked to other components.

The *Overview* tab is linked to the ~~ NewDashboard.tsx ~~ file which can be accessed via the path "/overview".

The *Career Insight* tab is linked to the ~~ NewDashboardFullInsight.tsx ~~ file which can be accessed via the path "/thirdpary/fullresult" that redirects to the path "/fullinsight". This page is only accessible to users who satisfy a condition. This condition is determined by the data obtained from a get request made to an endpoint with the path `/paymentstatus`.

The *Talk to a Counselor* tab opens up an accordion that reveals two sub-tabs.

    The *Book a private session* tab is linked to the ~~ CouncellorDates.tsx ~~ file which can be accessed via the path "/counsellordates".

    The *Ask a Counselor* tab is linked to the ~~ NewDashboardAllMessages.tsx ~~ file which can be accessed via the pathname "/allusermessages". This page is only accessible to users who satisfy a condition. This condition is determined by the data obtained from a get request made to an endpoint with the path `/paymentstatus`. This data is stored in the local storage under the name "accessFeature".

The *Recommended Task* tab is linked to the ~~ NewCouncellorsRecommendation.tsx ~~ file which can be accessed via the path "/counsellorsrecommendation".

The *Task Todo* tab opens up an accordion that reveals two sub-tabs.

    The *Task Overview* tab is linked to the ~~ TodoOverview.tsx ~~ file which can be accessed via the path "/todooverview".

    The *All Task* tab is linked to the ~~ TodoList.tsx ~~ file which can be accessed via the path "/todolist".

The *Opportunity Recommender* tab is linked to the ~~ NewDashboardJobOpportunities.tsx ~~ file which can be accessed via the path "/jobopportunities". his page is only accessible to users who satisfy a condition. This condition is determined by the data obtained from a get request made to an endpoint with the path `/paymentstatus`. This data is stored in the local storage under the name "accessFeature".

The *Profile Builder* tab is linked to the ~~ CVProfileBuilder.tsx ~~ file which can be accessed via the path "/profilebuilder".

The *Settings* tab is linked to the ~~ DashboardSettings.tsx ~~ file which can be accessed via the path "/dashboardsettings".

The *Subscription* tab is linked to the ~~ NewDashboardSubsciptionPlan.tsx ~~ file which can be accessed via the path "/dashboardsubscriptionplan".

The *Support* tab is linked to the ~~ NewDashboardSupport.tsx ~~ file which can be accessed via the path "/dashboardsupport".

The *Logout* tab makes a call to `**openLogoutModal()**` which opens up a logout confirmation modal.


***Counselor Dashboard***

**Navigation**
The root component for this can be found in the ~~ SideBarCounsellorDashboard.tsx ~~ file for the desktop screen and the ~~ CounsellorsDashboardNavBar.tsx ~~ file for the mobile screen.
This component handles the navigation on the counselor dashboard. It comprises several elements (tabs) that are linked to other components.

The *Overview* tab is linked to the ~~ CouncellorOverview.tsx ~~ file which can be accessed via the path "/counselloroverview".

The *Booked Sessions* tab is linked to the ~~ CouncellorBookedSessions.tsx ~~ file which can be accessed via the path "/counsellorbookings".

The *Messages* tab is linked to the ~~ CouncellorAllMessages.tsx ~~ file which can be accessed via the path "/counsellormessages".

The *Recommended Task* tab is linked to the ~~ CouncellorRecommendations1.tsx ~~ file which can be accessed via the path "/counsellorrecommendations1".

The *Profile Builder* tab is linked to the ~~ CounsellorCVProfileBuilder.tsx ~~ file which can be accessed via the path "/counsellorprofilebuilder".

The *Assigned Members* tab is linked to the ~~ CouncellorAssignedMembers.tsx ~~ file which can be accessed via the path "/counsellorassignedmembers".

The *Referrals* tab is linked to the ~~ referrals.tsx ~~ file which can be accessed via the path "/referrals".

The *Settings* tab is linked to the ~~ CouncellorSettings.tsx ~~ file which can be accessed via the path "/counsellorsettings".

The *Support* tab is linked to the ~~ CouncellorSupport.tsx ~~ file which can be accessed via the path "/counsellorsupport".

The *Logout* tab makes a call to `**openLogoutModal()**` which opens up a logout confirmation modal.


***Affiliate Dashboard***

**Navigation**
The root component for this can be found in the ~~ SideBarAffiliateDashboard.tsx ~~ file for the desktop screen and the ~~ SmallScreenNavbarAffiliates.tsx ~~ file for the mobile screen.
This component handles the navigation on the affiliate dashboard. It comprises several elements (tabs) that are linked to other components.

The *Dashboard* tab is linked to the ~~ ThirdPartyOverview.tsx ~~ file which can be accessed via the path "/affiliates".

The *Behavioural Analytics* tab is linked to the ~~ BehaviouralAnalytics.tsx ~~ file which can be accessed via the path "/affiliates/analytics".

The *Logout* tab makes a call to `**openLogoutModal()**` which opens up a logout confirmation modal.
