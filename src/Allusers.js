import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, Route, Router, redirect } from "react-router-dom";

function Allmyuser() {
  const [loading, setLoading] = useState(false);
  const [mydatas, setdatas] = useState([]);

  useEffect(() => {
    getuser();
  }, []);

  function getuser() {
    var config = {
      headers: {
        token: "cbd392c01352b0cbd392c01352b0",
      },
    };
    axios
      .get("https://dizbizcard.com/api/alluser.php", config, setLoading(true))
      .then((response) => {
        setdatas(response.data.data);
        setLoading(false);
      });
  }

  function deleteuser(ids) {
    axios
      .delete("https://dizbizcard.com/api/apidelete.php", {
        headers: {
          token: "cbd392c01352b0cbd392c01352b0",
        },
        params: {
          id: ids,
        },
      })
      .then((response) => {
        var notyf = new Notyf();
        notyf.error(response.data.message);
        getuser();
      });
  }

  return (
    <>
      {loading ? (
        <div className="load">
          <div className="loader"></div>
          <div className="loader-inner">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
            <div className="text-loader">Loading...</div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="container mt-5">
        <Link className="btn btn-success mb-4" to="adduser">
          Add User
        </Link>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {mydatas.map((items, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{items.name}</td>
                  <td>{items.email}</td>
                  <td>{items.password}</td>
                  <td>
                    <Link
                      className="btn btn-success "
                      to={`Useredit/${items.id}`}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => deleteuser(items.id)}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Allmyuser;
