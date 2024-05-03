// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PartnerForgot from "./DeskApp/LoginComp/PartnerForgot";
// import PartnerLogin from "./DeskApp/LoginComp/PartnerLogin";
// import Billing from "./DeskApp/ParterMainDesk/Billings/Billing";
// import Bookings from "./DeskApp/ParterMainDesk/Booking/Bookings";
// import Courts from "./DeskApp/ParterMainDesk/Courts/Courts";
// import PartnerDash from "./DeskApp/ParterMainDesk/Dashboard/PartnerDash";
// import Marketing from "./DeskApp/ParterMainDesk/Market/Marketing";
// import Sales from "./DeskApp/ParterMainDesk/Sales/Sales";
// import Schedules from "./DeskApp/ParterMainDesk/Schedule/Schedules";
// import Staff from "./DeskApp/ParterMainDesk/Staff/Staff";
// import Venue from "./DeskApp/ParterMainDesk/Venue/Venue";
// import Event from "./DeskApp/ParterMainDesk/Events/Events";
// import Customers from "./DeskApp/ParterMainDesk/Customers/Customers";
// import PartnerOtp from "./DeskApp/LoginComp/PartnerOtp";
// import PartnerReset from "./DeskApp/LoginComp/PartnerReset";
// import MyProfile from "./DeskApp/LoginComp/MyProfile";
// import Settings from "./DeskApp/LoginComp/Settings";
// import ChangeLanguage from "./DeskApp/LoginComp/ChangeLanguage";
// import AboutUs from "./DeskApp/ParterMainDesk/aboutpage/AboutUs";
// import Privacy from "./DeskApp/ParterMainDesk/aboutpage/Privacy";
// import Terms from "./DeskApp/ParterMainDesk/aboutpage/Terms";
// import Help from "./DeskApp/ParterMainDesk/aboutpage/Help";
// function App() {
//   return (
//     <>
//       <ToastContainer />
//       <BrowserRouter>
//         <Routes>
//           <Route path="*" element={<PartnerLogin />} />
//           <Route path="/app/partner/login" element={<PartnerLogin />} />
//           <Route path="/app/partner/forget" element={<PartnerForgot />} />
//           <Route path="/app/partner/otp" element={<PartnerOtp />} />
//           <Route path="/app/partner/reset" element={<PartnerReset />} />
//           <Route path="/app/partner/profile" element={<MyProfile />} />
//           <Route path="/app/partner/setting" element={<Settings />} />
//           <Route
//             path="/app/partner/changelanguage"
//             element={<ChangeLanguage />}
//           />
//           <Route path="/app/partner/aboutus" element={<AboutUs />} />
//           <Route path="/app/partner/privacy" element={<Privacy />} />
//           <Route path="/app/partner/terms" element={<Terms />} />
//           <Route path="/app/partner/help" element={<Help />} />
//           <Route path="/app/partner/Dashboard" element={<PartnerDash />} />
//           <Route path="/app/partner/Schedule" element={<Schedules />} />
//           <Route path="/app/partner/Booking" element={<Bookings />} />
//           <Route path="/app/partner/Customers" element={<Customers />} />
//           <Route path="/app/partner/Events" element={<Event />} />
//           <Route path="/app/partner/Courts" element={<Courts />} />
//           <Route path="/app/partner/Customers" element={<Schedules />} />
//           <Route path="/app/partner/Events" element={<Schedules />} />
//           <Route path="/app/partner/Marketing" element={<Marketing />} />
//           <Route path="/app/partner/Sales" element={<Sales />} />
//           <Route path="/app/partner/Billings" element={<Billing />} />
//           <Route path="/app/partner/Staff" element={<Staff />} />
//           <Route path="/app/partner/VenueProfile" element={<Venue />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PartnerForgot from "./DeskApp/LoginComp/PartnerForgot";
import PartnerLogin from "./DeskApp/LoginComp/PartnerLogin";
import Billing from "./DeskApp/ParterMainDesk/Billings/Billing";
import Bookings from "./DeskApp/ParterMainDesk/Booking/Bookings";
import Courts from "./DeskApp/ParterMainDesk/Courts/Courts";
import PartnerDash from "./DeskApp/ParterMainDesk/Dashboard/PartnerDash";
import Marketing from "./DeskApp/ParterMainDesk/Market/Marketing";
import Sales from "./DeskApp/ParterMainDesk/Sales/Sales";
import Schedules from "./DeskApp/ParterMainDesk/Schedule/Schedules";
import Staff from "./DeskApp/ParterMainDesk/Staff/Staff";
import Venue from "./DeskApp/ParterMainDesk/Venue/Venue";
import Event from "./DeskApp/ParterMainDesk/Events/Events";
import Customers from "./DeskApp/ParterMainDesk/Customers/Customers";
import PartnerOtp from "./DeskApp/LoginComp/PartnerOtp";
import PartnerReset from "./DeskApp/LoginComp/PartnerReset";
import MyProfile from "./DeskApp/LoginComp/MyProfile";
import Settings from "./DeskApp/LoginComp/Settings";
import ChangeLanguage from "./DeskApp/LoginComp/ChangeLanguage";
import AboutUs from "./DeskApp/ParterMainDesk/aboutpage/AboutUs";
import Privacy from "./DeskApp/ParterMainDesk/aboutpage/Privacy";
import Terms from "./DeskApp/ParterMainDesk/aboutpage/Terms";
import Help from "./DeskApp/ParterMainDesk/aboutpage/Help";
import { useEffect, useState } from "react";

