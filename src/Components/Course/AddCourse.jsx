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

function AddCourse(props) {
  const [teacherDataArry, setteacherDataArry] = useState([]);
  const [Expandbox, setExpandbox] = useState(false);
  const [isupdated, setisupdated] = useState(false);

  let navigate = useNavigate();
  const arry = [
    {
      name: "1",
      email: "user@gmail.com",

      stream: "science",
    },
    {
      name: "2",
      email: "user2@gmail.com",

      stream: "history",
    },
    {
      name: "3",
      email: "user3@gmail.com",

      stream: "chemestry",
    },
  ];
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

  const [EditDailogOpen, setEditDailogOpen] = useState("");

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
  const filterData = arry.filter((event) => {
    return event.name.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Course</h3>
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
                  <div className="text_filed_heading">Add TeacherId</div>
                  <div className=" mt-1 mr-2">
                    <div class="form-group mr-2">
                      <select class="form-control">
                        <option>Select ....</option>
                        {teacherDataArry.map((row, index) => (
                          <option value={row._id}>
                            {row.fname} {row.lname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Name</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Name"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Price</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Price"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Rating</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Rating"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Select Images</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="file"
                      className="form-control "
                      placeholder="Enter Years"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Years</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Years"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>
              <div className="text_filed_heading mt-2">Add Description</div>
              <div className=" mt-1">
                <textarea
                  row="3"
                  type="text"
                  className="form-control "
                  placeholder="Add Description"
                  autoComplete="off"
                />
              </div>

              <div className="mt-2 pb-3 ">
                <Button variant="contained" className="button_formatting">
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
                    <TableCell>S.No</TableCell>
                    <TableCell>Course</TableCell>
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
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>

                      <TableCell>{row.stream}</TableCell>
                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          onClick={() => setEditDailogOpen(!EditDailogOpen)}
                        >
                          <i class="fa fa-edit"></i>Edit
                        </button>
                        <button type="button" class="btn btn-info">
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
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth="fullWidth"
          >
            <DialogTitle>
              Update Course
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <div className="text-right">
                {/* <span className="icon_color hover_cursor">
                  <i
                    className="fa fa-times cursor"
                    onClose={() => setEditDailogOpen(!EditDailogOpen)}
                  ></i>
                </span> */}
              </div>
              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add TeacherId</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter TeacherId"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Name</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Name"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Price</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Price"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Rating</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Rating"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Select Images</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="file"
                      className="form-control "
                      placeholder="Enter Years"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Years</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Years"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>
              <div className="text_filed_heading mt-2">Add Description</div>
              <div className=" mt-1">
                <textarea
                  row="3"
                  type="text"
                  className="form-control "
                  placeholder="Add Description"
                  autoComplete="off"
                />
              </div>

              <div className="mt-2 pb-3 ">
                <Button variant="contained" className="button_formatting">
                  Create
                </Button>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                className="button_formatting"
                onClick={() => setEditDailogOpen(!EditDailogOpen)}
              >
                Cancel
              </Button>
              <Button className="button_formatting">Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}
export default HOC(AddCourse);
