import React, { useLayoutEffect, useState } from "react";
import styles from "./app.module.scss";
import { Navigation } from "../nav/nav.component";
import { useTranslation } from "react-i18next";
import { m, useScroll, Variants } from "framer-motion";
import VideoBGMain from "../../assets/videos/video-bg.main.mp4";
import VideoBGEducation from "../../assets/videos/video-bg.education.mp4";
import { SectionsName } from "../../Enums";
import { MyObserver } from "../observer/observer.component";
import { Controls } from "../controls/controls.component";

const App = () => {
    const { t } = useTranslation();
    const { scrollY } = useScroll();

    const [currentSection, setCurrentSection] = useState<SectionsName>(
        SectionsName.Main
    );

    const onObserve = (entries: IntersectionObserverEntry[]): void => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setCurrentSection(
                    SectionsName[entry.target.id as SectionsName]
                );
                // TODO: I should think a bit about this
                // window.scrollTo(0, (entry.target as HTMLElement).offsetTop);
            }
        });
    };

    useLayoutEffect(() => {
        console.log(currentSection);
    }, [currentSection]);

    const [navAnimatingFrom, setNavAnimatingFrom] = useState(30);

    const skillsLiElementVariants: Variants = {
        initial: {
            x: "100%",
            opacity: 0,
        },
        inView: {
            x: 0,
            opacity: 1,
        },
    };

    return (
        <div className={styles.app}>
            <Controls
                onTopClick={() => null}
                onBottomClick={() => null}
            />
            <Navigation
                currentSection={currentSection}
                animateFrom={navAnimatingFrom}
                scrollY={scrollY}
            />
            <section
                id={SectionsName.Main}
                className={`${styles.section} ${styles.main}`}
            >
                <video
                    src={VideoBGMain}
                    autoPlay
                    loop
                    muted
                />
                <m.div className={styles.me}>
                    <m.span className={styles.surname}>
                        {t("me.surname")}
                    </m.span>
                    <m.span className={styles.name}>{t("me.name")}</m.span>
                    <span className={styles.dev}>{t("me.dev")}</span>
                </m.div>
            </section>
            <section
                id={SectionsName.Skills}
                className={`${styles.section} ${styles.skills}`}
            >
                <span className={styles.section_title}>
                    {t("skills.title")}
                </span>
                <m.div className={styles.grid}>
                    <m.ul variants={skillsLiElementVariants}>
                        FrontEnd:
                        <m.li>
                            HTML, CSS <span>(09/2018)</span>
                        </m.li>
                        <m.li>
                            JavaScript <span>(10/2018)</span>
                        </m.li>
                        <m.li>
                            Fetch, Axios <span>(12/2018)</span>
                        </m.li>
                        <m.li>
                            React <span>(09/2020)</span>
                        </m.li>
                        <m.li>
                            Redux <span>(10/2020)</span>
                        </m.li>
                        <m.li>
                            Redux-Toolkit <span>(03/2021)</span>
                        </m.li>
                        <m.li>
                            TypeScript <span>(05/2021)</span>
                        </m.li>
                        <m.li>
                            MaterialUI <span>(05/2021)</span>
                        </m.li>
                        <m.li>
                            Framer-Motion <span>(10/2021)</span>
                        </m.li>
                        <m.li>
                            I18Next <span>(05/2021)</span>
                        </m.li>
                    </m.ul>
                    <ul>
                        BackEnd:
                        <m.li>
                            Express <span>(05/2022)</span>
                        </m.li>
                        <m.li>
                            Node.js <span>(05/2022)</span>
                        </m.li>
                        <m.li>
                            Sequelize <span>(06/2022)</span>
                        </m.li>
                    </ul>
                    <ul>
                        Software and other:
                        <m.li>
                            Atom <span>(09/2018)</span>
                        </m.li>
                        <m.li>
                            VS Code <span>(11/2018)</span>
                        </m.li>
                        <m.li>
                            Adobe Photoshop <span>(04/2019)</span>
                        </m.li>
                        <m.li>
                            Git <span>(09/2019)</span>
                        </m.li>
                        <m.li>
                            Figma <span>(03/2021)</span>
                        </m.li>
                        <m.li>
                            Intelijj Web Storm <span>(03/2021)</span>
                        </m.li>
                        <m.li>
                            Nginx <span>(07/2022)</span>
                        </m.li>
                        <m.li>
                            Intelijj IDEA <span>(08/2022)</span>
                        </m.li>
                    </ul>
                    <ul>
                        SoftSkills:
                        <m.li>{t("softSkills.ambitious")}</m.li>
                        <m.li>{t("softSkills.responsible")}</m.li>
                        <m.li>{t("softSkills.nonConflict")}</m.li>
                        <m.li>{t("softSkills.benevolent")}</m.li>
                    </ul>
                </m.div>
            </section>
            <section
                id={SectionsName.Education}
                className={`${styles.section} ${styles.education}`}
            >
                <video
                    src={VideoBGEducation}
                    autoPlay
                    loop
                    muted
                ></video>
                <span className={styles.section_title}>
                    {t("education.title")}
                </span>
                <div className={styles.info}>
                    <span className={styles.college_name}>
                        {t("education.college_name")}
                    </span>
                    <span className={styles.specialization}>
                        {t("education.specialization")}
                    </span>
                    <span className={styles.years_of_study}>
                        {t("education.years_of_study")}
                    </span>
                    <p className={styles.about_education}></p>
                </div>
            </section>
            <section
                id={SectionsName.About}
                className={`${styles.section} ${styles.about}`}
            >
                <span className={styles.section_title}>{t("about.title")}</span>
                <div className={styles.info}></div>
            </section>
            <MyObserver
                selectAll
                selector={"section"}
                callback={onObserve}
                settings={{ threshold: [0.8] }}
            />
        </div>
    );
};

export default App;
