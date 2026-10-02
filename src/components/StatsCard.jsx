import DonutChart from './DonutChart'
import { dueStatus } from '../utils/date'

const COLORS = { done: '#10b981', active: '#6366f1', overdue: '#ef4444' }

export default function StatsCard({ todos }) {
  const total = todos.length
  const done = todos.filter((t) => t.done).length
  const overdue = todos.filter((t) => dueStatus(t) === 'overdue').length
  const active = total - done - overdue
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  const segments = [
    { key: 'done', label: 'เสร็จแล้ว', value: done, color: COLORS.done },
    { key: 'active', label: 'กำลังดำเนินการ', value: active, color: COLORS.active },
    { key: 'overdue', label: 'เลยกำหนด', value: overdue, color: COLORS.overdue },
  ]

  return (
    <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-4">
      <h2 className="text-sm font-semibold text-gray-500 mb-3">สถิติ</h2>
      <div className="flex items-center gap-5">
        <DonutChart segments={segments} label={`${percent}%`} sublabel="เสร็จแล้ว" />
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl bg-gray-50 px-3 py-2">
              <div className="text-2xl font-bold text-gray-800">{total}</div>
              <div className="text-xs text-gray-500">งานทั้งหมด</div>
            </div>
            <div className="rounded-xl bg-gray-50 px-3 py-2">
              <div className="text-2xl font-bold text-gray-800">{percent}%</div>
              <div className="text-xs text-gray-500">เสร็จสมบูรณ์</div>
            </div>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {segments.map((s) => (
              <li key={s.key} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                {s.label} <b className="text-gray-800">{s.value}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
