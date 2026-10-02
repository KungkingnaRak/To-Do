import { useEffect, useRef, useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { PRIORITIES } from '../constants'

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onCyclePriority }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef(null)
  const p = PRIORITIES[todo.priority]

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

  return (
    <li
      className={`relative flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-100 pl-4 pr-3 py-3 overflow-hidden ${
        todo.removing ? 'todo-out' : 'todo-in'
      }`}
    >
      <span className={`absolute left-0 top-0 bottom-0 w-1 ${p.bar}`} />

      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.done ? 'ทำเครื่องหมายว่ายังไม่เสร็จ' : 'ทำเครื่องหมายว่าเสร็จแล้ว'}
        className={`shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
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
      </div>

      <button
        onClick={() => onCyclePriority(todo.id)}
        title="แตะเพื่อเปลี่ยนความสำคัญ"
        className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full ring-1 ring-inset ${p.badge}`}
      >
        {p.label}
      </button>

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
