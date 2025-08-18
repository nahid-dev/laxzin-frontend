import { Fragment, useEffect, useState } from "react";

import { useStatus } from "@/context/contextStatus";
import request from "@/lib/request";
import Head from "next/head";
import Cart from "../Cart";
import Drawer from "../Drawer";
import SearchModal from "../SearchModal";
import BottomNavbar from "./BottomNavbar";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import SideProfileMenu from "./SideProfileMenu";

const Layout = ({ children }) => {
  const { cartItems, setCartItems, setContactInfo, contactInfo } = useStatus();

  const [catData, setCatData] = useState([]);

  useEffect(() => {
    let getData = async () => {
      const [catRes, contactRes] = await Promise.all([
        request(`navbar-categories`),
        request(`contact-info`),
      ]);

      setCatData(catRes?.categories);
      setContactInfo(contactRes?.data);
    };
    getData();
  }, [1]);

  return (
    <>
      <Head>
        <title>{`Laxzin`}</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-body">
        <div className="relative">
          <Navbar catData={catData} contactInfo={contactInfo} />
          <Fragment>{children}</Fragment>
          <Cart cartItems={cartItems} setCartItems={setCartItems} />
          <SearchModal />
          <Drawer />
          <Footer contactInfo={contactInfo} />
          <SideProfileMenu />
          <BottomNavbar />
        </div>
      </div>
    </>
  );
};

export default Layout;
