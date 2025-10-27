import './App.css'
import Header from './components/header/Header'
import SearchBar from './components/searchBar/SearchBar'
import ModelCard from './components/modelCard/ModelCard'
import { useEffect, useState } from 'react'
import type { PostResponseDTO } from './types'
import Api from './services/Api'

function App() {
  const [posts, setPosts] = useState<PostResponseDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Api.searchPosts({ page: 0, size: 10 })
        setPosts(response.data.content || [])
      } catch (error) {
        console.error('Error cargando publicaciones:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <p>Cargando publicaciones...</p>
  
  return (
    <>
      <Header />
      <SearchBar />

      <div className="modelos">
        {posts.map((post) => (
          <ModelCard
            key={post.id}
            id={post.id}
            name={`${post.make} ${post.model}`}
            price={`$${post.price.toLocaleString()}`}
            imageUrl={`/images/${post.image}`}
            dealer={{ id: post.dealerId, name: post.dealer }}
          />
        ))}
      </div>
    </>
  )
}

export default App
