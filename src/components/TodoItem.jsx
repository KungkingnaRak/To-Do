import { useEffect, useRef, useState } from 'react'
import { CalendarPlus, CalendarDays, Check, Trash2, X } from 'lucide-react'
import { CATEGORIES, PRIORITIES } from '../constants'
import { dueStatus, formatDue } from '../utils/date'

const DUE_STYLES = {
  overdue: 'bg-red-50 text-red-700 ring-red-200',
  today: 'bg-yellow-50 text-yellow-800 ring-yellow-300',
  upcoming: 'bg-gray-50 text-gray-600 ring-gray-200',
  none: 'bg-gray-50 text-gray-400 ring-gray-200',
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onCyclePriority,
  onCycleCategory,
  onSetDue,
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef(null)
  const p = PRIORITIES[todo.priority]
  const cat = CATEGORIES[todo.category]
  const status = dueStatus(todo)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const save = () => {
    const t = draft.trim()
    if (t) onEdit(todo.id, t)
    else setDraft(todo.text)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(todo.text)
    setEditing(false)
  }

  const dueLabel = todo.due
    ? status === 'overdue'
      ? `เลยกำหนด ${formatDue(todo.due)}`
      : status === 'today'
      ? 'ครบกำหนดวันนี้'
      : formatDue(todo.due)
    : 'กำหนดวัน'

  return (
    <li
      className={`relative flex items-start gap-3 bg-white rounded-xl shadow-sm border border-gray-100 pl-4 pr-3 py-3 overflow-hidden ${
        todo.removing ? 'todo-out' : 'todo-in'
      }`}
    >
      <span className={`absolute left-0 top-0 bottom-0 w-1 ${p.bar}`} />

      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.done ? 'ทำเครื่องหมายว่ายังไม่เสร็จ' : 'ทำเครื่องหมายว่าเสร็จแล้ว'}
        className={`shrink-0 mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
          todo.done
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-gray-300 hover:border-indigo-400 text-transparent'
        }`}
      >
        <Check size={14} />
      </button>

      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save()
              if (e.key === 'Escape') cancel()
            }}
            className="w-full rounded-md border border-indigo-300 px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-200 text-base"
          />
        ) : (
          <span
            onDoubleClick={() => {
              setDraft(todo.text)
              setEditing(true)
            }}
            title="ดับเบิลคลิกเพื่อแก้ไข"
            className={`block break-words cursor-text select-none ${
              todo.done ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {todo.text}
          </span>
        )}

        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <button
            onClick={() => onCycleCategory(todo.id)}
            title="แตะเพื่อเปลี่ยนหมวดหมู่"
            className={`text-xs font-medium px-2 py-1 rounded-full ${cat.tag}`}
          >
            {cat.label}
          </button>

          <button
            onClick={() => onCyclePriority(todo.id)}
            title="แตะเพื่อเปลี่ยนความสำคัญ"
            className={`text-xs font-medium px-2 py-1 rounded-full ring-1 ring-inset ${p.badge}`}
          >
            {p.label}
          </button>

          {/* Due date: badge with a transparent date input on top */}
          <span className="relative inline-flex">
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ring-1 ring-inset ${
                DUE_STYLES[status || (todo.due ? 'upcoming' : 'none')]
              }`}
            >
              {todo.due ? <CalendarDays size={12} /> : <CalendarPlus size={12} />}
              {dueLabel}
            </span>
            <input
              type="date"
              value={todo.due || ''}
              onChange={(e) => onSetDue(todo.id, e.target.value)}
              onClick={(e) => {
                try {
                  e.currentTarget.showPicker()
                } catch {
                  /* browser without showPicker: native behaviour */
                }
              }}
              aria-label="เลือกวันครบกำหนด"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </span>
          {todo.due && (
            <button
              onClick={() => onSetDue(todo.id, '')}
              aria-label="ล้างวันครบกำหนด"
              className="p-0.5 rounded-full text-gray-400 hover:text-red-500"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        aria-label="ลบ"
        className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </li>
  )
}
