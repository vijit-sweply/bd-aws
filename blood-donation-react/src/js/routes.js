import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  AboutUs,
  Dashboard,
  Login,
  Navbar,
  ContactUs,
  NotFound,
  SideNav,
  Logout,
  AdminDashboard,
  RequestBlood,
  CreateDonor,
  UpdateRequest,
  AdminCreateDonor,
  AllDonors,
  AllRequests,
  UpdateDonor,
} from './pages';

const routes = (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="logout" element={<Logout />} />
    <Route path="admin" element={<SideNav />}>
      <Route index path="dashboard" element={<AdminDashboard />} />
      <Route path="request/:id" element={<UpdateRequest />} />
      <Route path="donor/:id" element={<UpdateDonor />} />
      <Route path="create-request" element={<RequestBlood />} />
      <Route path="create-donor" element={<AdminCreateDonor />} />
      <Route path="donors" element={<AllDonors />} />
      <Route path="requests" element={<AllRequests />} />
    </Route>

    <Route path="/" element={<Navbar />}>
      <Route index element={<Dashboard />} />
      <Route path="request-blood" element={<RequestBlood />} />
      <Route path="donor-registration" element={<CreateDonor />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="contact-us" element={<ContactUs />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);
export default routes;
