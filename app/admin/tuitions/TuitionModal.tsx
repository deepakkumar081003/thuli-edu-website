'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function TuitionModal({ tuition, onClose, onSaved }: any) {
  const [title, setTitle] = useState(tuition?.title || '')
  const [classLevel, setClassLevel] = useState(tuition?.class_level || '')
  const [subject, setSubject] = useState(tuition?.subject || '')
  const [mode, setMode] = useState(tuition?.mode || '')
  const [timings, setTimings] = useState(tuition?.timings || '')
  const [fees, setFees] = useState(tuition?.fees || '')
  const [description, setDescription] = useState(tuition?.description || '')
  const [active, setActive] = useState(tuition?.is_active ?? true)

  async function handleSave() {
    if (!title) {
      alert('Title is required')
      return
    }

    const payload = {
      title,
      class_level: classLevel || null,
      subject: subject || null,
      mode: mode || null,
      timings: timings || null,
      fees: fees ? Number(fees) : null,
      description: description || null,
      is_active: active,
    }

    if (tuition?.id) {
      await supabaseBrowser
        .from('tuitions')
        .update(payload)
        .eq('id', tuition.id)
    } else {
      await supabaseBrowser.from('tuitions').insert(payload)
    }

    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 w-[400px] space-y-3">
        <h2 className="text-xl font-bold">
          {tuition ? 'Edit Tuition' : 'Add Tuition'}
        </h2>

        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Class Level" value={classLevel} onChange={e => setClassLevel(e.target.value)} />
        <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />

        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="">Select Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <input placeholder="Timings" value={timings} onChange={e => setTimings(e.target.value)} />
        <input placeholder="Fees" type="number" value={fees} onChange={e => setFees(e.target.value)} />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={active}
            onChange={e => setActive(e.target.checked)}
          />
          Active
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button className="bg-black text-white px-3 py-1" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
