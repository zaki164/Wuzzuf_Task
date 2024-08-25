import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion";

const Header = () => {
  const location = useLocation()
  return (
    <header className="header">
      <div className="container">
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
        >JobsNow</motion.p>
        <motion.ul
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}>
          <Link to='/jobs'
            className={!location.pathname.includes('/search') ? 'active' : ''}
          >Home</Link>
          <Link to='/jobs/search'
            className={location.pathname.includes('/search') ? 'active' : ''}
          > Search</Link>
        </motion.ul>
      </div>
    </header >
  )
}

export default Header