function App() {
  const [progress, setProgress] = useState(0);
  const [loginType, setLoginType] = useState(
    localStorage?.getItem("login_type")
  );
  const [modules, setModules] = useState(localStorage?.getItem("modules"));

  useEffect(() => {
    setLoginType(localStorage?.getItem("login_type"));
    setModules(localStorage?.getItem("modules"));
  }, []);

  const isAccessAllowed = (accessItem) => {
    return modules?.includes(accessItem);
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path="*" element={<PartnerLogin />} />
          <Route path="/app/partner/login" element={<PartnerLogin />} />
          <Route path="/app/partner/forget" element={<PartnerForgot />} />
          <Route path="/app/partner/otp" element={<PartnerOtp />} />
          <Route path="/app/partner/reset" element={<PartnerReset />} />
          <Route path="/app/partner/profile" element={<MyProfile />} />
          <Route path="/app/partner/setting" element={<Settings />} />
          <Route
            path="/app/partner/changelanguage"
            element={<ChangeLanguage />}
          />
          <Route path="/app/partner/aboutus" element={<AboutUs />} />
          <Route path="/app/partner/privacy" element={<Privacy />} />
          <Route path="/app/partner/terms" element={<Terms />} />
          <Route path="/app/partner/help" element={<Help />} />
          {loginType === "Admin" ? (
            <>
              <Route
                path="/app/partner/Dashboard"
                element={<PartnerDash setProgress={setProgress} />}
              />
              <Route path="/app/partner/Schedule" element={<Schedules />} />
              <Route path="/app/partner/Booking" element={<Bookings />} />
              <Route path="/app/partner/Customers" element={<Customers />} />
              <Route path="/app/partner/Events" element={<Event />} />
              <Route
                path="/app/partner/Courts"
                element={<Courts setProgress={setProgress}/>}
                
              />
              <Route path="/app/partner/Marketing" element={<Marketing />} />
              <Route path="/app/partner/Sales" element={<Sales />} />
              <Route path="/app/partner/Billings" element={<Billing />} />
              <Route path="/app/partner/Staff" element={<Staff />} />
              <Route path="/app/partner/VenueProfile" element={<Venue />} />
            </>
          ) : (
            <>
              {isAccessAllowed("dashboard") && (
                <Route
                  path="/app/partner/Dashboard"
                  element={<PartnerDash />}
                />
              )}
              {isAccessAllowed("Schedule") && (
                <Route path="/app/partner/Schedule" element={<Schedules />} />
              )}
              {isAccessAllowed("Booking") && (
                <Route path="/app/partner/Booking" element={<Bookings />} />
              )}
              {isAccessAllowed("Customers") && (
                <Route path="/app/partner/Customers" element={<Customers />} />
              )}
              {isAccessAllowed("Events") && (
                <Route path="/app/partner/Events" element={<Event />} />
              )}
              {isAccessAllowed("Courts") && (
                <Route path="/app/partner/Courts" element={<Courts />} />
              )}
              {isAccessAllowed("Marketing") && (
                <Route path="/app/partner/Marketing" element={<Marketing />} />
              )}
              {isAccessAllowed("Sales") && (
                <Route path="/app/partner/Sales" element={<Sales />} />
              )}
              {isAccessAllowed("Billings") && (
                <Route path="/app/partner/Billings" element={<Billing />} />
              )}
              {isAccessAllowed("Staff") && (
                <Route path="/app/partner/Staff" element={<Staff />} />
              )}
              {isAccessAllowed("Venue Profile") && (
                <Route path="/app/partner/VenueProfile" element={<Venue />} />
              )}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
