import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HOC from "../../Common/HOC";
import { Card, Grid } from "@material-ui/core";
//pagination
import TablePagination from "@material-ui/core/TablePagination";
import { useNavigate } from "react-router-dom";
//dialog vox
import Button from "@material-ui/core/Button";
//Expand
import Expand from "react-expand-animated";
import Loder from "../Loder/Loder";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../utils/Validation";

//DIALOG BOX

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Addteachers(props) {
  const [Expandbox, setExpandbox] = useState(false);
  const [EditDailogOpen, setEditDailogOpen] = useState("");
  const [isloading, setisloading] = useState(false);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [isupdated, setisupdated] = useState(false);
  const [teacherDataArry, setteacherDataArry] = useState([]);

  //error
  const [fnameError, setfnameError] = useState(false);
  const [lnameError, setlnameError] = useState(false);
  const [phoneError, setphoneError] = useState(false);
  const [emailError, setemailError] = useState(false);
  //edit error
  const [EditfnameError, setEditfnameError] = useState("");
  const [EditlnameError, setEditlnameError] = useState("");
  const [EditphoneError, setEditphoneError] = useState("");
  const [EditemailError, setEditemailError] = useState("");

  //edit
  const [Editfname, setEditfname] = useState("");
  const [Editlname, setEditlname] = useState("");
  const [Editphone, setEditphone] = useState("");
  const [Editemail, setEditemail] = useState("");
  const [Editid, setEditid] = useState("");

  const Editteacher = (row) => {
    setEditDailogOpen(!EditDailogOpen);
    setEditfname(row.fname);
    setEditlname(row.lname);
    setEditphone(row.phone);
    setEditemail(row.email);
    setEditid(row._id);
  };

  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      let url = getBaseUrl() + "api/teachers/all";
      axios.get(url).then(
        (res) => {
          setteacherDataArry(res.data.data);

          console.log("teachergetdata ", res);
        },
        (error) => {}
      );
    } catch (error) {}
  }, [isupdated]);

  const deleteteacher = (row) => {
    let id = row._id;

    let url = getBaseUrl() + `api/teachers/delete/${id}`;
    axios
      .delete(url)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisupdated(!isupdated);
          showNotificationMsz(res.data.msg, "success");
        },

        (error) => {
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
      });
  };

  ///edit teacher

  const editteacherdetail = (ID) => {
    if (!blankValidator(Editfname)) {
      setEditfnameError(true);
      return;
    }
    if (!blankValidator(Editlname)) {
      setEditlnameError(true);
      return;
    }
    if (!blankValidator(Editphone)) {
      setEditphoneError(true);
      return;
    }
    if (!blankValidator(Editemail)) {
      setEditemailError(true);
      return;
    }

    try {
      let id = ID;
      let url = getBaseUrl() + `api/teachers/update/${id}`;

      let temp = {
        fname: Editfname,
        lname: Editlname,
        email: Editemail,
        phone: Editphone,
      };
      axios
        .patch(url, temp)
        .then(
          (res) => {
            console.log("data edit::", res);
            setisupdated(!isupdated);
            setEditDailogOpen(!EditDailogOpen);
            showNotificationMsz(res.data.msg, "success");
          },

          (error) => {
            console.log("data response error:::", error);
            showNotificationMsz(error, "danger");
          }
        )
        .catch((e) => {
          console.log("data response error:::", e);
          showNotificationMsz(e, "danger");
        });
    } catch (error) {}
  };

  ///add teacher

  const addteacher = () => {
    try {
      if (!blankValidator(fname)) {
        setfnameError(true);
        return;
      }
      if (!blankValidator(lname)) {
        setlnameError(true);
        return;
      }
      if (!blankValidator(phone)) {
        setphoneError(true);
        return;
      }
      if (!blankValidator(email)) {
        setemailError(true);
        return;
      }
      let url = getBaseUrl() + "api/teachers/add";
      setisloading(true);

      let temp = {
        fname,
        lname,
        phone,
        email,
      };
      axios
        .post(url, temp)
        .then(
          (res) => {
            console.log("data seriese:::", res);
            setisloading(false);
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

  // for pagination hadler
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [titlename, settitlename] = useState("");
  const filterData = teacherDataArry.filter((event) => {
    return event.fname.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Teachers</h3>
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => setExpandbox(!Expandbox)}
              >
                <i class="fa fa-plus"></i> Create
              </button>

              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => navigate(-1)}
              >
                <i class="fa fa-arrow-left pr-1"></i>Go Back
              </button>
            </Grid>
            <Grid item md={3}>
              <div className="d-flex">
                <span className="p-2">
                  <i class="fa fa-search"></i>
                </span>
                <span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search by Name"
                    value={titlename}
                    onChange={(e) => {
                      settitlename(e.target.value);
                    }}
                  />
                </span>
              </div>
            </Grid>
          </Grid>
          <Expand open={Expandbox}>
            <Card className=" mb-2 Card_shadow p-3 mt-3">
              <div className="text-right">
                <span className="icon_color hover_cursor">
                  <i
                    className="fa fa-times cursor"
                    onClick={() => setExpandbox(!Expandbox)}
                  ></i>
                </span>
              </div>
              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">First Name</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter First Name"
                      autoComplete="off"
                      value={fname}
                      onChange={(e) => {
                        setfnameError(false);
                        setfname(e.target.value);
                      }}
                    />{" "}
                    {fnameError && (
                      <span className="text-danger">Enter Last Name</span>
                    )}
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Last Name</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Last Name"
                      autoComplete="off"
                      value={lname}
                      onChange={(e) => {
                        setlnameError(false);
                        setlname(e.target.value);
                      }}
                    />
                    {lnameError && (
                      <span className="text-danger">Enter Last Name</span>
                    )}
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Phone No.</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Enter Phone number"
                      autoComplete="off"
                      value={phone}
                      onChange={(e) => {
                        setphoneError(false);
                        setphone(e.target.value);
                      }}
                    />
                    {phoneError && (
                      <span className="text-danger">Enter Phone</span>
                    )}
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Email</div>
                  <div className=" mt-1">
                    <input
                      type="email"
                      className="form-control "
                      placeholder="Enter Email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => {
                        setemailError(false);
                        setemail(e.target.value);
                      }}
                    />
                    {emailError && (
                      <span className="text-danger">Enter Phone</span>
                    )}
                  </div>
                </Grid>
              </Grid>

              <div className="mt-2 pb-3 ">
                <Button
                  variant="contained"
                  className="button_formatting"
                  onClick={addteacher}
                >
                  Create
                </Button>
              </div>
            </Card>
          </Expand>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Operations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filterData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filterData
                  ).map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.fname}</TableCell>
                      <TableCell>{row.lname}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.stream}</TableCell>
                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          // onClick={() => setEditDailogOpen(!EditDailogOpen)}
                          onClick={() => Editteacher(row)}
                        >
                          <i class="fa fa-edit"></i>Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={() => deleteteacher(row)}
                        >
                          <i class="fa fa-trash pr-1"></i>Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>

          <br />
          <Dialog
            open={EditDailogOpen}
            onClose={() => setEditDailogOpen(!EditDailogOpen)}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth="fullWidth"
          >
            <DialogTitle>
              Update Teacher Detail
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">First Name</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter First Name"
                      autoComplete="off"
                      value={Editfname}
                      onChange={(e) => {
                        setEditfnameError(false);
                        setEditfname(e.target.value);
                      }}
                    />
                    {EditfnameError && (
                      <span className="text-danger">Enter First Name</span>
                    )}
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Last Name</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Last Name"
                      autoComplete="off"
                      value={Editlname}
                      onChange={(e) => {
                        setEditlnameError(false);
                        setEditlname(e.target.value);
                      }}
                    />
                    {EditlnameError && (
                      <span className="text-danger">Enter Last Name</span>
                    )}
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Phone No.</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Enter Phone number"
                      autoComplete="off"
                      value={Editphone}
                      onChange={(e) => {
                        setEditphoneError(false);
                        setEditphone(e.target.value);
                      }}
                    />
                    {EditphoneError && (
                      <span className="text-danger">Enter Phone number</span>
                    )}
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Email</div>
                  <div className=" mt-1">
                    <input
                      type="email"
                      className="form-control "
                      placeholder="Enter Email"
                      autoComplete="off"
                      value={Editemail}
                      onChange={(e) => {
                        setEditemailError(false);
                        setEditemail(e.target.value);
                      }}
                    />
                    {EditemailError && (
                      <span className="text-danger">Enter Enter Email</span>
                    )}
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                className="button_formatting"
                onClick={() => setEditDailogOpen(!EditDailogOpen)}
              >
                Cancel
              </Button>
              <Button
                className="button_formatting"
                onClick={() => editteacherdetail(Editid)}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <Loder loading={isloading} />
    </>
  );
}
export default HOC(Addteachers);
