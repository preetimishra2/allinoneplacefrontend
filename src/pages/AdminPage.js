// pages/AdminPage.js
import React from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';
import Header from '../components/Shared/Header';
import Footer from '../components/Shared/Footer';

const AdminPage = () => {
    return (
        <React.Fragment>
            <Header/>
            <AdminDashboard />
            <Footer/>
        </React.Fragment>
    );
};

export default AdminPage;
