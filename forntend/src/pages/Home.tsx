import List from "../components/List/List"
import ProductItem from "../components/ProductItem/ProductItem"
import ProductModal from "../components/ProductModal/ProductModal"
import { Welcome } from "../components/Welcome/welcome"
import useFetchProducts from "../hooks/useFetchProducts"
import { useAuthStore } from "../store/logginStore"
import { useParams } from "react-router-dom"


const Home = () => {
    const { data, loading, error } = useFetchProducts()
    const { user } = useAuthStore()
    const { category } = useParams()

    if (error) {
        return <h1>{error}</h1>
    }

    const filteredData = category
        ? data?.filter(item => item.category === category)
        : data

    return loading ? <>Loading...</> : (
        <>
            {user && <Welcome name={user.name} />}
            {filteredData && <List data={filteredData} Item={ProductItem} />}
            <ProductModal />
        </>
    )
}

export default Home