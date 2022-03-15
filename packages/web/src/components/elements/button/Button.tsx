import React from "react";
// import { darken } from "polished";
import styled from "styled-components";
import colors from "../../../util/Colors";
import Loader, { LoaderSizes } from "../Loader";
import { IButtonContainer, IButton } from "./IButton";

const ButtonContainer: React.FunctionComponent<IButtonContainer> = styled.button<IButtonContainer>`
   -webkit-appearance: none;
   cursor: pointer;
   border: 1px solid ${(props) => props.background || colors.blue};
   border-radius: 5px;
   display: flex;
   justify-content: center;
   align-items: center;
   background: ${(props) => props.background || colors.blue};
   padding: 10px 35px};
   min-height: ${(props) => props.minHeight || null};
   min-width: ${(props) => props.minWidth || null};
   margin: 18px 0 10px;
   color: ${colors.white};
   font-size: 1rem;
   transition: all 0.3s;
   height: ${(props) => props.height || "40px"};
   font-weight: 300;
   display: flex;
   align-items: center;
   justify-content: center;

   &:hover {
      background: ${colors.white};
      color: ${(props) => props.background || colors.blue};
      .lds-ring div{
         border-color: #2491eb transparent transparent transparent;
      }
   }

   @media screen and (max-width: 991px) {
      height: ${(props) => props.height || "35px"};
      font-size: 12px;
      width: ${(props) => props.width || "70px"};
   }

   @media screen and (max-width: 450px) {
      width: ${(props) => props.xswidth || null};
   }
`;

export default function Button({
   text,
   onClick,
   margin,
   type,
   width,
   loading,
   background,
   height,
   name,
   value,
   disabled,
   xswidth,
   padding,
   minWidth,
   minHeight,
}: IButton) {
   return (
      <ButtonContainer
         background={background}
         type={type}
         onClick={onClick}
         margin={margin}
         width={width}
         xswidth={xswidth || ""}
         height={height}
         name={name}
         value={value}
         disabled={disabled || false}
         padding={padding}
         minWidth={minWidth}
         minHeight={minHeight}
      >
         {/* {loading ? text : text.trim()} */}
         {loading ? (
            <Loader color={colors.white} size={LoaderSizes.VerySmall} />
         ) : (
            text
         )}
      </ButtonContainer>
   );
}
