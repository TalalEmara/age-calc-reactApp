import React, {Fragment} from 'react';
import styles from '../styles/display-results.module.css';

interface DisplayResultsProps {
    years: string;
    months: string;
    days: string;
}

const DisplayResults = (props: DisplayResultsProps) => {
    return (
       <div className={styles.displayContainer}>
          <p className={styles.displayText}> <span className={styles.displayText} style={{ color: "mediumpurple" }}>{props.years}</span>  years  </p>
          <p className={styles.displayText}>  <span className={styles.displayText} style={{ color: "mediumpurple" }}>{props.months}</span> months </p>
          <p className={styles.displayText}> <span className={styles.displayText} style={{ color: "mediumpurple" }}>{props.days}</span>  Days </p>
       </div>
    );
};

export default DisplayResults;