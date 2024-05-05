import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ThemeProvider } from "@gravity-ui/uikit";
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

export default function RootLayout() {
  return (
    <>
      <ThemeProvider theme="light">
        <Header />
        <Outlet />
      </ThemeProvider>
    </>
  );
}