// UnorderedList.tsx

import React from "react";
import styles from "./unorderedList.module.css";

const UnorderedList = ({ list }: { list: string[] }) => {
  return (
    <ul className={styles.list}>
      {list.map((item, index) => (
        <li key={index}>
        <span className={styles.bullet}>•</span>
        </li>
      ))}
    </ul>
  );
};

export default UnorderedList;
