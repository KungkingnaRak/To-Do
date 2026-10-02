# Thai Todo (Vite + React + Tailwind)

แอปรายการสิ่งที่ต้องทำ ภาษาไทย — React 18, Vite 5, Tailwind CSS 3, lucide-react

## เริ่มใช้งาน

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # สร้างไฟล์ใน dist/
npm run preview  # ทดสอบไฟล์ build
```

ข้อมูลเก็บใน React state เท่านั้น (รีเฟรชแล้วรีเซ็ต)

## โครงสร้าง

- `src/App.jsx` — state และหน้าหลัก
- `src/components/TodoItem.jsx` — รายการงานแต่ละรายการ (แก้ไขแบบ inline)
- `src/constants.js` — ระดับความสำคัญและตัวกรอง
