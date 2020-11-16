import styled from "styled-components";
import { InputField } from '../styles';

export const CoordinateInputField = styled(InputField)`
    width: 156px;
`;

export const LatitudeInputField = styled(CoordinateInputField)`
    margin-left: 20px
`;

export const LongitudeInputField = styled(CoordinateInputField)`
    margin-left: 8px
`;