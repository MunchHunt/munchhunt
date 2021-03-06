import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script'
import Landing from '../Components/Landing/Landing';

const Home: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const places = `https://maps.googleapis.com/map/api/js?libraries=places&key${process.env.NEXT_PUBLIC_GOOGLE_API}&libraries=places`;

  return (
    <div>
      <Head>
        <title>Munch Hunt</title>
        <meta property="og:title" content="Munch Hunt" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://munchhunt.netlify.app/" />
        <meta property="og:image" content="https://i.imgur.com/jqSoz8R.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content='illustration of munch hunt mascot man' />
        <meta property="og:description" content="Munch Hunt helps you choose a restaurant when you are feeling indecisive" />
        <meta name="keywords" content="Food, search food, restaurant, food, cuisine, hungry, dining, takeout" />

        <meta name="twitter:title" content="Munch Hunt " />
        <meta name="twitter:description" content="Munch Hunt helps you choose a restaurant when you are feeling indecisive" />
        <meta name="twitter:image" content="https://i.imgur.com/jqSoz8R.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="https://i.imgur.com/Y8KaQBX.png" />
      </Head>
      <Script src={places} />
      <Landing />
      {/* If logged in, then show contents of this page */}
      {/* If not logged in, redirect to Find */}
    </div>
  )
}

export default Home;
