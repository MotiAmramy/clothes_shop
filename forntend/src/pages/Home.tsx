import List from "../components/List/List"
import ProductItem from "../components/ProductItem/ProductItem"
import useFetchProducts from "../hooks/useFetchProducts"
import { useAuthStore } from "../store/logginStore"

const Home = () => {
    const {data,loading, error} = useFetchProducts()
    const { user } = useAuthStore()
    if (error) {
        return <h1>{error}</h1>
    }
    
    return loading ? <>Loading...</> : (
        <>
        {user && <h2>hello {user.name}</h2>}
        { data && <List data={data!} Item={ProductItem} /> }
        </>
    )
}

export default Home