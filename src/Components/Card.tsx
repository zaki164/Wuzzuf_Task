import { Link } from "react-router-dom"
import { Job } from "../Types"
import SkillItem from "./SkillItem"

const Card = ({ data }: { data: Job }) => {
  return (
    <figure className="card">
      <div className="card_container">
        <p className="title">{data?.attributes?.title}</p>
        <div>
          <p>Related Skills:</p>
          <div className="skills">
            {
              data?.relationships?.skills?.map(ele =>
                <SkillItem skill={ele?.id} key={ele?.id} />
              )
            }
          </div>
        </div>
        <Link to={`/job/${data?.id}`} className="link">View Job details</Link>
      </div>
    </figure>
  )
}

export default Card