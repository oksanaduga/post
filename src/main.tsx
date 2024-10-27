import "@/app/styles/index.scss";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { App } from "./app/App";
import ErrorBoundary from "./app/ErrorBoundary/ErrorBoundary";
import { store } from "./app/store/store";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Не удалось вмонтировать приложение");
}

createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
);
