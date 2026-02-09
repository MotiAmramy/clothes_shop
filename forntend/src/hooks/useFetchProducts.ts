import { useEffect, useState } from "react"
import { fetchProducts } from "../api/productApi"

export interface ProductItemData {
    readonly description: string
    readonly image: string
    readonly price: number
    readonly title: string
    readonly _id: string
    readonly category: string
}

export interface FetchResponse<T> {
    readonly data: T | null
    readonly error: string | null
    readonly loading: boolean
}


/**
 * Custom hook to fetch the list of products from the API.
 * Returns the data, loading state, and any error encountered.
 */
const useFetchProducts = () => {
    const [response, setResponse] = useState<FetchResponse<ReadonlyArray<ProductItemData>>>({
        data: null,
        error: null,
        loading: true
    })

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchProducts()
                setResponse({ data: data, loading: false, error: null })
            } catch (e: any) {
                setResponse({ data: null, loading: false, error: e.message || 'Failed to fetch products' })
            }

        })()
    }, [])

    return response
}

export default useFetchProducts