import Image from "next/image"

export function AsisLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/logo-asis.jpg"
        alt="ÁSIS Fitbox"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
