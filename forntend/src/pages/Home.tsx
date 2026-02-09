import List from "../components/ui/List/List"
import ProductItem from "../components/products/ProductItem/ProductItem"
import ProductModal from "../components/products/ProductModal/ProductModal"
import useFetchProducts from "../hooks/useFetchProducts"
import { useParams } from "react-router-dom"



/**
 * Home Page
 * 
 * Displays the product catalog.
 * Supports filtering by category via URL parameters.
 * Shows welcome message for logged-in users.
 */
const Home = () => {
    const { data, loading, error } = useFetchProducts()
    const { category } = useParams()

    if (error) {
        return <h1>{error}</h1>
    }

    const filteredData = category
        ? data?.filter(item => item.category === category)
        : data

    return loading ? <>Loading...</> : (
        <>
            {filteredData && <List data={filteredData} Item={ProductItem} />}
            <ProductModal />
        </>
    )
}

export default Home