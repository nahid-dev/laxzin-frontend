import { parseCookies } from "nookies";
import { createContext, useContext, useState, useEffect } from "react";

const ContextStatus = createContext();

const ContextStatusProvider = ContextStatus.Provider;

function StatusProvider({ children }) {
  const cookie = parseCookies();
  const [cartItems, setCartItems] = useState([]);
  const [isPopupShow, setIsPopupShow] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [type, setType] = useState(cookie?.type ? cookie?.type : null);
  const [promoValue, setPromoValue] = useState(
    cookie?.promovalue ? cookie?.promovalue : null
  );
  const [couponId, setCouponId] = useState(
    cookie?.couponid ? cookie?.couponid : ""
  );
  const [orderObj, setOrderObj] = useState(cookie.orderObj);
  const [renderMe, setIsRenderMe] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [resetToken, setResetToken] = useState(
    cookie?.resetToken ? cookie?.resetToken : ""
  );
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(cookie?.user ? cookie?.user : "");
  const [image, setImage] = useState(cookie?.image ? cookie?.image : "");
  const [userNo, setuserNo] = useState(cookie?.userNo ? cookie?.userNo : "");
  const [phone, setPhone] = useState(
    cookie?.customerPhone ? cookie?.customerPhone : ""
  );
  const [userId, setUserId] = useState(cookie?.userId ? cookie?.userId : null);
  const [profileMenu, setProfileMenu] = useState(false);
  const [sideCategory, setSideCategory] = useState(false);
  const [tabIndex, setTabIndex] = useState(1);
  const [contactInfo, setContactInfo] = useState(null);

  // Update cartItems from cookie only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookie = parseCookies();
      const token = cookie?.token ? cookie?.token : "";
      const items = cookie?.hasOwnProperty("lexzinCart")
        ? [...JSON.parse(cookie?.lexzinCart)]
        : [];
      setCartItems(items);
      setToken(token);
    }
  }, []);

  return (
    <ContextStatusProvider
      value={{
        isPopupShow,
        setIsPopupShow,
        isCartOpen,
        setIsCartOpen,
        cartItems,
        setCartItems,
        orderObj,
        setOrderObj,
        type,
        setType,
        promoValue,
        setPromoValue,
        couponId,
        setCouponId,
        renderMe,
        setIsRenderMe,
        drawerOpen,
        setDrawerOpen,
        searchModal,
        setSearchModal,
        token,
        setToken,
        userData,
        setUserData,
        image,
        setImage,
        userNo,
        setuserNo,
        phone,
        setPhone,
        userId,
        setUserId,
        profileMenu,
        setProfileMenu,
        sideCategory,
        setSideCategory,
        resetToken,
        setResetToken,
        tabIndex,
        setTabIndex,
        contactInfo,
        setContactInfo,
      }}
    >
      {children}
    </ContextStatusProvider>
  );
}

function useStatus() {
  const all = useContext(ContextStatus);
  return all;
}

export { StatusProvider, useStatus };
