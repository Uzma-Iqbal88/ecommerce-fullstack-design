import CategorySection from '../components/CategorySection.jsx';
import DealsSection from '../components/DealsSection.jsx';
import ExtraServices from '../components/ExtraServices.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import QuoteRequestForm from '../components/QuoteRequestForm.jsx';
import Regions from '../components/Regions.jsx';

const Home = () => {
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <Hero />
      <DealsSection />
      <CategorySection />
      <ProductGrid />
      <QuoteRequestForm />
      <ExtraServices />
      <Regions />
      <Footer />
    </div>
  );
};

export default Home;
