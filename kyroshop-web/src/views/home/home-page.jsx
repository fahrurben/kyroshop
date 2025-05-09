import useAuth from '../../hooks/use-auth.js'

function Home() {
  useAuth()

  return (
    <div>Home</div>
  )
}

export default Home