import { BiUndo } from "react-icons/bi";
import {
  FaBarcode,
  FaBolt,
  FaHeart,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

const productInfo = [
  { icon: FaShieldAlt, title: "100% Authentic Product" },
  { icon: BiUndo, title: "Easy Returns Policy" },
  { icon: FaTruck, title: "Free Delivery on 2000" },
  { icon: FaHeart, title: "Cruelty-Free" },
  { icon: FaTruck, title: "Delivery info", subtitle: "Delivery in 3 - 4 days" },
  {
    icon: FaBolt,
    title: "Fast selling",
    subtitle: "People are loving it! Sold 20 pcs in last 24 hrs",
  },
  { icon: FaBarcode, title: "SKU code", subtitle: "1553" },
];

export default function DeliveryInfoSection() {
  return (
    <div className="bg-gray-50 p-4 mt-6 divide-y rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-3">
        {productInfo.slice(0, 4).map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx}>
              <Icon className="text-gray-500 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="text-xs text-gray-600">{item.subtitle}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 pt-3">
        {productInfo.slice(4).map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx}>
              <Icon className="text-gray-500 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="text-xs text-gray-600">{item.subtitle}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
