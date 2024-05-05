import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ThemeProvider } from "@gravity-ui/uikit";
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme="light">
          <Header />
          <Outlet />
        </ThemeProvider>
      </Provider>
    </>
  );
}