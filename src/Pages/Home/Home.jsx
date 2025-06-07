import Featured from "../../Components/Featured/Featured";
import FertilizerTrend from "../../Components/FertilizerTrend/FertilizerTrend";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Featured />
      <FertilizerTrend />
    </div>
  );
}

export default Home;
