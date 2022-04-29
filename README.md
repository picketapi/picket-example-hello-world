# Picket Hello World Example
For this example we’ll be using next.js. While few of the next.js features are needed in this example tutorial, it will create a convenient launching off point for you to build on from this base. It also makes deployment easy through vercel.

## 1. Create your next.js app.
In your terminal `cd` into the directory where you’d like your project folder to reside and enter the following into the terminal:
`npx create-next-app@latest —typescript`

Confirm your app is running on localhost by running
 `npm run dev`

Now, when you navigate to `localhost:3000` in your browser you should see the following:

## 2. Install the Picket React SDK 

```shell
npm install --save @picketapi/picket-react
```

## 3. Setup the Picket Provider 
Replace the contents of \_app.tsx with the following: 

```tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { PicketProvider } from "@picketapi/picket-react";

const apiKey = "YOUR_PUBLISHABLE_KEY_GOES_HERE";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PicketProvider apiKey={apiKey}>
      <Component {...pageProps} />
    </PicketProvider>
  );
}

export default MyApp;
```

## 4. Build your home page
Replace the contents of index.tsx with the following:

```tsx
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
  if (!isAuthenticated) {
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
  const { walletAddress } = user;

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          You are logged in as {walletAddress} 🎉
        </h1>
        <code className={styles.accessToken}>{accessToken}</code>
        <button onClick={() => logout()}>Logout</button>
      </main>
    </div>
  );
};

export default Home;
```

and replace the contents of Home.module.css with the following:

```css
.container {
  padding: 0 2rem;
}

.main {
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  color: black;
  padding-bottom: 20px;
}

.connectWalletButton {
  border-style: none;
  background-color: #5469d4;
  width: 200px;
  padding: 20px;
  border-radius: 50px;

  color: white;
  font-weight: 800;
}

.accessToken {
  max-width: 400px;
  overflow-wrap: break-word;
  margin: 12px 0;
}
```

When you navigate to localhost:3000 in your browser you should see the following:

![image](public/picket-example1-app-running-frontend-only.png)

## 5. Now let's make it real!
Now on to the juicy stuff. Let’s make the connect wallet button functional. Navigate to your [Picket account dashboard](https://picketapi.com/dashboard) and copy your publishable key from a project. Now paste it into the \_app.tsx

```tsx
// in _app.tsx
// Replace with your copied publishable key
const apiKey = "YOUR_PUBLISHABLE_KEY_GOES_HERE";
```

## 6. Whitelist our app's redirect URI

Go back to your [Picket account dashboard](https://picketapi.com/dashboard) and click `Edit` on your project. Add the following redirect URI
- http://localhost:3000/ (trailing slash matters!)

After adding the redirect URI for our app, click the `Save` button to save your changes to the project. Nice! Now we are ready to go.

## 7. Try it out!
Now, when you run `npm run dev` from the command line and navigate to `http://localhost:3000` in your browser you should have a working app that lets you tap on the “Connect Wallet” button to initiate a signing request and verify your wallet.

Assuming you’re in a browser with Metamask installed, when you click on “Connect Wallet” you should now see the following: 

![image](public/picket-example1-mm-signing-request.png)

And when you click sign, you should see your wallet address you used to sign the request displayed on the page. This access token can now be used for the *lifetime of the access token* to *verify* a user’s wallet without needing to ask the user to sign another request.

This long lived strong guarantee of the user’s ownership of their wallet opens up a world of opportunities for enabling easy and secure web3 experiences. You can use it as a new one click authentication method, for limiting access to private content to certain wallet addresses, as a way to link wallets to existing user accounts and much more. Want to move beyond authenticating wallets and interested in how this same picket.login() method can be used to token gate services and verify a user has ownership of a given token? Check out the *Token Gating Tutorial*. It’s just one more step!
