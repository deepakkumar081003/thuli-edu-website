'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function TuitionModal({
  tuition,
  onClose,
  onSaved,
}: any) {
  const isEdit = !!tuition

  const [title, setTitle] = useState(tuition?.title || '')
  const [classLevel, setClassLevel] = useState(tuition?.class_level || '')
  const [subject, setSubject] = useState(tuition?.subject || '')
  const [mode, setMode] = useState(tuition?.mode || '')
  const [timings, setTimings] = useState(tuition?.timings || '')
  const [fees, setFees] = useState(tuition?.fees || '')
  const [description, setDescription] = useState(tuition?.description || '')
  const [active, setActive] = useState(tuition?.is_active ?? true)

  const [saving, setSaving] = useState(false)

  async function handleSave(e: any) {
    e.preventDefault()
    setSaving(true)

    if (!title) {
      alert('Title is required')
      setSaving(false)
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

    try {
      if (isEdit) {
        await supabaseBrowser
          .from('tuitions')
          .update(payload)
          .eq('id', tuition.id)
      } else {
        await supabaseBrowser.from('tuitions').insert(payload)
      }

      onSaved()
      onClose()
    } catch (err: any) {
      alert(err.message)
    }

    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">

      <form
        onSubmit={handleSave}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-6"
      >
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-purple-900">
            {isEdit ? 'Edit Tuition' : 'Add Tuition'}
          </h2>
          <p className="text-yellow-400 mt-1">
            Enter tuition batch details
          </p>
        </div>

        {/* Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <input
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Class Level (eg: Class 10)"
            value={classLevel}
            onChange={e => setClassLevel(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />

          <select
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            value={mode}
            onChange={e => setMode(e.target.value)}
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <input
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Timings (eg: Mon–Fri 5–6 PM)"
            value={timings}
            onChange={e => setTimings(e.target.value)}
          />

          <input
            type="number"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Fees (₹)"
            value={fees}
            onChange={e => setFees(e.target.value)}
          />
        </div>

        {/* Description */}
        <textarea
          className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
          rows={4}
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        {/* Active */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-medium text-purple-900">
            <input
              type="checkbox"
              checked={active}
              onChange={e => setActive(e.target.checked)}
            />
            Active
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Tuition'}
          </button>
        </div>
      </form>
    </div>
  )
}
