import { Link } from "react-router-dom"
import { useGetSingleJobQuery } from "../Store/Jobs";
import { motion } from "framer-motion";

const CardJob = ({ data, attr }: { data: string | undefined, attr: any }) => {

  const { data: JobData, isError, isLoading } = useGetSingleJobQuery(data);

  return (
    !isError &&
    <motion.figure
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
      className="custom_card"
    >
      <div className="card_container">
        {
          isLoading
            ?
            "loading..."
            :
            <>
              <Link to={`/job/${JobData?.id}`} className="title">{JobData?.attributes?.title}</Link>
              <div className="info_content">
                <p className="info"><span className="key">Importance:</span><span className="value">{attr?.importance}</span></p>
                <p className="info"><span className="key">Level:</span><span className="value">{attr?.level}</span></p>
              </div>
            </>
        }
      </div>
    </motion.figure>
  )
}

export default CardJob