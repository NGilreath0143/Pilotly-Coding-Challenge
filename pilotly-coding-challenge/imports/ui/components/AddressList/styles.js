import styled from "styled-components";

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin: 24px 0;
    & th {
        background-color: #56acf2;
        color: #fff;
        text-align:left;
        padding: 12px 8px;
    }

    & tr:nth-child(even){
        background-color: #f2f2f2;
    }
    
    & tr:hover {
        background-color: #ddd;
    }

    & td {
        padding: 8px;
    }
`;