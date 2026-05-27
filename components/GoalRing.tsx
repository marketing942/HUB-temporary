'use client'

import { cn } from '@/lib/utils'

interface GoalRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
  label?: string
}

export default function GoalRing({
  percentage,
  size = 120,
  strokeWidth = 10,
  label = '% da Meta',
}: GoalRingProps) {
  const clamped = Math.min(Math.max(percentage, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  const color =
    clamped >= 100
      ? '#22c55e'
      : clamped >= 75
      ? '#d4af37'
      : clamped >= 50
      ? '#facc15'
      : '#ef4444'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1a3a1a"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-black text-xl"
            style={{ color }}
          >
            {clamped.toFixed(0)}%
          </span>
        </div>
      </div>
      <p className="text-gray-500 text-xs">{label}</p>
    </div>
  )
}
