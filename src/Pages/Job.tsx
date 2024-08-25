import { useParams } from "react-router-dom";
import MainContent from "../Components/MainContent";
import { useGetSingleJobQuery } from "../Store/Jobs";
import Error from "../Components/Error";
import Loader from "../Components/Loader";
import CardSkill from "../Components/CardSkill";
import AsideJobs from "../Components/AsideJobs";

const Job = () => {
  const { uuid } = useParams();
  const { data, isError, isLoading } = useGetSingleJobQuery(uuid);

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
          title={data?.attributes?.title || ''}
        >
          <div className="related_container">
            <div className="skills_content">
              <div className="skills_container">
                <p className="title">Related Skills:</p>
                <div className="skills">
                  {data?.relationships?.skills.map(ele =>
                    <CardSkill key={ele?.id} data={ele?.id} />
                  )}
                </div>
              </div>
            </div>
            <aside className="aside">
              <div className="aside_container">
                {
                  !data?.relationships?.jobs || data?.relationships?.jobs?.length === 0 ?
                    <p className="empty_data">No related jobs</p>
                    :
                    <>
                      <p className="title">Related Jobs:</p>
                      <ul>
                        {
                          data?.relationships?.jobs?.map(ele =>
                            <AsideJobs data={ele?.id} key={ele?.id} />
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

export default Job