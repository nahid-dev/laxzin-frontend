import { useState } from "react";
import Link from "next/link";
import SectionHeader from "../SectionHeader";
import Button from "../Common/Button";

export default function ProductVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    const video = document.getElementById("product-video");
    if (video) {
      video.play();
    }
  };

  return (
    <section className="py-8 md:py-12 lg:py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Video Content */}
          <div className="relative">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
              <video
                id="product-video"
                className="w-full h-full object-cover"
                poster="/placeholder-87ew4.png"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="https://tiamglobal.com/cdn/shop/videos/c/vp/28048fc975a646a28f5b5cb3672bdb93/28048fc975a646a28f5b5cb3672bdb93.HD-1080p-4.8Mbps-18407391.mp4?v=0"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Play Button Overlay */}
              
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-white opacity-80 rounded-lg"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-white opacity-80 rounded-full"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div
                className={`text-center mb-6 md:mb-10 lg:mb-16`}
              >
                {/* Decorative line with geometric elements */}
                <div className="flex items-center justify-center mb-3 md:mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent to-black"></div>
                    <div className="size-1 md:size-2 bg-black transform rotate-45"></div>
                    <div className="w-16 h-px bg-black"></div>
                    <div className="size-2 md:size-3 border border-black transform rotate-45"></div>
                    <div className="w-16 h-px bg-black"></div>
                    <div className="size-1 md:size-2 bg-black transform rotate-45"></div>
                    <div className="w-8 h-px bg-gradient-to-l from-transparent to-black"></div>
                  </div>
                </div>

                {/* Main title with gradient text and hover effect */}
                <h2 className="text-xl md:text-4xl lg:text-5xl font-thin  mb-6 tracking-[0.15em] sm:tracking-[0.25em] bg-gradient-to-r from-gray-600 via-black to-gray-600 bg-clip-text text-white relative transition-all duration-500 hover:bg-gradient-to-r hover:from-black hover:via-gray-600 hover:to-black">
                  EXPERIENCE LAXZIN
                  {/* Underline accent */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full"></div>
                </h2>

                {/* Subtitle */}
                <p class="text-gray-600 text-base sm:text-lg font-light tracking-[0.1em] mt-6 sm:mt-8 px-4">
                    See our products in action
                  </p>
              </div>

            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-light tracking-wide">
                Why Laxzin
              </h3>

              <p className="text-lg text-gray-300 font-light leading-relaxed">
                Discover products featuring nature's most powerful ingredients
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-gray-300">
                    Comprehensive Vitamin Care
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-gray-300">
                    Scientific Research and Innovation
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-gray-300">
                    Natural Raw Materials and Safety
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button variant="secondary" size="lg" className="">
                  SHOP NOW
                </Button>
              </Link>
              <Link href="about-us">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white"
                >
                  LEARN MORE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-20 w-20 h-20 border border-white opacity-15 rounded-lg rotate-45"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-24 bg-white opacity-20"></div>
      </div>
    </section>
  );
}
