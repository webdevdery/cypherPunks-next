import React from "react";
import styles from "../styles/card.module.css";
export default function Card(props) {
  const { image, name, occupation, skill } = props.data;
  return (
    <div className={styles.collection_card}>
      <img src={image} className={styles.content_img} alt="nft" />
      <div className={styles.comment}>
        <div className="bg-brand font-brand d-flex align-items-center justify-content-center">
          <div className="py-4">
            <p className="m-0">NAME:{name}</p>
            <p className="m-0">OCCUPATION:{occupation}</p>
            <p className="m-0">SKILL:{skill}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
