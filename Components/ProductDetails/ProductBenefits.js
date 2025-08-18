import Image from "next/image";

const IMAGE_STYLE = "object-fill p-2 rounded-lg size-16 sm:size-28";

export default function ProductBenefits() {
  return (
    <div className="flex items-center gap-2 md:gap-5 mt-5 flex-wrap [&>*:nth-child(n)]:p-2 [&>*:nth-child(n)]:border [&>*:nth-child(n)]:rounded-md">
      <Image
        className={IMAGE_STYLE}
        src="/assets/img-1.webp"
        width={28}
        height={28}
        onError={(e) => {
          e.target.src = "/assets/placeholder_600x.webp";
        }}
      />
      <Image
        className={IMAGE_STYLE}
        src="/assets/img-2.webp"
        width={28}
        height={28}
        onError={(e) => {
          e.target.src = "/assets/placeholder_600x.webp";
        }}
      />
      <Image
        className={IMAGE_STYLE}
        src="/assets/img-3.webp"
        width={28}
        height={28}
        onError={(e) => {
          e.target.src = "/assets/placeholder_600x.webp";
        }}
      />
      <Image
        className={IMAGE_STYLE}
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
