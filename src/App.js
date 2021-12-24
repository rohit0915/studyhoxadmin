import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import ForgetPassword from "./Components/AdminLogin/ForgetPassword";
import Verify from "./Components/AdminLogin/Verify";
import Home from "./Components/Home/Home";
import StudentList from "./Components/ManageStudent/StudentList";
import AddCourse from "./Components/Course/AddCourse";
import Assignment from "./Components/Assignment/Assignment";
import Payment from "./Components/Payment/Payment";
import AddVedio from "./Components/AddVedio/AddVedio";
import Teachers from "./Components/Teachears/Teachers";
import Quiz from "./Components/Quiz/Quiz";
import PastyearPaper from "./Components/PastyearPaper/PastyearPaper";
import NcertSolution from "./Components/NcertSolution/NcertSolution";
//for notification
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
function App() {
  return (
    <>
      <ReactNotification />
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route exact path="/" element={<AdminLogin />} />
        <Route exact path="/forgot" element={<ForgetPassword />} />
        <Route exact path="/verify" element={<Verify />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/student" element={<StudentList />} />
        <Route exact path="/addCourse" element={<AddCourse />} />
        <Route exact path="/assignment" element={<Assignment />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/vedio" element={<AddVedio />} />
        <Route exact path="/teachers" element={<Teachers />} />
        <Route exact path="/quiz" element={<Quiz />} />
        <Route exact path="/pastyearPaper" element={<PastyearPaper />} />
        <Route exact path="/ncert" element={<NcertSolution />} />
      </Routes>
      ,
    </>
  );
}

export default App;
