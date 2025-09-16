import { useState, useCallback } from 'react'
import ItemForm from './ItemForm.jsx'
import InventoryDisplay from './InventoryDisplay.jsx'

/**
 * SpacecraftBuilder: owns the inventory state
 * - addItem: provided to ItemForm
 * - deleteItem: provided (via InventoryDisplay) to ItemAction
 */
export default function SpacecraftBuilder() {
  const [inventory, setInventory] = useState([])

  const addItem = useCallback((item) => {
    setInventory((prev) => [{ ...item }, ...prev])
  }, [])

  const deleteItem = useCallback((id) => {
    setInventory((prev) => prev.filter((it) => it.id !== id))
  }, [])

  return (
    <section className="container">
      <div className="panel">
        <ItemForm onAddItem={addItem} />
      </div>

      <div className="panel">
        <InventoryDisplay items={inventory} onDeleteItem={deleteItem} />
      </div>
    </section>
  )
}
