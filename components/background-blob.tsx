import { LeftBlob, RightBlob, DotsPattern, WhiteDog, GrayDog, Hill } from "./background-shapes"

interface BackgroundBlobProps {
  position: "left" | "right"
  className?: string
  withDots?: boolean
  withDog?: boolean
  withHill?: boolean
}

export function BackgroundBlob({
  position,
  className = "",
  withDots = false,
  withDog = false,
  withHill = false,
}: BackgroundBlobProps) {
  return (
    <div className={`absolute pointer-events-none ${className} ${position === "left" ? "left-0" : "right-0"}`}>
      <div className="relative">
        {position === "left" ? <LeftBlob /> : <RightBlob />}

        {withDots && (
          <div className={`absolute ${position === "left" ? "bottom-16 left-8" : "bottom-16 right-8"}`}>
            <DotsPattern />
          </div>
        )}

        {withDog && (
          <div className={`absolute ${position === "left" ? "top-1/4 right-1/4" : "top-1/4 left-1/4"}`}>
            {position === "left" ? <GrayDog /> : <WhiteDog />}
          </div>
        )}

        {withHill && (
          <div className={`absolute ${position === "left" ? "bottom-16 right-16" : "bottom-16 left-16"}`}>
            <Hill />
          </div>
        )}
      </div>
    </div>
  )
}

