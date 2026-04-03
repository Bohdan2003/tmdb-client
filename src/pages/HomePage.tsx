import WelcomeSection from '../components/home-page/WelcomeSection';
import NowPlayingMoviesSection from '../components/home-page/NowPlayingMoviesSection';
import PopularMoviesSection from '../components/home-page/PopularMoviesSection';
import TopRatedMoviesSection from '../components/home-page/TopRatedMoviesSection';
import UpcomingMoviesSection from '../components/home-page/UpcomingMoviesSection';

export default function HomePage() {
  return (
    <>
      <WelcomeSection />
      <PopularMoviesSection />
      <TopRatedMoviesSection />
      <UpcomingMoviesSection />
      <NowPlayingMoviesSection />
    </>
  );
}
