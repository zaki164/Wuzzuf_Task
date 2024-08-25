import { Link } from "react-router-dom"
import { useGetSkillsDataQuery } from "../Store/Skills";
import { motion } from "framer-motion";

const AsideSkills = ({ data }: { data: string | undefined }) => {

  const { data: JobData, isError, isLoading } = useGetSkillsDataQuery(data);

  return (
    !isError &&
    <motion.li
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
      key={data}
    >
      {
        isLoading
          ?
          "loading..."
          :
          <>
            <div className="list_style"></div>
            <Link to={`/skill/${JobData?.id}`}>
              {JobData?.attributes?.name}
            </Link>
          </>
      }
    </motion.li>
  )
}

export default AsideSkills