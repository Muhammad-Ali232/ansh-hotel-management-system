import React from 'react'
import UserIndex from './UserPages/Index'
import Contact from './UserPages/Contact'
import { Route, Routes } from "react-router-dom";
import AdminIndex from './AdminPages/AdminIndex';
import Room from './UserPages/Room';
import About from './UserPages/About';
import Roles from './AdminPages/Roles';
import AddRole from './AdminPages/AddRole';
import EditRole from './AdminPages/EditRole';
import Signin from './AuthPages/Signin';
import Signup from './AuthPages/Signup';
import PrivateRoute from './PrivateRoute';
import AddServicesCo from './AdminPages/AddServicesCo';
import ServicesCo from './AdminPages/ServicesCo';
import AdminProfile from './AdminPages/AdminProfile';
import RoomListing from './AdminPages/RoomListing';
import AddRoom from './AdminPages/AddRoom';
import EditRoomListing from './AdminPages/EditRoomListing';
import EditAdminProfile from './AdminPages/EditAdminProfile';
import RoomDetail from './UserPages/RoomDetail';
import AddRoomType from './AdminPages/AddRoomType';
import RoomType from './AdminPages/RoomTypes';
import EditRoomType from './AdminPages/EditRoomType';
import UserProfile from './UserPages/UserProfile';
import EditUserProfile from './UserPages/EditUserProfile';
import Reservation from './UserPages/ReservationPage';
import ContactList from './AdminPages/ContactList';
import Services from './AdminPages/Services';
import AddService from './AdminPages/AddService';
import EditService from './AdminPages/EditService';
import Feedbacks from './AdminPages/FeedBacks';
import AdminReservationsOverview from './AdminPages/ReservationOverview';
import StaffIndex from './StaffPages/Index';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<UserIndex />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/servicesCo" element={<ServicesCo />} />
        <Route path="/addservicesCo" element={<AddServicesCo />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/editadminprofile/:id" element={<EditAdminProfile />} />
        <Route path="/roomlisting" element={<RoomListing />} />
        <Route path="/addroom" element={<AddRoom />} />
        <Route path="/editroomlisting/:id" element={<EditRoomListing />} />
        <Route path="/addroomtype" element={<AddRoomType />} />
        <Route path="/editroomtype/:id" element={<EditRoomType />} />
        <Route path="/roomtype" element={<RoomType />} />
        <Route path="/services" element={<Services />} />
        <Route path="/addservices" element={<AddService />} />
        <Route path="/editservice/:id" element={<EditService />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/reservationoverview" element={<AdminReservationsOverview />} />
        <Route
          path="/adminhome"
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <AdminIndex />
            </PrivateRoute>
          }
        />
        <Route
          path="/staffindex"
          element={
            <PrivateRoute allowedRoles={["Staff", "Manager"]}>
              <StaffIndex />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservationpage"
          element={
            <PrivateRoute>
              <Reservation />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservationpage/:id"
          element={
            <PrivateRoute>
              <Reservation />
            </PrivateRoute>
          }
        />
        <Route path="/roles" element={<Roles />} />
        <Route path="/addrole" element={<AddRole />} />
        <Route path="/editrole/:id" element={<EditRole />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/room" element={<Room />} />
        <Route path="/room/:type" element={<Room />} />
        <Route path="/roomdetail/:id" element={<RoomDetail />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/edituserprofile/:id" element={<EditUserProfile />} />
      </Routes>
    </>
  );
}

export default App;

