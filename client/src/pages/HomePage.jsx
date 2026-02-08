import HeroSection from "../components/HeroSection";
import NewArrivals from "../components/NewArrivals";
import MaxWidthContainer from "../components/ui/maxwidthcontainer";

const HomePage = () => {
  return (
    <MaxWidthContainer>
      <HeroSection />

      {/* new arriavls */}
      <div className="mb-16">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          New Arrivals
        </h1>
        <NewArrivals />
      </div>
    </MaxWidthContainer>
  );
};
export default HomePage;
