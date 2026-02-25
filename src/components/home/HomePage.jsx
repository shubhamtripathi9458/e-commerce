import Head from 'next/head';

import HeroSection from './HeroSection';
import Categories from './Categories';
import UpcomingEvents from './UpcomingEvents';
import TopPicks from './TopPicks';
import FeaturedRestaurants from './FeaturedRestaurants';
import HowItWorks from './HowItWorks';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>FoodieExpress - Food & Grocery Delivery</title>
        <meta name="description" content="Order food and groceries online for fast delivery" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pb-8">
        <HeroSection />
        <Categories />
        <UpcomingEvents />
        <TopPicks />
        <FeaturedRestaurants />
        <HowItWorks />
      </div>
    </>
  );
}