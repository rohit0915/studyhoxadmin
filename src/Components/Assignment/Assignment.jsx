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

function Assignment(props) {
  const [Expandbox, setExpandbox] = useState(false);

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
              <h3 className="mb-2">Add Assignment</h3>
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

              <div className="text_filed_heading">Add Add Assignment</div>
              <div className=" mt-1">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Enter Assignment"
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
                    <TableCell>Assignment</TableCell>
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
                        <button type="button" class="btn btn-info mr-4">
                          <i class="fa fa-user-plus pr-1"></i>Add
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
            onClose={() => setEditDailogOpen(!EditDailogOpen)}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth="fullWidth"
          >
            <DialogTitle>
              Update Car brands
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label"></label>
                <div class=" col-md-12">
                  <label for="inputPassword4">Update Car brands</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Car Brands"
                  />
                </div>
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
export default HOC(Assignment);
