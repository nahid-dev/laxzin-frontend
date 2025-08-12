export default function TrustBadge({ icon, title, subtitle }) {
  return (
    <div className="text-center">
      {/* Icon Circle */}
      <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md transition-shadow duration-300 hover:shadow-lg text-gray-600">
        {icon}
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-black mb-1 tracking-wide">{title}</h4>

      {/* Subtitle */}
      <p className="text-xs font-light text-gray-500">{subtitle}</p>
    </div>
  )
}