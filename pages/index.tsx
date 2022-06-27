import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { usePicket } from "@picketapi/picket-react";

const Header = () => (
  <Head>
    <title>Picket Hello World</title>
    <meta name="description" content="Saying hello to a web3 world" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

const Home: NextPage = () => {
  const { isAuthenticating, isAuthenticated, authState, logout, login } =
    usePicket();

  // user is logging in
  if (isAuthenticating)
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.title}>Connecting...</h1>
        </main>
      </div>
    );

  // user is not logged in
  if (!isAuthenticated || !authState) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.title}>Connect your wallet to login</h1>
          <button
            className={styles.connectWalletButton}
            onClick={() => login()}
          >
            Connect Wallet
          </button>
        </main>
      </div>
    );
  }

  // user is logged in 🎉
  const { user, accessToken } = authState;
  const { displayAddress } = user;

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          You are logged in as {displayAddress} 🎉
        </h1>
        <code className={styles.accessToken}>{accessToken}</code>
        <button onClick={() => logout()}>Logout</button>
      </main>
    </div>
  );
};

export default Home;
