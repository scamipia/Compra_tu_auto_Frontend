import './SearchBar.css'

export default function SearchBar() {
  return (
    <div className="busqueda">
      <input type="text" placeholder="Buscar por palabra clave..." />
      <div className="filtros">
        <select>
          <option value="">Marca</option>
          <option value="Toyota">Toyota</option>
          <option value="Ford">Ford</option>
          <option value="Chevrolet">Chevrolet</option>
        </select>
        <select>
          <option value="">Rango de precio</option>
          <option value="0-50000">$0 - $50,000</option>
          <option value="50001-100000">$50,001 - $100,000</option>
          <option value="100001-200000">$100,001 - $200,000</option>
        </select>
      </div>
    </div>
  )
}
