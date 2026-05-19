import Image from "next/image"

export function AsisLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/logo-asis.png"
        alt="ÁSIS"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
