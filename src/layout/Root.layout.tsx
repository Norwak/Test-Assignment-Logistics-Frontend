import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <h1>Test Root</h1>
      <Outlet />
    </>
  );
}