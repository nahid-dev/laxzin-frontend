export default function CategoryBanner({ title, subtitle, image, bgColor = "bg-black" }) {
  return (
    <div className={`relative ${bgColor} text-white flex items-center justify-center min-h-[50vh] sm:min-h-screen`}>
      <div className="absolute inset-0">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover opacity-40" />
      </div>
      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center mb-8 sm:mb-10">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-white"></div>
            <div className="w-2 sm:w-3 h-2 sm:h-3 border-2 border-white transform rotate-45"></div>
            <div className="w-4 sm:w-6 h-px bg-white"></div>
            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white transform rotate-45"></div>
            <div className="w-4 sm:w-6 h-px bg-white"></div>
            <div className="w-2 sm:w-3 h-2 sm:h-3 border-2 border-white transform rotate-45"></div>
            <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-white"></div>
          </div>
        </div>
        <h3 className="text-4xl sm:text-5xl lg:text-7xl font-thin mb-6 sm:mb-8 tracking-[0.2em] sm:tracking-[0.3em] relative group">
          <span className="bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent hover:from-white hover:via-gray-200 hover:to-white transition-all duration-700">
            {title}
          </span>
          <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <div className="absolute -bottom-3 sm:-bottom-5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
        </h3>
        <p className="text-lg sm:text-xl opacity-90 font-light tracking-[0.15em]">{subtitle}</p>
      </div>
    </div>
  )
}
