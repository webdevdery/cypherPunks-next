import Link from "next/link";
import styles from "../styles/footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Container, Col, Row } from "react-bootstrap";
export default function Footer() {
  return (
    <div className="bg-brand">
      <Container>
        <Row className="py-5">
          <Col xs={12} md={6}>
            <p className="font-brand font-40">Cypherpunks Movement</p>
            <p className="font-18 font-brand">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam."
            </p>
          </Col>
          <Col xs={12} md={6}>
            <p className="font-brand font-40">Join the community</p>
            <p className="font-18 font-brand">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam."
            </p>
          </Col>
          <Col className="d-flex justify-content-center">
            <div className="d-flex">
              <div className={`bg-dark px-2 pb-2 m-1 ${styles.footer_social}`}>
                <a href="/" target="_blank" className="color-brand">
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                </a>
              </div>
              <div className={`bg-dark px-2 pb-2 m-1  ${styles.footer_social}`}>
                <a href="/" target="_blank" className="color-brand">
                  <FontAwesomeIcon icon={["fab", "discord"]} />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
