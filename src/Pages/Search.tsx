import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Card";
import Error from "../Components/Error";
import Loader from "../Components/Loader";
import MainContent from "../Components/MainContent";
import { useGetJobsSearchQuery } from "../Store/Jobs";
import { RootState } from "../Store";
import AsideJobs from "../Components/AsideJobs";
import { useEffect } from "react";
import { setSearchJobs } from "../Store/AppStatus";

const Search = () => {

  const SearchJobs = useSelector((state: RootState) => state.AppStatus.SearchJobs)
  const HistoryJobs = useSelector((state: RootState) => state.AppStatus.HistoryJobs)
  const SearchValue = useSelector((state: RootState) => state.AppStatus.SearchValue)
  const dispatch = useDispatch()

  const { data, isError, isLoading, isSuccess } = useGetJobsSearchQuery(SearchValue || '');

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setSearchJobs({ SearchJobs: data?.jobs }))
    }
  }, [isSuccess, data])

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
        data?.jobs?.length === 0 ? <p className="empty_data">Empty data</p> :
          <MainContent
            title={`${SearchJobs?.length} jobs`}
          >
            <div className="related_container">
              <div className="jobs_container">
                {SearchJobs?.map(ele =>
                  <Card key={ele.id} data={ele} />
                )}
              </div>
              <aside className="aside">
                <div className="aside_container">
                  {
                    HistoryJobs?.length === 0 ?
                      <p className="empty_data">No history jobs</p>
                      :
                      <>
                        <p className="title">Search history:</p>
                        <ul>
                          {
                            HistoryJobs?.map(ele =>
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

export default Search