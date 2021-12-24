import React, { useState } from "react";
import "../AdminLogin/Login.css";
import { Card } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Loder from "../Loder/Loder";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../utils/Validation";

const AdminLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  let navigate = useNavigate();

  const submithandler = (e) => {
    e.preventDefault();

    try {
      let url = getBaseUrl() + "api/admin/login";
      setisloading(true);

      let temp = {
        email,
        password,
      };
      axios
        .post(url, temp)
        .then(
          (res) => {
            console.log("data seriese:::", res);
            setisloading(false);
            navigate("/home");
            setisupdated(!isupdated);
            showNotificationMsz(res.data.msg, "success");
          },

          (error) => {
            setisloading(false);
            console.log("data response error:::", error);
            showNotificationMsz(error, "danger");
          }
        )
        .catch((e) => {
          setisloading(false);
          console.log("data response error:::", e);
          showNotificationMsz(e, "danger");
        });
    } catch (error) {}
  };

  ///add teacher

  const adminlogin = () => {};

  return (
    <>
      <div>
        <div className="container">
          <div className="login_content">
            <Card className="p-3">
              <form onSubmit={submithandler}>
                <h3>Admin Login</h3>
                <div class="form-group mb-3">
                  <label for="exampleInputEmail1" className="mb-3">
                    Email address
                  </label>
                  <input
                    required
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="exampleInputPassword1" className="mb-3">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    for="exampleInputEmail1"
                    className="text-info  mb-3 "
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/forgot")}
                  >
                    Forgot Password
                  </label>
                </div>
                <button
                  type="submit"
                  style={{ cursor: "pointer" }}
                  class="btn btn-info"
                  style={{ color: "white" }}
                >
                  Submit
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
