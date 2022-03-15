import React from "react";
import styled from "styled-components";
import colors from "./Colors";
// import Icon from './Icon';
// import { IconEnum as Icons } from './Icons';

interface IError {
   error: string;
   margin?: string;
   position?: string;
   textAlign?: string;
}

interface IErrorContainer {
   margin?: string;
   textAlign?: string;
   position?: string;
   error?: string;
}
const ErrorContainer: React.FunctionComponent<IErrorContainer> = styled.div<IErrorContainer>`
   color: ${colors.red};
   margin: ${(props) => props.margin || "0px"};
   text-align: ${(props) => props.textAlign || "center"};
   align-items: center;
   font-size: 14px;
   position: ${(props) => props.position || "absolute"};
   margin-left: auto;
   margin-right: auto;
   left: 0;
   right: 0;
`;

export default function Error({
   error,
   margin,
   position,
   textAlign,
}: IError): any {
   return (
      <ErrorContainer
         margin={margin}
         position={position}
         textAlign={textAlign}
      >{error}</ErrorContainer>
   );
}
