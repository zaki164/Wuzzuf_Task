import { useParams } from "react-router-dom";
import MainContent from "../Components/MainContent";
import { useGetSkillsDataQuery } from "../Store/Skills";
import Error from "../Components/Error";
import Loader from "../Components/Loader";
import CardJob from "../Components/CardJob";
import AsideSkills from "../Components/AsideSkills";

const Skill = () => {
  const { uuid } = useParams();
  const { data, isError, isLoading } = useGetSkillsDataQuery(uuid);

  return (
    isError ?
      <div className="container_loader">
        <Error />
      </div>
      :
      isLoading ?
        <div className="container_loader">
          <Loader />
        </div>
        :
        <MainContent
          title={data?.attributes?.name || ''}
        >
          <div className="related_container">
            <div className="skills_content">
              <div className="desc">
                <p className="desc_title">Description:</p>
                <p className="desc_desc">knowledge of principles and methods for moving people or goods by air, rail, sea, or road, including the relative costs and benefits.</p>
              </div>
              <div className="skills_container">
                <p className="title">Related Jobs:</p>
                <div className="skills">
                  {data?.relationships?.jobs.map(ele =>
                    <CardJob key={ele.id} data={ele?.id} attr={data?.attributes} />
                  )}
                </div>
              </div>
            </div>
            <aside className="aside">
              <div className="aside_container">
                {
                  !data?.relationships?.skills || data?.relationships?.skills?.length === 0 ?
                    <p className="empty_data">No related skills</p>
                    :
                    <>
                      <p className="title">Related Skills:</p>
                      <ul>
                        {
                          data?.relationships?.skills?.map(ele =>
                            <AsideSkills data={ele?.id} key={ele?.id} />
                          )
                        }
                      </ul>
                    </>
                }
              </div>
            </aside>
          </div>
        </MainContent>
  )
}

export default Skill