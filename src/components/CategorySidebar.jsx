import { LayoutGrid } from 'lucide-react'
import { CATEGORIES, CATEGORY_ORDER } from '../constants'

export default function CategorySidebar({ todos, selected, onSelect }) {
  const counts = Object.fromEntries(
    CATEGORY_ORDER.map((k) => [k, todos.filter((t) => t.category === k).length])
  )

  const itemClass = (active) =>
    `shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap lg:w-full ${
      active ? 'bg-indigo-500 text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100'
    }`

  const badgeClass = (active) =>
    `ml-auto text-xs px-1.5 min-w-[1.25rem] text-center rounded-full ${
      active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
    }`

  return (
    <aside>
      <h2 className="hidden lg:block text-sm font-semibold text-gray-500 mb-2 px-1">หมวดหมู่</h2>
      <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-1 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible">
        <button onClick={() => onSelect('all')} className={itemClass(selected === 'all')}>
          <LayoutGrid size={16} />
          ทั้งหมด
          <span className={badgeClass(selected === 'all')}>{todos.length}</span>
        </button>
        {CATEGORY_ORDER.map((k) => (
          <button key={k} onClick={() => onSelect(k)} className={itemClass(selected === k)}>
            <span className={`w-2.5 h-2.5 rounded-full ${CATEGORIES[k].dot}`} />
            {CATEGORIES[k].label}
            <span className={badgeClass(selected === k)}>{counts[k]}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
