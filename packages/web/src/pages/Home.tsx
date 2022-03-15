import React from "react";
import Breadcum from "../components/Breadcum";
import styled from "styled-components";
import Colors from "../util/Colors";


const HomeHeader = styled.h3`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  color: ${Colors.grey1};
  margin-bottom:30px;
`;
const Home = () => {
   return (
      <>
         <Breadcum text="Home" title="Gaize Gives you Video Evidence of Impairment"></Breadcum>
         <HomeHeader>
            <p >Gaize Gives you Video Evidence of Impairment</p>
         </HomeHeader>
         <p>Click the Videos link to the left to view videos that you have collected
            and uploaded from your headsets.</p>
      </>
   );
};
export default Home;
