import SpacecraftBuilder from './components/SpacecraftBuilder.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Spacecraft Builder 🛠️</h1>
        <p className="muted">
          Add items to your spacecraft inventory. Validate inputs. Delete items. Practice controlled forms.
        </p>
      </header>

      <SpacecraftBuilder />

      <footer className="footer">
        Practice: <code>useState</code> + <code>controlled inputs</code> + callbacks
      </footer>
    </div>
  )
}
