import { useRef, useState, useEffect } from 'react'

/**
 * Controlled form with validation-on-submit.
 * - All fields required
 * - Highlights missing/invalid fields
 * - Clears and refocuses on success
 */
export default function ItemForm({ onAddItem }) {
  const [form, setForm] = useState({ name: '', quantity: '', purpose: '' })
  const [errors, setErrors] = useState({})
  const nameRef = useRef(null)

  useEffect(() => {
    // Focus first field on mount
    try { nameRef.current?.focus() } catch {}
  }, [])

  function updateField(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    const qty = Number(form.quantity)
    if (!form.quantity.toString().trim()) errs.quantity = 'Required'
    else if (!Number.isInteger(qty) || qty < 1) errs.quantity = 'Must be a whole number ≥ 1'
    if (!form.purpose.trim()) errs.purpose = 'Required'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault() // we’ll do custom validation
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length > 0) {
      // focus first invalid field
      if (v.name) nameRef.current?.focus()
      return
    }

    const newItem = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: form.name.trim(),
      quantity: Number(form.quantity),
      purpose: form.purpose.trim()
    }
    onAddItem(newItem)

    // Reset + refocus
    setForm({ name: '', quantity: '', purpose: '' })
    setErrors({})
    try { nameRef.current?.focus() } catch {}
  }

  const nameErr = !!errors.name
  const qtyErr = !!errors.quantity
  const purposeErr = !!errors.purpose

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2 style={{margin: '0 0 4px'}}>Add Inventory Item</h2>
      <p className="muted" style={{margin: 0}}>All fields are required.</p>

      <div className="row grid-2">
        <div>
          <label htmlFor="name">Item name</label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            placeholder="e.g., Titanium Hull Plate"
            value={form.name}
            onChange={updateField}
            className={nameErr ? 'errorField' : ''}
            aria-invalid={nameErr || undefined}
            aria-describedby={nameErr ? 'err-name' : undefined}
          />
          {nameErr && <div id="err-name" className="errorText">{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            step="1"
            placeholder="e.g., 4"
            value={form.quantity}
            onChange={updateField}
            className={qtyErr ? 'errorField' : ''}
            aria-invalid={qtyErr || undefined}
            aria-describedby={qtyErr ? 'err-qty' : undefined}
          />
          {qtyErr && <div id="err-qty" className="errorText">{errors.quantity}</div>}
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="purpose">Purpose</label>
          <textarea
            id="purpose"
            name="purpose"
            rows="3"
            placeholder="Why is this needed on the spacecraft?"
            value={form.purpose}
            onChange={updateField}
            className={purposeErr ? 'errorField' : ''}
            aria-invalid={purposeErr || undefined}
            aria-describedby={purposeErr ? 'err-purpose' : undefined}
          />
          {purposeErr && <div id="err-purpose" className="errorText">{errors.purpose}</div>}
        </div>
      </div>

      <div className="actions">
        <button type="submit" className="btn btn-primary">Add item</button>
        <button
          type="button"
          className="btn"
          onClick={() => { setForm({ name: '', quantity: '', purpose: '' }); setErrors({}); nameRef.current?.focus() }}
        >
          Clear
        </button>
      </div>
    </form>
  )
}
