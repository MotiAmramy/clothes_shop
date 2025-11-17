import { useEffect, useState } from "react"
import mock from "../mock/store.mock"

export interface ProductItemData {
    readonly description: string
    readonly image: string
    readonly price: number
    readonly title: string
    readonly id: number
}

export interface FetchResponse <T> {
    readonly data: T | null
    readonly error: string | null
    readonly loading: boolean
}

const useFetchProducts = () => {
    const [response, setResponse] = useState<FetchResponse<ReadonlyArray<ProductItemData>>>({
        data: null,
        error: null,
        loading: true
    })

    useEffect(() => {
        (async () => {
            try {
                // const res = await fetch('https://fakestoreapi.com/products')
                // const data = await res.json()
                setResponse({ data: mock, loading: false, error: null })
            } catch (e) {
                setResponse({ data: null, loading: false, error: `${e}`})
            }

        })()
    }, [])

    return response
}

export default useFetchProducts