import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Card from "../components/nftcard";
import Accordian from "../components/accordian";
import Footer from "../components/footer";
import styles from "../styles/home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const collections = [
  {
    image: "/img/Component 4 – 1@2x.png",
    name: "ABRAHAM",
    occupation: "MERCENARY",
    skill: "SNEAKY",
  },
  {
    image: "/img/component2.png",
    name: "ABRAHAM",
    occupation: "MERCENARY",
    skill: "SNEAKY",
  },
  {
    image: "/img/component2.png",
    name: "ABRAHAM",
    occupation: "MERCENARY",
    skill: "SNEAKY",
  },
];
const questions = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];
export default function Home() {
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Container className="position-relative  pb-5">
          <div
            className={`d-flex flex-column justify-content-center align-items-center ${styles.slide_content}`}
          >
            <p className="font-60 font-brand text-white">
              CYPHERPUNKS MOVEMENT
            </p>
            <p className="font-24 font-brand text-white">
              Join a club that is out of this World.
            </p>
            <div>
              <Link href="/mint">
                <button className={`bg-brand ${styles.find_btn} font-brand`}>
                  BUY NOW
                </button>
              </Link>
            </div>
          </div>
          <div
            className={`d-flex ${styles.social_icons} justify-content-center`}
          >
            <div className={`${styles.social_icon} bg-brand p-2 m-1`}>
              <Link href="/">
                <FontAwesomeIcon icon={["fab", "twitter"]} />
              </Link>
            </div>
            <div className={`${styles.social_icon} bg-brand p-2 m-1`}>
              <Link href="/">
                <FontAwesomeIcon icon={["fab", "discord"]} />
              </Link>
            </div>
          </div>
          <p className="d-flex font-18 font-brand text-white  justify-content-center">
            SEE OUR COLLECTION
          </p>
          <div className="d-flex font-brand text-white  justify-content-center">
            <Image
              src="/img/Icon ionic-ios-arrow-down@2x.png"
              className={styles.arrow_down}
              width="44"
              height="25"
              alt="arrow_down"
            />
          </div>
        </Container>
      </Layout>

      <div className={`bg-brand ${styles.specs}`} id="specsSection">
        <Container>
          <Row>
            <Col xs={12} md={7} className="py-5">
              <p className="text-start font-36 font-brand">THE SPECS</p>
              <p className="text-start font-18 font-brand">
                Each Astro Bull is unique, programmatically generated from over
                100,000 possible outcomes weighted by rarity. Traits include
                horns, outfits, expressions, eyes, skin, headwear, backgrounds
                and more! The 1st generation consists of 10,000 generated bulls.
                The bulls are stored as ERC-1155 tokens on the Ethereum
                blockchain.
              </p>
            </Col>
            <Col xs={12} md={5} className="position-relative">
              <div className={styles.specs_img}>
                <Image
                  src="/img/Rectangle 20@2x.png"
                  width="400"
                  height="500"
                  alt="spec"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <p
        className="d-flex font-brand font-34 text-white my-5 justify-content-center"
        id="aboutSection"
      >
        About Us
      </p>
      <Container className={styles.collection}>
        <Row>
          {collections.map((collection, index) => (
            <Col xs={12} md={4} key={index}>
              <Card data={collection} key={`nft-$(index)`} />
            </Col>
          ))}
        </Row>
      </Container>
      <p
        className="d-flex font-brand font-34 text-white my-5 justify-content-center"
        id="faqSection"
      >
        FAQ{" "}
      </p>
      <Container>
        {questions.map((question, index) => (
          <Accordian
            title={`Question ${index + 1}`}
            content={question}
            key={`question-${index}`}
          />
        ))}
      </Container>
      <div className={styles.roadmap} id="roadmapSection">
        <Container>
          <Row>
            <Col
              xs={12}
              md={12}
              xl={6}
              className="d-flex justify-cotent-center"
            >
              <div className={styles.roadmap_img}>
                <Image
                  src="/img/Rectangle21@2x.png"
                  width="400"
                  height="700"
                  alt="rect"
                />
              </div>
            </Col>
            <Col
              xs={12}
              md={12}
              xl={6}
              className="text-start text-white font-brand font-18"
            >
              <p className="font-45 mb-5"> THE INITIAL ROADMAP</p>
              <p>25% SOLD</p>
              <p className="color-brand mb-5"> STAGE I</p>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud rcitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
              <p>50% SOLD</p>
              <p className="color-brand mb-5"> STAGE II</p>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam."
              </p>
              <p>75% SOLD</p>
              <p className="color-brand mb-5"> STAGE III </p>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam."
              </p>
              <p>100% SOLD</p>
              <p className="color-brand mb-5"> More to come soon...</p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}
