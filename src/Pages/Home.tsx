import { useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import MainContent from "../Components/MainContent";
import { useGetJobsDataQuery } from "../Store/Jobs";
import Error from "../Components/Error";
import Loader from "../Components/Loader";

const Home = () => {
  const limitItems = 12;
  const [limit, setLimit] = useState<number>(limitItems);
  const [cursor, setCursor] = useState<number>(0);

  const jobsContainerRef = useRef<HTMLDivElement>(null);
  const [hasReachedBottom, setHasReachedBottom] = useState<boolean>(false);

  const { data: AllJobs, isError, isLoading, isFetching } = useGetJobsDataQuery({ limit, cursor });

  useEffect(() => {
    const handleScroll = () => {
      if (jobsContainerRef.current) {
        const rect = jobsContainerRef.current.getBoundingClientRect();
        const isAtBottom = rect.bottom <= window.innerHeight;

        if (isAtBottom && !hasReachedBottom) {
          if (AllJobs?.meta?.count) {
            if (limit < AllJobs?.meta?.count) {
              setLimit(prev => prev + limitItems)
            }
          }
          setHasReachedBottom(true);
        } else if (!isAtBottom && hasReachedBottom) {
          setHasReachedBottom(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasReachedBottom]);


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
        AllJobs?.jobs?.length === 0 ? <p className="empty_data">Empty data</p> :
          <MainContent
            title={`All Jobs (${AllJobs?.meta?.count})`}
          >
            <div className="jobs_container" ref={jobsContainerRef}>
              {AllJobs?.jobs?.map(ele =>
                <Card key={ele.id} data={ele} />
              )}
            </div>
            {isFetching &&
              <div className="load_more">
                loading more...
              </div>
            }
          </MainContent>
  )
}

export default Home