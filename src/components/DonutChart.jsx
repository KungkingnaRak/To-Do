export default function DonutChart({ segments, size = 112, stroke = 14, label, sublabel }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const total = segments.reduce((s, x) => s + x.value, 0)
  let offset = 0

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        {total > 0 &&
          segments
            .filter((s) => s.value > 0)
            .map((s) => {
              const len = (s.value / total) * c
              const el = (
                <circle
                  key={s.key}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={stroke}
                  strokeDasharray={`${len} ${c - len}`}
                  strokeDashoffset={-offset}
                  style={{ transition: 'stroke-dasharray .4s, stroke-dashoffset .4s' }}
                />
              )
              offset += len
              return el
            })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
        <span className="text-xl font-bold text-gray-800">{label}</span>
        {sublabel && <span className="text-[11px] text-gray-400">{sublabel}</span>}
      </div>
    </div>
  )
}
