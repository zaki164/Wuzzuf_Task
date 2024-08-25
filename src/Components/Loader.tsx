import Loading from "./loading.json";
import Lottie from "lottie-react";

const Loader = () => {
  return (
    <section className="loader_cont">
      <div className="anime">
        <Lottie animationData={Loading} loop={true} />
      </div>
    </section>
  );
};
export default Loader;
