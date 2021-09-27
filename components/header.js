import React from "react";
import Image from "next/image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import styles from "../styles/header.module.css";
import { Link as ScrollLink } from "react-scroll";

export default function Header(props) {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand className={styles.logo}>
          <a href="/">
            <Image
              src="/img/logo.png"
              className="logo-img"
              width={474}
              height={43}
              alt="logo"
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <ScrollLink
              to="#"
              className=" mr-7 text-white font-brand font-18 line-height-70"
              smooth
              duration={500}
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="aboutSection"
              className=" mr-7 text-white font-brand font-18 line-height-70"
              smooth
              duration={500}
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="specsSection"
              className=" mr-7 text-white font-brand font-18 line-height-70"
              smooth
              duration={500}
            >
              Specs
            </ScrollLink>
            <ScrollLink
              to="faqSection"
              className=" mr-7 text-white font-brand font-18 line-height-70"
              smooth
              duration={500}
            >
              Faq
            </ScrollLink>
            <ScrollLink
              to="roadmapSection"
              className="  mr-7 text-white font-brand font-18 line-height-70"
              smooth
              duration={500}
            >
              Roadmap
            </ScrollLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
