import { IoIosSearch } from "react-icons/io"
import { motion } from "framer-motion";
import Autocomplete from "./Autocomplete";

const SearchBox = () => {

  return (
    <section className="search">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
          className="search_box">
          <Autocomplete />
          <IoIosSearch className="search_icon" />
        </motion.div>
      </div>
    </section>
  )
}

export default SearchBox