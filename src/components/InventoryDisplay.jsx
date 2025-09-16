import ItemCard from './ItemCard.jsx'
import ItemAction from './ItemAction.jsx'

/**
 * Stateless display of inventory items
 */
export default function InventoryDisplay({ items, onDeleteItem }) {
  return (
    <section className="list">
      <h2 style={{margin: 0}}>Inventory</h2>
      {items.length === 0 && <div className="empty">No items yet. Add something above!</div>}

      {items.map((it) => (
        <div key={it.id} className="item">
          <div className="itemHeader">
            <div className="itemName">{it.name}</div>
            <div className="itemMeta">Qty: {it.quantity}</div>
          </div>

          <ItemCard name={it.name} quantity={it.quantity} purpose={it.purpose} />
          <ItemAction onDelete={() => onDeleteItem(it.id)} />
        </div>
      ))}
    </section>
  )
}
