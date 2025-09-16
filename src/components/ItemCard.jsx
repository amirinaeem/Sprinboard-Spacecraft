/**
 * Presentational: show details for one item
 */
export default function ItemCard({ name, quantity, purpose }) {
  return (
    <div className="itemBody">
      <div className="itemPurpose">{purpose}</div>
    </div>
  )
}
