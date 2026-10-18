"use client";

import { useState } from "react";

export default function CalendarPage() {
  const currentMonthName = "ตุลาคม 2026";

  const [selectedDate, setSelectedDate] = useState<number | null>(16);
  const [shiftType, setShiftType] = useState("เช้า");
  const [shifts, setShifts] = useState<{[key: number]: string}>({
    1: 'เช้า',
    2: 'บ่าย',
    3: 'ดึก'
  });

  const emptyDays = 3;
  const totalDays = 31;

  const handleSave = () => {
    if(selectedDate !== null){
      setShifts({ ...shifts, [selectedDate]: shiftType});
      alert(`บันทึกเวรวันที่ ${selectedDate} ตุลาคม 2026 เป็น "${shiftType}" เรียบร้อย!`);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Nurse Shift Calendar</h1>
          <p className="text-slate-600">คลิกที่วันที่ต้องการ เพื่อบันทึกหรือเปลี่ยนเวร</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">{currentMonthName}</h2>
              <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">โหมดปฏิทินส่วนตัว</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center font-semibold text-slate-400 text-sm mb-2">
              <div>จ.</div><div>อ.</div><div>พ.</div><div>พฤ.</div><div>ศ.</div><div>ส.</div><div>อา.</div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: emptyDays }).map((_, index) => (
                <div key={`empty-${index}`} className="h-20 bg-salte-50/50 rounded-xl"></div>
              ))}

              {Array.from({ length: totalDays }).map((_, index) => {
                const day = index + 1;
                const isSelected = selectedDate === day;
                const assignedShift = shifts[day];

                return (
                  <button key={day} onClick={() => setSelectedDate(day)} className={`h-20 p-2 rounded-xl border flex flex-col justify-between transition text-left relative ${isSelected ? 'border-blue-600 ring-2 ring-blue-500 bg-blue-50/30' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <span className={`text-sm font-bold ${isSelected ? 'text-blue-600' : 'text-slate-700'}`}>{day}</span>

                    {assignedShift && (
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium text-center truncate ${
                        assignedShift === 'เช้า' ? 'bg-amber-100 text-amber-800' :
                        assignedShift === 'บ่าย' ? 'bg-sky-100 text-sky-800' :
                        assignedShift === 'ดึก' ? 'bg-indigo-100 text-indigo-800' :
                        // assignedShift === 'OT' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {assignedShift}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-1 flex flex-col justify-between">
            <div className="text-lg font-bold text-slate-800 mb-4">
              <h2 className="text-lg font-bold text-slate-800 mb-4">จัดการเวร</h2>

              {selectedDate !== null ? (
                <div>
                  <div  className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-xl text-sm font-medium">
                    กำลังเลือกวันที่: <span className="font-bold">{selectedDate} ตุลาคม 2026</span>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-600 mb-2">เลือกเวร</label>
                    <div className="space-y-2">
                      {['เช้า', 'บ่าย', 'ดึก', 'หยุด'].map((type) => (
                        <label key={type} className={`flex items-center p-3 rounded-xl border cursor-pointer transition ${shiftType === type ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                          <input type="radio" name="shiftType" value={type} checked={shiftType === type} onChange={(e) => setShiftType(e.target.value)} className="mr-3 accent-blue-600" />
                          {type === 'เช้า' && 'เวรเช้า (08:00 - 16:00)'}
                          {type === 'บ่าย' && 'เวรบ่าย (16:00 - 00:00)'}
                          {type === 'ดึก' && 'เวรดึก (00:00 - 08:00)'}
                          {type === 'หยุด' && 'วันหยุด'}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400">กรุณาคลิกเลือกวันที่บนปฏิทิน</p>
              )}
            </div>

            {selectedDate !== null && (
              <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition shadow-md">บันทึกเวรวันที่ {selectedDate}</button>
            )}
          </div>

        </div>

      </div>
    </main>
  )
}
