
import Layout from "@/Components/Layout/Layout";
import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tabs/style/react-tabs.css";
import { StatusProvider } from "@/context/contextStatus";

export default function App({ Component, pageProps }) {
  
  return (
    <StatusProvider>
      <main>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose="1000"
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover
            draggable={true}
          />
        </Layout>
      </main>
    </StatusProvider>
  );
}
