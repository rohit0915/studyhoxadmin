import React, { useState } from "react";
import { Card } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../utils/Validation";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  const [otp, setotp] = useState("");
  const [newpassword, setnewpassword] = useState("");

  let location = useLocation();
  let email = location.state;
  let navigate = useNavigate();
  const submithandler = (e) => {
    e.preventDefault();

    try {
      let url = getBaseUrl() + "api/admin/resetpassword";
      setisloading(true);

      let temp = {
        email: email,
        otp: otp,
        password: newpassword,
      };
      axios
        .post(url, temp)
        .then(
          (res) => {
            console.log("data seriese:::", res);
            setisloading(false);
            navigate("/home", { state: email });
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

  return (
    <>
      <div>
        <div className="container">
          <div className="login_content">
            <Card className="p-3">
              <form onSubmit={submithandler}>
                <div class="form-group mb-3">
                  <label for="exampleInputEmail1" className="mb-3">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="exampleInputPassword1" className="mb-3">
                    OTP
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => {
                      setotp(e.target.value);
                    }}
                  />
                </div>

                <div class="form-group mb-3">
                  <label for="exampleInputPassword1" className="mb-3">
                    Enter New Password
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Enter  New Password"
                    value={newpassword}
                    onChange={(e) => {
                      setnewpassword(e.target.value);
                    }}
                  />
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

export default Verify;
