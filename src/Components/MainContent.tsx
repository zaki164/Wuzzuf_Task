import { motion } from "framer-motion";
import { ReactNode } from "react";

const MainContent = ({ title, children }: { title: string, children: ReactNode }) => {
  return (
    <main className="content">
      <div className="content_container">
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
          className="title_content"
        >{title}</motion.p>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
        >
          {children}
        </motion.div>
      </div>
    </main>
  )
}

export default MainContent