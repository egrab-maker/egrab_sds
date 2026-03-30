import { Footer, Header } from "compositions";
import { AllProviders } from "data";
import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <AllProviders>
      <Header />
      <Outlet />
      <Footer />
    </AllProviders>
  );
}
