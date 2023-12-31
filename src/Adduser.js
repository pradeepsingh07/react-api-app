import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, Route, Router, redirect } from "react-router-dom";

function Adduser() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  let names, values;
  const handleinput = (event) => {
    names = event.target.name;
    values = event.target.value;
    setinputs({ ...inputs, [names]: values });
  };

  const submitdata = (e) => {
    setLoading(true);
    e.preventDefault();
    var config = {
      headers: {
        token: "cbd392c01352b0cbd392c01352b0",                             
      },
    };

    if (inputs.name == "" || inputs.email == "" || inputs.password == "") {
      var notyf = new Notyf();
      notyf.error("All Required Filed");
      setLoading(false);
    } else {
      axios.post("https://dizbizcard.com/api/insertdata.php",{
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        },
        config
      ).then(() =>{
        navigate("/");
        setLoading(false);
        var notyf = new Notyf();
        notyf.success("Data Inserted");
      })
    
    }
  };

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
        <div className="col-md-6 offset-md-3 shadow p-5 rounded">
          <Link className="btn btn-danger mb-4" to="/">
            <i className="bi bi-arrow-left"></i> Back
          </Link>
          <h4 className="text-center my-3">Create User</h4>
          <form autoComplete="off" method="post" onSubmit={submitdata}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={inputs.name}
                onChange={handleinput}
                name="name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                value={inputs.email}
                onChange={handleinput}
                name="email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={inputs.password}
                onChange={handleinput}
                name="password"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Adduser;
