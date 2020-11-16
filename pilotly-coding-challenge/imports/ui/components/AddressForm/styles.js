import styled from "styled-components";

export const FormContainer = styled.div`
    border: 2px solid #56acf2;
    border-radius: 8px;
    padding: 20px;
    width: 440px;
`;

export const SubmitButton = styled.button`
    background: #56acf2;
    border: 1px solid #56acf2;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: block;
    margin: 8px 0;
    padding: 8px 16px;

    &:focus {
        outline: none;
    }
`;

export const InputField = styled.input`
    margin: 8px 16px;
    border: 2px solid #56acf2;
    border-radius: 4px;
    padding: 8px 12px;
    width: 100px;

    &:focus {
        border: 2px solid #00baa1;
        outline: none;
    }
`;

export const SearchByTypeSelect = styled.select`
    padding: 4px;
    border: 2px solid #56acf2;
    &:focus {
        outline: none;
    }
`;

export const DistanceMetricSelect = styled.select`
    background-color: #56acf2;
    border: 2px solid #56acf2;
    color: #fff;
    padding: 7px 6px;
    
    &:focus {
        outline: none;
    }
`;

export const DistanceField = styled(InputField)`
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
    margin-right: 0px;
`;