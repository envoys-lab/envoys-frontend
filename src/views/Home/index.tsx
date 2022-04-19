import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()

  router.push('/swap')

  return null
}

export default Home
