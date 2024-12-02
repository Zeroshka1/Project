import AllServices from "./components/allServices/AllServices";
import Filter from "./components/filter/Filter";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import StartBanerText from "./components/startBanerText/StartBanerText";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <StartBanerText />
        <Filter/>
        <AllServices/>
      </main>
      <Footer />
    </div>
  );
}
