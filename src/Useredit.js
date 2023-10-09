import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  Route,
  Router,
  redirect,
  useParams,
} from "react-router-dom";

function Adduser() {
  const [data, setdata] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    singlegetuser();
  }, []);

  let names, values;
  const handleinput = (event) => {
    names = event.target.name;
    values = event.target.value;
    setdata({ ...data, [names]: values });
  };

  function singlegetuser() {
    var config = {
      headers: {
        token: "cbd392c01352b0cbd392c01352b0",
        
      },
      params: {
        id: id,
      },
    };
    axios
      .get("https://dizbizcard.com/api/singleuser.php", config)
      .then((response) => {
        setdata(response.data.data);
      });
  }

  const submitdata = (e) => {
    e.preventDefault();
    var config = {
      headers: {
        token: "cbd392c01352b0cbd392c01352b0",
      },
    };
    axios
      .post(
        "https://dizbizcard.com/api/updateuser.php",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          id: data.id,
        },
        config
      )
      .then((response) => {        
        navigate("/");
        var notyf = new Notyf();
        notyf.success("Data Updated");
      });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="col-md-6 offset-md-3 shadow p-5 rounded">
          <Link className="btn btn-danger mb-4" to="/">
            <i className="bi bi-arrow-left"></i> Back
          </Link>
          <h4 className="text-center my-3">Update User</h4>
          <form autoComplete="off" method="post" onSubmit={submitdata}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={data.name}
                onChange={handleinput}
                name="name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                value={data.email}
                onChange={handleinput}
                name="email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="text"
                value={data.password}
                onChange={handleinput}
                name="password"
                className="form-control"
              />
              <input
                type="hidden"
                value={data.id}
                onChange={handleinput}
                name="id"
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
