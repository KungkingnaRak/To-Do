const pad = (n) => String(n).padStart(2, '0')

// วันที่แบบ YYYY-MM-DD ตามเวลาท้องถิ่น (ตรงกับค่าของ <input type="date">)
export const toDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const todayStr = () => toDateStr(new Date())

export const addDays = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return toDateStr(d)
}

export const formatDue = (str) => {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}

// 'overdue' | 'today' | 'upcoming' | null  (งานที่เสร็จแล้วไม่ถือว่าเลยกำหนด)
export const dueStatus = (todo) => {
  if (!todo.due || todo.done) return null
  const t = todayStr()
  if (todo.due < t) return 'overdue'
  if (todo.due === t) return 'today'
  return 'upcoming'
}
