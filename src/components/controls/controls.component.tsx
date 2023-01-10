import React, { Component, FC } from "react";
import { m, Variants } from "framer-motion";
import styles from "./controls.module.scss";

interface Props {
    onTopClick: () => void;
    onBottomClick: () => void;
}

const buttonsVariants: Variants = {
    onTap: {
        scale: 1.2,
    },
    onHover: {
        scale: 0.92,
    },
};

export const Controls: FC<Props> = ({ onTopClick, onBottomClick }) => {
    return (
        <div className={styles.Control_container}>
            <span
                onClick={onTopClick}
                className={`${styles.control} ${styles.to_top}`}
            ></span>
            <span
                onClick={onBottomClick}
                className={`${styles.control} ${styles.to_bottom}`}
            ></span>
        </div>
    );
};
