import styled from "styled-components";

const LoaderContainer = styled.div`
   display: flex;
   align-items: center;
   height: 100%;
   justify-content: center;
   position: absolute;
   top: 0;
   left: 50%;
   transform: translateX(-50%);

   z-index: 2000;
`;
export default LoaderContainer;
