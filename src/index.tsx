import "bootstrap/dist/css/bootstrap.min.css";
import App from "app";
import "core-js/stable";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "redux/store";
import "regenerator-runtime/runtime";
import "style/bootsrap-custom.scss";
import "style/index.scss";
import "./utils/language/languageClient";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

if (process.env.TARGET_ENV == "production" || process.env.TARGET_ENV == "staging") {
    Sentry.init({
        dsn: "https://48baedd7be5f4db49d964b6cd80a904b@o394619.ingest.sentry.io/4504553044705280",
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
        environment: process.env.TARGET_ENV,
    });
}

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
