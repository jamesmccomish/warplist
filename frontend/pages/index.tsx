import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css'; 

import {getFarcasterLikes} from '../../functions/services/function-code/get-farcaster-likes'
import React from 'react';

const Home: NextPage = () => {
  const [casthash, setCastHash] = React.useState(null)
  const [castSelected, setCastSelected] = React.useState(false)
  const [farcasterLikes, setFarcasterLikes] = React.useState(null)
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (casthash) {
          const likes = await getFarcasterLikes(casthash);
          setFarcasterLikes(likes);
        }
      } catch (error) {
        console.error('Error fetching farcaster likes:', error);
      }
    };

    fetchData();
  }, [castSelected]);

  React.useEffect(() => {
    if(!casthash || casthash == '') setFarcasterLikes(null);

  }, [casthash]);

  const handleInputChange = (event) => {
    setCastHash(event.target.value);
  };

  const handleButtonClick = () => {
    // Perform any additional logic if needed before setting the state
    setCastSelected(true);
  };

  return ( 
    <div className={styles.container}>
    <Head>
      <title>Farcaster Chainlink NFT</title>
      <meta
        content="Generated by @rainbow-me/create-rainbowkit"
        name="description"
      />
      <link href="/favicon.ico" rel="icon" />
    </Head>

    <main className={styles.main}>
      <ConnectButton />

      <h1 className={styles.title}>
        Welcome to Farcaster Chainlink NFT Whitelist!
      </h1>

      <p >
        Enter a cast hash to see who has liked it. (eg. 0xcc1cb08481aa0b048588a59a608f27c7214ac79e)
      </p>

      <div className={styles.inputContainer}>
      <input
            type="text"
            className={styles.inputBox}
            placeholder="Enter something..."
            value={casthash}
            onChange={handleInputChange}
          />
        <button className={styles.button} onClick={handleButtonClick}>
            Set Cast Hash
          </button>
      </div>

      <div className={styles.usernamesContainer}>
        {!!farcasterLikes && 
              <h1 className={styles.title}>
              Your Whitelist:
            </h1>
        }
          {farcasterLikes?.map((user, index) => (
            <div key={index} className={styles.usernameBox}>
              {user.reactor.username}
            </div>
          ))}
        </div>

    </main>

    <footer className={styles.footer}>
      <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
        Made with ❤️ by your frens at 🌈
      </a>
    </footer>
  </div>
  );
};

export default Home;
