export const PRIORITIES = {
  low: {
    label: 'ต่ำ',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    bar: 'bg-emerald-400',
    active: 'bg-emerald-500 text-white border-emerald-500',
  },
  medium: {
    label: 'ปานกลาง',
    badge: 'bg-amber-50 text-amber-700 ring-amber-200',
    bar: 'bg-amber-400',
    active: 'bg-amber-500 text-white border-amber-500',
  },
  high: {
    label: 'สูง',
    badge: 'bg-red-50 text-red-700 ring-red-200',
    bar: 'bg-red-500',
    active: 'bg-red-500 text-white border-red-500',
  },
}

export const ORDER = ['low', 'medium', 'high']

export const CATEGORIES = {
  work:     { label: 'งาน',      tag: 'bg-sky-50 text-sky-700',       dot: 'bg-sky-500' },
  personal: { label: 'ส่วนตัว',   tag: 'bg-violet-50 text-violet-700', dot: 'bg-violet-500' },
  shopping: { label: 'ช้อปปิ้ง',  tag: 'bg-pink-50 text-pink-700',     dot: 'bg-pink-500' },
  health:   { label: 'สุขภาพ',   tag: 'bg-teal-50 text-teal-700',     dot: 'bg-teal-500' },
}

export const CATEGORY_ORDER = ['work', 'personal', 'shopping', 'health']

export const FILTERS = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'active', label: 'ยังไม่เสร็จ' },
  { key: 'completed', label: 'เสร็จแล้ว' },
]
