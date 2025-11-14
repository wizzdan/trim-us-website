import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Membership from './components/Membership';
import Gallery from './components/Gallery';
import Team from './components/Team';
import Booking from './components/Booking';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <About />
      <Services />
      <Membership />
      <Gallery />
      <Team />
      <Booking />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
