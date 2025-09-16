/**
 * Delete action button; receives callback from parent
 */
export default function ItemAction({ onDelete }) {
  return (
    <div className="actions" style={{justifyContent: 'flex-end'}}>
      <button type="button" className="btn deleteBtn" onClick={onDelete} aria-label="Delete item">
        Delete
      </button>
    </div>
  )
}
