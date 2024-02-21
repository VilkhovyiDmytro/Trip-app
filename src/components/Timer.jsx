import React, { useState, useEffect } from "react";
import styles from "./Timer.module.css";

function Timer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.wraper}>
      <p>
        <span className={styles.numbers}>{timeLeft.days}</span>
        <span className={styles.letters}>days</span>
      </p>
      <p>
        <span className={styles.numbers}>{timeLeft.hours} </span>
        <span className={styles.letters}>hours</span>
      </p>
      <p>
        <span className={styles.numbers}>{timeLeft.minutes} </span>
        <span className={styles.letters}>minutes</span>
      </p>
      <p>
        <span className={styles.numbers}>{timeLeft.seconds} </span>
        <span className={styles.letters}>seconds</span>
      </p>
    </div>
  );
}

export default Timer;
