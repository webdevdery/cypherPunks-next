import { useState } from "react";
import Image from "next/image";
import styles from "../styles/accordian.module.css";

export default function Accordion(props) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div>
      <div
        className={`d-flex  justify-content-around ${styles.accord_header}`}
        onClick={toggle}
      >
        <div className="d-flex">
          <div className={styles.under_tri}>
            <Image
              src="/img/under-tri.png"
              width="40"
              height="40"
              alt="under-tri"
            />
          </div>
          <p className="font-brand text-white font-40">{props.title}</p>
        </div>
        <div className={`align-self-stretch ${styles.question_line}`}>
          <div className={styles.line} />
        </div>
        <div className={styles.exit}>
          {isShowing === true ? (
            <Image src="/img/exit.png" width="40" height="40" alt="exit" />
          ) : (
            <Image src="/img/down.png" width="40" height="40" alt="exit" />
          )}
        </div>
      </div>
      <div
        className={`${styles.accord_body} font-brand font-18 text-white text-start`}
        style={{ display: isShowing ? "block" : "none", padding: "5px" }}
        dangerouslySetInnerHTML={{
          __html: props.content,
        }}
      />
    </div>
  );
}
