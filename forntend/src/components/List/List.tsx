import { styled } from "styled-components";

const StyledList = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem;
`

interface ListProps <T> {
    readonly data: ReadonlyArray<T>
    readonly Item: React.ComponentType<{ data: T }>
}


const List = <T,>({ data, Item }: ListProps<T>) => (
    <StyledList> 
        { data.map((item, i) => <Item data={item}  key={`${item}${i}`}/> )}
    </StyledList>
)

export default List