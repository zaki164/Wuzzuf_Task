import { Outlet } from "react-router-dom"
import SearchBox from "../Components/SearchBox"

const CustomLayout = () => {
  return (
    <>
      <SearchBox />
      <Outlet />
    </>
  )
}

export default CustomLayout