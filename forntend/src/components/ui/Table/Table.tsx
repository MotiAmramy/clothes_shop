import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Ensure table doesn't get too squashed on small screens */

  thead {
    background-color: #f8f9fa;
    border-bottom: 2px solid #e9ecef;
  }

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #495057;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
  }

  tbody tr {
    border-bottom: 1px solid #e9ecef;
    transition: background-color 0.2s;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f1f3f5;
    }
  }

  td {
    padding: 1rem;
    color: #212529;
    vertical-align: middle;
  }
`;

interface TableProps {
    headers: string[];
    children: React.ReactNode;
}

const Table = ({ headers, children }: TableProps) => {
    return (
        <TableContainer>
            <StyledTable>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </StyledTable>
        </TableContainer>
    );
};

export default Table;
