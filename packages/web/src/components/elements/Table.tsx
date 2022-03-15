import styled from "styled-components";
import Colors from "../../util/Colors";

export const TableScroll = styled.div`
width: 100%;
height: calc(100vh - 255px);
overflow: auto;
position: relative;
}
`;
export const TableContainer = styled.table`
   width: 100%;
   padding: 10px;
   box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
   @media screen and (max-width: 991px) {
      min-width: 500px;
   }
   & svg{
      font-size:18px!important;
   }
`;
export const TableItem = styled.thead`
   position: sticky;
    top: 0;
   background-color: ${Colors.blue};
   color:${Colors.white};
`;

export const HeaderText = styled.th`
   text-align: left;
   padding: 15px 10px;
   font-weight: 600;
   @media screen and (max-width: 991px) {
      font-size: 14px;
   }
`;

export const TableData = styled.tr``;
export const TableBody = styled.tbody``;


export const TableDataItem = styled.td`
   line-height: 20px;
   height: 25px;
   border-top: 1px solid ${Colors.borderGrey};
   padding: 15px 10px;
   cursor: ${(props) => (props.onClick ? "pointer" : "unset")};
   &.noRecord{
      text-align: center;
   }
   @media screen and (max-width: 991px) {
      font-size: 14px;
      color: ${Colors.grey};
   }
   &: hover {
      & svg {
         color: ${(props) => (props.onClick ? Colors.blue : "")}!important;
      }
      color: ${(props) => (props.onClick ? Colors.blue : "")};
   }
   & svg {
      margin-right: 8px;
   }
`;

export const HeadText = styled.div``;