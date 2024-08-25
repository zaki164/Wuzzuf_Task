import { Link } from "react-router-dom"
import { useGetSingleJobQuery } from "../Store/Jobs";
import { motion } from "framer-motion";

const AsideJobs = ({ data }: { data: string | undefined }) => {

  const { data: JobData, isError, isLoading } = useGetSingleJobQuery(data);

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
            <Link to={`/job/${JobData?.id}`}>
              {JobData?.attributes?.title}
            </Link>
          </>
      }
    </motion.li>
  )
}

export default AsideJobs