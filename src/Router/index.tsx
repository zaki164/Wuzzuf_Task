import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import Search from "../Pages/Search"
import Job from "../Pages/Job"
import Skill from "../Pages/Skill"
import Layout from "../Layout"
import CustomLayout from "../Layout/CustomLayout"
import PageNotFound from "../Pages/PageNotFound"

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<CustomLayout />}>
          <Route path="/" element={<Navigate to="/jobs" />} />
          <Route path="/jobs" element={<Home />} />
          <Route path="/jobs/search" element={<Search />} />
        </Route>
        <Route path="/job/:uuid" element={<Job />} />
        <Route path="/skill/:uuid" element={<Skill />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default Router