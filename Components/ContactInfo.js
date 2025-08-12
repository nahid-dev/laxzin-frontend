export default function ContactInfo({ icon, title, info }) {
  return (
    <div className="p-4 sm:p-6 text-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
        {icon}
      </div>
      <h4 className="text-base sm:text-lg font-light tracking-[0.1em] mb-2">{title}</h4>
      <p className="text-gray-600 text-sm sm:text-base">{info}</p>
    </div>
  )
}
