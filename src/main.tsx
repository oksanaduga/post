import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "@/app/styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Не удалось вмонтировать приложение");
}

createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
