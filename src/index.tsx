import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./components/app/app";
import "./index.css";
import VideoBG from "./assets/videos/video-bg.main.mp4";

import "./i18n/i18n-main";

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Suspense
                fallback={
                    <div className={".Suspense"}>
                        <video
                            src={VideoBG}
                            autoPlay
                            loop
                            muted
                        />
                        <div className={".overlay"}></div>
                    </div>
                }
            >
                <App />
            </Suspense>
        </BrowserRouter>
    </Provider>
);
