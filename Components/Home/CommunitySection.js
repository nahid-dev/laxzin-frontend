import postRequest from "@/lib/postRequest";
import { useState } from "react";
import { toast } from "react-toastify";
import CommonModal from "../Common/Modal";

export default function CommunitySection() {
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSubscribe = async () => {
    const res = await postRequest(`subscribe`, {
      email: email,
      source: "laxzin",
    });
    if (res?.status) {
      toast.success(`${res?.message}`);
      setEmail("");
    } else {
      toast.error(`${res?.error}`);
    }
  };
  return (
    <section className=" bg-white py-8 sm:py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-2 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Join Our Community Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-light tracking-wide text-black">
                  Join Our Community
                </h3>
                <p className="text-gray-600 font-light">
                  For users & enthusiasts
                </p>
              </div>
            </div>

            <p className="text-gray-700 font-light leading-relaxed mb-8">
              Get early access to drops, exclusive rewards, and be the first to
              know about new features.
            </p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button
                onClick={handleSubscribe}
                className="w-full bg-black text-white py-3 rounded-lg font-light tracking-wide hover:bg-gray-800 transition-colors duration-300"
              >
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Become A Brand Partner Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-white">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-light tracking-wide">
                  Become A Brand Partner
                </h3>
                <p className="text-gray-300 font-light">
                  For content creators or influencers
                </p>
              </div>
            </div>

            <p className="text-gray-200 font-light leading-relaxed mb-8">
              Are you a beauty influencer? Join our exclusive partnership
              program to showcase premium beauty products and earn while sharing
              your authentic beauty journey.
            </p>

            <button
              onClick={() => setOpenModal(true)}
              className="w-full bg-white text-black py-3 rounded-lg font-light tracking-wide hover:bg-gray-100 transition-colors duration-300"
            >
              Become A Brand Partner
            </button>
          </div>
        </div>
      </div>
      <CommonModal openResponsive={openModal} setOpenResponsive={setOpenModal}>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          odio.
        </div>
      </CommonModal>
    </section>
  );
}
