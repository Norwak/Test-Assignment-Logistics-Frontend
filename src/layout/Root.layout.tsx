import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import React, { Dispatch, SetStateAction, useEffect } from "react";

const RootLayout: React.FC<{setLoaded: Dispatch<SetStateAction<boolean>>}> = (props) => {
  useEffect(() => {
    props.setLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <main className="mt30">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;