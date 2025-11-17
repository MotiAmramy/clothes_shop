import List from "../components/List/List"
import ProductItem from "../components/ProductItem/ProductItem"
import useFetchProducts from "../hooks/useFetchProducts"

const Home = () => {
    const {data,loading, error} = useFetchProducts()

    if (error) {
        return <h1>{error}</h1>
    }

    return loading ? <>Loading...</> : (
        <>
        { data && <List data={data!} Item={ProductItem} /> }
        </>
    )
}

export default Home