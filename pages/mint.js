import { useState, useEffect } from "react";
import Image from "next/image";
import Web3 from "web3";

import Footer from "../components/footer";
import { shortenHex } from "../utils/helper";
import { ContractAddress, DefaultNetwork } from "../constants/index";
import ABI from "../contracts/ABI.json";

import styles from "../styles/mint.module.css";

export default function Mint() {
  const [signedIn, setSignedIn] = useState(false);
  const [punksContract, setPunkContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [saleStarted, setSaleStarted] = useState(false);
  const [punksPrice, setPunkPrice] = useState(0);
  const [MAX_PUNKS, setMaxPunks] = useState(null);
  const [mintingStatus, setMintingStatus] = useState(false);

  const [count, setCount] = useState("1");

  const launchDate = new Date("06 Aug 2021 18:00:00 UTC").getTime(); //hi
  const PRE_LAUNCH_PERIOD = 30 * 60 * 1000; // 30 mins
  const preAccessStartDate = launchDate - PRE_LAUNCH_PERIOD;
  console.log(launchDate);
  console.log(`Prelaunch begins on ${new Date(preAccessStartDate)}`);

  const mintCypherPunks = async () => {
    if (punksContract) {
      const price = Number(punksPrice) * count;

      const gasAmount = await punksContract.methods
        .mintPunk(count)
        .estimateGas({ from: walletAddress, value: price });
      console.log("estimated gas", gasAmount);

      console.log({ from: walletAddress, value: price });

      setMintingStatus("Minting...");

      punksContract.methods
        .mintCYPHERPUNK(count)
        .send({ from: walletAddress, value: price, gas: String(gasAmount) })
        .on("transactionHash", async function (hash) {
          setMintingStatus("Done!");

          const totalSupply = await punksContract.methods.totalSupply().call();
          setTotalSupply(totalSupply);

          console.log("transactionHash", hash);
        });
    } else {
      console.log("Wallet not connected");
    }
  };

  async function signIn() {
    if (typeof window.web3 !== "undefined") {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);
    } else {
      alert("No Ethereum interface injected into browser. Read-only access");
    }

    window.ethereum
      .enable()
      .then(function (accounts) {
        window.web3.eth.net
          .getId()
          // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
          .then((network) => {
            console.log(network);
            if (network !== 4) {
              alert(
                "You are on " +
                  network +
                  " network. Change network to mainnet or you won't be able to do anything here"
              );
            }
          });
        let wallet = accounts[0];
        setWalletAddress(wallet);
        setSignedIn(true);
        callContractData(wallet);
      })
      .catch(function (error) {
        // Handle error. Likely the user rejected the login
        console.error(error);
      });
  }

  async function callContractData(wallet) {
    // let balance = await web3.eth.getBalance(wallet);
    // setWalletBalance(balance)
    const punksContract = new window.web3.eth.Contract(
      ABI,
      ContractAddress[DefaultNetwork]
    );
    setPunkContract(punksContract);

    let saleIsActive = await punksContract.methods.saleIsActive().call();
    console.log("saleIsActive", saleIsActive);
    if (saleIsActive) {
      const now = new Date().getTime();
      if (now < launchDate) {
        saleIsActive = false;
      }
      if (
        // Set sale active if prelaunch period and we have the special code in the URL query params.
        // now >= preAccessStartDate &&
        window.location.search.includes("ROAR")
      ) {
        saleIsActive = true;
      }
    }

    setSaleStarted(saleIsActive);

    const totalSupply = await punksContract.methods.totalSupply().call();
    setTotalSupply(totalSupply);

    const punksPrice = await punksContract.methods.CYPHERPUNKPrice().call();
    setPunkPrice(punksPrice);

    const MAX_PUNKS = await punksContract.methods.MAX_CYPHERPUNKS().call();
    setMaxPunks(MAX_PUNKS);
  }

  useEffect(() => {
    signIn();
  }, []);
  return (
    <div className="bg-dark">
      <div className={`${styles.slider}`}>
        <div className="d-flex justify-content-around">
          <a href="/" className={styles.logo}>
            <Image
              src="/img/logo1.png"
              width={474}
              height={43}
              className="logo-img"
              alt="logo1"
            />
          </a>
          {!signedIn ? (
            <div className="container d-flex justify-content-end my-3">
              <div className="d-flex align-items-center">
                <button
                  className="bg-dark text-white font-brand font-25 me-3 mb-0 pt-1"
                  onClick={signIn}
                >
                  Connet Wallet
                </button>
              </div>
            </div>
          ) : (
            <div className="container d-flex justify-content-end my-3">
              <div className="d-flex align-items-center">
                <p className="text-white font-brand font-25 me-3 mb-0 pt-1">
                  {shortenHex(walletAddress)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.mintboard}>
          <div className="d-flex justify-content-around pb-3">
            <p className="font-brand color-brand font-25 text-end px-3">
              TOTAL MINTED
            </p>
            <p className="font-brand color-brand font-25 text-end px-3">
              {totalSupply}/10,000
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <p className="font-brand text-white font-34 text-center">
              MINT YOUR CYPHERPUNKS NFTS
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <input
              type="number"
              min="1"
              max="20"
              value={count}
              placeholder="Enter amount to mint"
              className={`${styles.mint_price}  px-3 font-brand text-white font-34`}
              onChange={(e) => {
                setCount(e.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-center">
            {saleStarted ? (
              <button
                className={`bg-brand ${styles.mint_btn} font-brand font-20 my-5`}
                onClick={mintCypherPunks}
              >
                MINT {count} cypherpunks for {(punksPrice * count) / 10 ** 18}{" "}
                ETH + GAS{" "}
              </button>
            ) : (
              <button
                className={`bg-brand ${styles.mint_btn} font-brand font-20 my-5`}
              >
                SALE IS NOT ACTIVE OR NO WALLET IS CONNECTED
              </button>
            )}
            <span>{mintingStatus}</span>
          </div>
        </div>
      </div>

      {/* <p className="font-brand text-white font-50 text-center mb-5">
        \\MY CYPHERPUNKS COLLECTION
      </p>
      <Container className="collection">
        <Row>
          {collections.map((collection, index) => (
            <Col xs={12} md={4}>
              <CollectionCard data={collection} key={`nft-$(index)`} />
            </Col>
          ))}
        </Row>
      </Container> */}

      <Footer />
    </div>
  );
}
