import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      {/* <MainHeader /> */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
