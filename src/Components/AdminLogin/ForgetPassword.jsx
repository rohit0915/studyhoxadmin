import React, { useState } from "react";
import { Card } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Loder from "../Loder/Loder";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../utils/Validation";

const ForgetPassword = () => {
  const [email, setemail] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  let navigate = useNavigate();
  const submithandler = (e) => {
    e.preventDefault();

    try {
      let url = getBaseUrl() + "api/admin/forgetpassword";
      setisloading(true);

      let temp = {
        email: email,
      };
      axios
        .post(url, temp)
        .then(
          (res) => {
            console.log("data seriese:::", res);
            setisloading(false);
            navigate("/verify", { state: email });
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

  return (
    <>
      <div className="container">
        <div className="login_content">
          <Card className="p-3">
            <form onSubmit={submithandler}>
              <h3>Admin</h3>
              <div class="form-group mb-3">
                <label for="exampleInputEmail1" className="mb-3">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
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
    </>
  );
};

export default ForgetPassword;
