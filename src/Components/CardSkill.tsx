import { Link } from "react-router-dom"
import { useGetSkillsDataQuery } from "../Store/Skills";
import { motion } from "framer-motion";

const CardSkill = ({ data }: { data: string | undefined }) => {

  const { data: SkillData, isError, isLoading } = useGetSkillsDataQuery(data);

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
              <Link to={`/skill/${SkillData?.id}`} className="title">{SkillData?.attributes?.name}</Link>
              {/* {JobData?.description && <p className="description">{JobData?.description}</p>} */}
              <div className="info_content">
                <p className="info"><span className="key">Type:</span><span className="value">{SkillData?.attributes?.type}</span></p>
                <p className="info"><span className="key">Importance:</span><span className="value">{SkillData?.attributes?.importance}</span></p>
                <p className="info"><span className="key">Level:</span><span className="value">{SkillData?.attributes?.level}</span></p>
              </div>
            </>
        }
      </div>
    </motion.figure>
  )
}

export default CardSkill