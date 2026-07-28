import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminFooter from "../Shared/AdminFooter";
import AdminSidebar from "../Shared/AdminSidebar";
import AdminHeader from "../Shared/AdminHeader";

function ViewContactList() {

  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/contacts");
      setContacts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

 const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/contact/${id}`);

      alert("Contact Deleted Successfully ✅"); // 🔥 ADD THIS

      fetchContacts();
    } catch (error) {
      console.log(error);
      alert("Error deleting contact ❌"); // optional
    }
  };

  return (
    <div>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Modernize Free</title>
      <link rel="shortcut icon" type="image/png" href="../assets/images/logos/favicon1.png" />
      <link rel="stylesheet" href="../assets/css/styles.min.css" />

      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">

        <AdminSidebar />

        <div className="body-wrapper">
          <AdminHeader />

          <div className="container-fluid">
            <hr/>

            {/* Top Header */}
  <div className="d-flex justify-content-between align-items-center mb-4">
    {/* Empty Left Space */}
    <div />
    {/* Center Heading */}
    <div>
      <h3 className="fw-bold text-center">Contact List</h3>
    </div>
    <div></div>
  </div>

            {/* TABLE */}
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.message}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteContact(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewContactList;