import { Nav } from './Nav';
import { Hero } from './Hero';
import { About } from './About';
import { Courses } from './Courses';
import { Process } from './Process';
import { Gallery } from './Gallery';
import { Requirements } from './Requirements';
import { Enroll } from './Enroll';
import { Footer } from './Footer';

export const LandingPage = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <About />
      <Courses />
      <Process />
      <Gallery />
      <Requirements />
      <Enroll />
    </main>
    <Footer />
  </>
);
