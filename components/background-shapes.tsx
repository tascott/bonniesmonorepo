interface ShapeProps {
  className?: string
  fill?: string
}

export function WavyShape({ className = "", fill = "#F97316" }: ShapeProps) {
  return (
    <svg
      width="600"
      height="200"
      viewBox="0 0 600 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 100C50 70 100 130 150 100C200 70 250 130 300 100C350 70 400 130 450 100C500 70 550 130 600 100V200H0V100Z"
        fill={fill}
        fillOpacity="0.8"
      />
      <path
        d="M0 120C50 90 100 150 150 120C200 90 250 150 300 120C350 90 400 150 450 120C500 90 550 150 600 120V200H0V120Z"
        fill={fill}
        fillOpacity="0.5"
      />
    </svg>
  )
}

export function CirclePattern({ className = "", fill = "#F97316" }: ShapeProps) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {[...Array(5)].map((_, row) =>
        [...Array(5)].map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={20 + col * 40}
            cy={20 + row * 40}
            r={Math.random() * 8 + 4}
            fill={fill}
            fillOpacity={Math.random() * 0.5 + 0.3}
          />
        )),
      )}
    </svg>
  )
}

export function PawPrintPattern({ className = "", fill = "#F97316" }: ShapeProps) {
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {[...Array(6)].map((_, i) => {
        const x = Math.random() * 240 + 30
        const y = Math.random() * 240 + 30
        const rotation = Math.random() * 360
        const scale = Math.random() * 0.5 + 0.5
        const opacity = Math.random() * 0.4 + 0.1

        return (
          <g key={i} transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}>
            <circle cx="0" cy="-10" r="5" fill={fill} fillOpacity={opacity} />
            <circle cx="-8" cy="-5" r="5" fill={fill} fillOpacity={opacity} />
            <circle cx="8" cy="-5" r="5" fill={fill} fillOpacity={opacity} />
            <ellipse cx="0" cy="10" rx="8" ry="10" fill={fill} fillOpacity={opacity} />
          </g>
        )
      })}
    </svg>
  )
}

export function PlayfulDog({ className = "" }: { className?: string }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="100" cy="120" rx="60" ry="40" fill="#F97316" />

      {/* Head */}
      <circle cx="140" cy="80" r="30" fill="#F97316" />

      {/* Ears */}
      <ellipse cx="125" cy="55" rx="15" ry="20" fill="#EA580C" />
      <ellipse cx="155" cy="55" rx="15" ry="20" fill="#EA580C" />

      {/* Tail */}
      <path d="M40 120C30 100 20 110 10 90" stroke="#EA580C" strokeWidth="10" strokeLinecap="round" />

      {/* Legs */}
      <rect x="70" y="150" width="10" height="30" rx="5" fill="#EA580C" />
      <rect x="120" y="150" width="10" height="30" rx="5" fill="#EA580C" />

      {/* Face */}
      <circle cx="130" cy="75" r="3" fill="#0F172A" />
      <circle cx="150" cy="75" r="3" fill="#0F172A" />
      <ellipse cx="140" cy="90" rx="8" ry="5" fill="#0F172A" />
      <path d="M135 100C138 105 142 105 145 100" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function SleepyDog({ className = "" }: { className?: string }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="100" cy="130" rx="60" ry="30" fill="#84CC16" />

      {/* Head */}
      <circle cx="60" cy="100" r="30" fill="#84CC16" />

      {/* Ears */}
      <ellipse cx="45" cy="75" rx="15" ry="20" fill="#65A30D" />
      <ellipse cx="75" cy="75" rx="15" ry="20" fill="#65A30D" />

      {/* Tail */}
      <path d="M160 130C170 120 180 130 190 120" stroke="#65A30D" strokeWidth="10" strokeLinecap="round" />

      {/* Legs */}
      <rect x="70" y="150" width="10" height="20" rx="5" fill="#65A30D" />
      <rect x="120" y="150" width="10" height="20" rx="5" fill="#65A30D" />

      {/* Face */}
      <path d="M50 95C50 95 55 100 60 95" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 95C70 95 65 100 60 95" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="60" cy="110" rx="8" ry="5" fill="#0F172A" />
      <path d="M50 120C53 125 67 125 70 120" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function BackgroundElement({
  type,
  className = "",
  fill = "#F97316",
}: { type: "wave" | "circles" | "paws"; className?: string; fill?: string }) {
  switch (type) {
    case "wave":
      return <WavyShape className={className} fill={fill} />
    case "circles":
      return <CirclePattern className={className} fill={fill} />
    case "paws":
      return <PawPrintPattern className={className} fill={fill} />
    default:
      return null
  }
}

import { ReactComponent as LeftBlobSVG } from "../public/images/blob-left.svg"
export const LeftBlob = LeftBlobSVG

import { ReactComponent as RightBlobSVG } from "../public/images/blob-right.svg"
export const RightBlob = RightBlobSVG

import { ReactComponent as DotsPatternSVG } from "../public/images/dots-pattern.svg"
export const DotsPattern = DotsPatternSVG

import { ReactComponent as WhiteDogSVG } from "../public/images/dog-white.svg"
export const WhiteDog = WhiteDogSVG

import { ReactComponent as GrayDogSVG } from "../public/images/dog-gray.svg"
export const GrayDog = GrayDogSVG

import { ReactComponent as HillSVG } from "../public/images/hill.svg"
export const Hill = HillSVG

