import React, { FC, useLayoutEffect, useState } from "react";
import styles from "./nav.module.scss";
import { useTranslation } from "react-i18next";
import { motion, MotionValue, useTransform } from "framer-motion";
import { EnLangIcon } from "../../assets/icons/en_lang.icon";
import { RuLangIcon } from "../../assets/icons/ru_lang.icon";
import { SectionsName } from "../../Enums";

export interface Props {
    animateFrom: number | undefined;
    scrollY: MotionValue;
    currentSection: SectionsName;
}

export const Navigation: FC<Props> = ({
    animateFrom,
    scrollY,
    currentSection,
}) => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useLayoutEffect(() => {
        function updateSize() {
            setWindowWidth(window.innerHeight);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const langIconsMap = new Map<string, JSX.Element>([
        ["en", <EnLangIcon />],
        ["ru", <RuLangIcon />],
    ]);

    useLayoutEffect(() => {
        setLanguage(i18n.language);
    }, [i18n.language]);

    const changeLanguageHandler = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    useLayoutEffect(() => {
        console.log(currentSection);
    }, [currentSection]);

    const paddingBlock = useTransform(
        scrollY,
        [(animateFrom as number) - 150, animateFrom as number],
        [windowWidth > 768 ? 40 : 24, windowWidth > 768 ? 28 : 16]
    );
    const bg = useTransform(
        scrollY,
        [(animateFrom as number) - 100, animateFrom as number],
        ["rgba(102, 114, 117, 0.3)", "rgba(91, 121, 128, 0)"]
    );

    return (
        <motion.nav
            initial={{
                y: "-100%",
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 1, stiffness: 80, damping: 100 },
            }}
            style={{
                paddingTop: paddingBlock,
                paddingBottom: paddingBlock,
                backgroundColor: bg,
                // borderBottom: BorderBottom,
            }}
            className={`${styles.nav} ${styles[currentSection]}`}
        >
            {}
            {/* <video src={VideoBG} autoPlay muted loop /> */}
            {/* <div className={styles.overlay} /> */}
            <motion.a
                whileHover={{ scale: 1.2 }}
                href={`#${SectionsName.Main}`}
                className={styles.brand}
            >
                Wonder Wafflen
            </motion.a>
            <div className={styles.links}>
                <motion.a
                    href={`#${SectionsName.Skills}`}
                    style={{}}
                    className={
                        currentSection === SectionsName.Skills
                            ? styles.active
                            : ""
                    }
                >
                    {t("nav.skills")}
                </motion.a>
                <motion.a
                    href={`#${SectionsName.Education}`}
                    style={{}}
                    className={
                        currentSection === SectionsName.Education
                            ? styles.active
                            : ""
                    }
                >
                    {t("nav.education")}
                </motion.a>
                <motion.a
                    href={`#${SectionsName.About}`}
                    style={{}}
                    className={
                        currentSection === SectionsName.About
                            ? styles.active
                            : ""
                    }
                >
                    {t("nav.about")}
                </motion.a>
                <motion.a
                    href={`#${SectionsName.Contacts}`}
                    style={{}}
                    className={
                        currentSection === SectionsName.Contacts
                            ? styles.active
                            : ""
                    }
                >
                    {t("nav.contacts")}
                </motion.a>
                <button
                    onClick={() =>
                        changeLanguageHandler(language === "en" ? "ru" : "en")
                    }
                >
                    {t("nav.language")} {langIconsMap.get(language)}
                </button>
            </div>
        </motion.nav>
    );
};
