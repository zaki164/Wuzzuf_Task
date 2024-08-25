import ErrorAnime from "./error.json";
import Lottie from "lottie-react";

const Error = () => {
  return (
    <section className="loader_cont">
      <div className="anime">
        <Lottie animationData={ErrorAnime} loop={true} />
      </div>
      <div className="text-redColor font-semibold text-3xl-4xl text-center mt-6">
        Something went wrong
      </div>
    </section>
  );
};

export default Error;
