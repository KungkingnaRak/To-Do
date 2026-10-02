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

export const FILTERS = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'active', label: 'ยังไม่เสร็จ' },
  { key: 'completed', label: 'เสร็จแล้ว' },
]
