import React from "react";
import styled from "styled-components";
import Colors from "../util/Colors";

const BreadcumText = styled.h3`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.4em;
  color: ${Colors.grey1};
  margin-bottom:30px;
`;

export type BreadProps = {
   text: any;
   title?: string | "";
};
export default function Breadcum({ text, title }: BreadProps) {
   return (
      <BreadcumText title={title}>
         {text}
      </BreadcumText>
   );
}
