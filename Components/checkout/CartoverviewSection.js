import { useStatus } from '@/context/contextStatus';
import { imageHostName } from '@/lib/config';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from 'react-toastify';

const CartoverviewSection = ({
  areaAmount,
  handleChange,
  handlePromo,
  setType,
  handleOrder,
}) => {
  const { cartItems, renderMe, setCartItems, setIsRenderMe } = useStatus();
  const [count, setCount] = useState(1);

  const [total, setTotal] = useState(0);

  const AddCart = (index) => {
    if (cartItems[index]?.quantity < cartItems[index]?.stock) {
      cartItems[index].quantity += count;
      setType(null);
      destroyCookie({}, "type", {
        path: "/",
      });
      setCartItems(cartItems);

      setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setIsRenderMe(!renderMe);
    } else {
      toast.error(`You cant add more product`);
    }
  };

  const SubCart = (index) => {
    if (cartItems[index]?.quantity > 0) {
      cartItems[index].quantity -= count;
      setType(null);
      destroyCookie({}, "type", {
        path: "/",
      });
      setCartItems(cartItems);

      setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
    if (cartItems[index]?.quantity === 0) {
      cartItems?.splice(index, 1);
      setType(null);
      destroyCookie({}, "type", {
        path: "/",
      });
      setCartItems(cartItems);

      setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      toast.success(`product removed successfully`);
    }
    setIsRenderMe(!renderMe);
  };

  const DeleteItem = (index) => {
    cartItems?.splice(index, 1);

    setCartItems(cartItems);
    setType(null);
    destroyCookie({}, "type", {
      path: "/",
    });
    setCookie(null, "lexzinCart", JSON.stringify(cartItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    toast.success(`product removed successfully`);
    setIsRenderMe(!renderMe);
  };

  useEffect(() => {
    let dd = cartItems?.reduce(
      (a, b) =>
        a +
        (b?.sellingPrice
          ? b?.sellingPrice * b?.quantity
          : b?.sellingPrice * b?.quantity),
      0
    );

    setTotal(Number(dd));
  }, [renderMe]);

  return (
    <div className="bg-white text-black p-5">
      <div>
        <div className="text-lg uppercase tracking-[3px]">coupon code </div>

        <div className="flex items-center">
          <div className="w-full">
            <input
              type="text"
              className=" h-10 w-full px-3 text-black bg-gray-200 outline-none placeholder:text-sm border border-gray-200"
              placeholder="coupon code"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <div>
            <button
              className=" px-4 h-10 text-black uppercase hover:bg-black hover:text-white duration-300 border border-black tracking-[3px] text-sm"
              onClick={handlePromo}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="py-3">
        <div className="uppercase tracking-[3px] font-medium">your order</div>
        <div className="flex justify-between pb-2 border-b border-gray-200">
          <div className="uppercase text-sm font-light tracking-[3px]">
            product
          </div>
          <div className="uppercase text-sm font-light tracking-[3px]">
            subtotal
          </div>
        </div>
        {cartItems?.map((item, index) => (
          <div key={index} className="border-b border-primary pb-3">
            <div className="text-sm text-black pb-2">
              <p>{item?.name}</p>
            </div>
            <div>
              {item?.variations == null ? null : (
                <div className="mt-3">
                  <div className="text-xs tracking-wider font-semibold pb-1">
                    {item?.variations}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center xs:space-x-2">
              <div className="h-16 w-16 xms:h-14 xms:w-14 xs:h-14 xs:w-14">
                <img
                  src={`${imageHostName}/storage/product/${item?.image}`}
                  className="h-full w-full object-fill"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mt-2 space-x-3">
                  <div className="flex items-center">
                    <div
                      className="bg-white px-3 py-2 cursor-pointer"
                      onClick={() => SubCart(index)}
                    >
                      <BiMinus
                        size={15}
                        color="#000"
                        className="font-semibold"
                      />
                    </div>
                    <input
                      value={item?.quantity}
                      style={{ outline: "none" }}
                      className="border-2 border-black p-[1px] h-[31px] w-[50px] text-center text-black dark:bg-white"
                    />
                    <div
                      className="bg-primary px-3 py-2 cursor-pointer"
                      onClick={() => AddCart(index)}
                    >
                      <BiPlus
                        size={15}
                        color="#000"
                        className="font-semibold"
                      />
                    </div>
                  </div>
                  <h2 className="font-semibold text-lg">
                    <span className="text-sm dark:text-black">
                      ৳{" "}
                      {Math.round(item?.sellingPrice) * Number(item?.quantity)}
                    </span>
                  </h2>
                  <p
                    className="cursor-pointer text-black text-sm underline flex justify-center pl-4 xs:pl-0"
                    onClick={() => DeleteItem(index)}
                  >
                    <TiDeleteOutline
                      size={25}
                      className="font-semibold text-red-500"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between px-4 py-2 border-y border-gray-200">
        <div className="tracking-[3px] font-light uppercase text-sm">
          subtotal
        </div>

        <div className="font-bold text-lg">৳ {Math.round(total)}</div>
      </div>
      <div className="flex justify-between px-4 pb-2 pt-2 border-b border-gray-200">
        <div className="tracking-[3px] font-light uppercase text-sm">total</div>

        <div className="font-bold text-lg">
          {areaAmount !== null
            ? "৳" + " " + Math.round(Math.round(total) + areaAmount)
            : null}
        </div>
      </div>
      <div>
        <div className="uppercase font-bold tracking-[3px] py-4">
          PAYMENT METHOD
        </div>
        <div className="pb-3 font-light text-sm">
          Sorry, it seems that there are no available payment methods for your
          state. Please contact us if you require assistance or wish to make
          alternate arrangements.
        </div>
        <div className="text-sm font-light">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our <span className="underline">privacy policy.</span>
        </div>
        <div className="mt-3">
          <button
            className="uppercase tracking-[3px] text-white bg-black px-5 py-4"
            onClick={handleOrder}
          >
            place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartoverviewSection