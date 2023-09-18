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

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
