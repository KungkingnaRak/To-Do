import { useRef, useState } from 'react'
import { Flag, ListChecks, Plus } from 'lucide-react'
import TodoItem from './components/TodoItem'
import { FILTERS, ORDER, PRIORITIES } from './constants'

const INITIAL_TODOS = [
  { id: 1, text: 'ตัวอย่าง: ส่งรายงานให้หัวหน้า', done: false, priority: 'high' },
  { id: 2, text: 'ตัวอย่าง: ซื้อของใช้เข้าบ้าน', done: false, priority: 'medium' },
  { id: 3, text: 'ตัวอย่าง: อ่านหนังสือ 20 นาที', done: true, priority: 'low' },
]

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')
  const nextId = useRef(4)

  const add = () => {
    const t = text.trim()
    if (!t) return
    setTodos((prev) => [{ id: nextId.current++, text: t, done: false, priority }, ...prev])
    setText('')
  }

  const toggle = (id) =>
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const edit = (id, newText) =>
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, text: newText } : t)))

  const cycle = (id) =>
    setTodos((p) =>
      p.map((t) =>
        t.id === id
          ? { ...t, priority: ORDER[(ORDER.indexOf(t.priority) + 1) % ORDER.length] }
          : t
      )
    )

  const remove = (id) => {
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, removing: true } : t)))
    setTimeout(() => setTodos((p) => p.filter((t) => t.id !== id)), 250)
  }

  const clearCompleted = () => {
    setTodos((p) => p.map((t) => (t.done ? { ...t, removing: true } : t)))
    setTimeout(() => setTodos((p) => p.filter((t) => !t.done)), 250)
  }

  const remaining = todos.filter((t) => !t.done).length
  const completedCount = todos.filter((t) => t.done).length
  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  )
  const emptyMsg =
    filter === 'completed'
      ? 'ยังไม่มีงานที่เสร็จ'
      : filter === 'active'
      ? 'ไม่มีงานค้าง เยี่ยมมาก!'
      : 'ยังไม่มีงาน เพิ่มงานแรกของคุณได้เลย'

  return (
    <div className="max-w-xl mx-auto px-4 py-6 sm:py-10">
      <header className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-sm">
          <ListChecks size={24} />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold leading-tight">สิ่งที่ต้องทำ</h1>
          <p className="text-sm text-gray-500">จัดการงานของคุณให้เป็นระเบียบ</p>
        </div>
      </header>

      {/* Add card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-4">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') add()
            }}
            placeholder="เพิ่มงานใหม่..."
            className="flex-1 min-w-0 rounded-xl border border-gray-200 px-3 py-2.5 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-base"
          />
          <button
            onClick={add}
            disabled={!text.trim()}
            className="shrink-0 flex items-center gap-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:hover:bg-indigo-500 text-white font-medium px-4 transition-colors"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">เพิ่ม</span>
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Flag size={14} /> ความสำคัญ:
          </span>
          {ORDER.map((k) => (
            <button
              key={k}
              onClick={() => setPriority(k)}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                priority === k
                  ? PRIORITIES[k].active
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {PRIORITIES[k].label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex-1 text-sm py-2 rounded-lg font-medium transition-colors ${
              filter === f.key
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <ul className="space-y-2.5">
        {visible.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={toggle}
            onDelete={remove}
            onEdit={edit}
            onCyclePriority={cycle}
          />
        ))}
      </ul>
      {visible.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-10 text-center text-gray-400">
          {emptyMsg}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 px-1">
        <span className="text-sm text-gray-600">เหลือ {remaining} งาน</span>
        <button
          onClick={clearCompleted}
          disabled={completedCount === 0}
          className="text-sm text-red-500 hover:text-red-600 disabled:text-gray-300 disabled:cursor-not-allowed font-medium"
        >
          ล้างงานที่เสร็จแล้ว{completedCount > 0 ? ` (${completedCount})` : ''}
        </button>
      </div>
      <p className="text-xs text-gray-400 text-center mt-6">
        ดับเบิลคลิกที่ข้อความเพื่อแก้ไข • แตะป้ายความสำคัญเพื่อเปลี่ยนระดับ
      </p>
    </div>
  )
}
