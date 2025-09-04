import './App.css'
import Header from './components/header/Header'
import SearchBar from './components/searchBar/SearchBar'
import ModelCard from './components/modelCard/ModelCard'

function App() {
  return (
    <>
      <Header />
      <SearchBar />

      <div className="modelos">
        <ModelCard
          name="Peugeot 208"
          price="$35.000.000"
          imageUrl="https://www.carone.com.ar/wp-content/uploads/2021/12/1__8_-removebg-preview.png"
        />
        <ModelCard
          name="Jeep Commander"
          price="$60.000.000"
          imageUrl="https://www.carone.com.ar/wp-content/uploads/2025/07/LIMITED-scaled.png"
        />
        <ModelCard
          name="Fiat Pulse"
          price="$34.500.000"
          imageUrl="https://www.carone.com.ar/wp-content/uploads/2022/05/Pulse_Impetus_0046-2-e1652049876226.png"
        />
      </div>
    </>
  )
}

export default App
