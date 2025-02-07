import "@/styles/globals.css"; // the styles are not working
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import MainHeader from "@/components/navigation/MainHeader";
import Footer from "@/components/navigation/Footer";
import { Analytics } from "@vercel/analytics/react";
// import { AuthProvider } from "@/components/context/AuthContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  //if page has a custom layout
  if (Component.getLayout) {
    return Component.getLayout(
      <>
        {/* <AuthProvider> */}
        {/* auth is inside of the layout, it should be outside. Place AuthProvider in Layouts */}
        <Component {...pageProps} />
        <Analytics />
        {/* </AuthProvider> */}
      </>
    );
  }

  // else, standard page layout
  return (
    <>
      {/* <AuthProvider> */}
        <MainHeader />
        <Navbar />
        <Component {...pageProps} />
        <div className="main_container">{/* <Sidebar /> */}</div>
        <Footer />

        <Analytics />
      {/* </AuthProvider> */}
    </>
  );
}
