import Image from "next/image";

export default function ProductBenefits() {
  return (
    <div className="flex items-center justify-stretch gap-10 mt-8">
      <Image
        className="object-fill p-2 rounded-lg w-28 h-28"
        src="/assets/img-1.webp"
        width={28}
        height={28}
        onError={(e) => {
          e.target.src = "/assets/placeholder_600x.webp";
        }}
      />
      <Image
        className="object-fill p-2 rounded-lg w-28 h-28"
        src="/assets/img-2.webp"
        width={28}
        height={28}
        onError={(e) => {
          e.target.src = "/assets/placeholder_600x.webp";
        }}
      />
      <Image
        className="object-fill p-2 rounded-lg w-28 h-28"
        src="/assets/img-3.webp"
        width={28}
        height={28}
        onError={(e) => {
          e.target.src = "/assets/placeholder_600x.webp";
        }}
      />
      <Image
        className="object-fill p-2 rounded-lg w-28 h-28"
        src="/assets/img-4.webp"
        width={28}
        height={28}
        onError={(e) => {
          e.target.src = "/assets/placeholder_600x.webp";
        }}
      />
    </div>
  );
}
