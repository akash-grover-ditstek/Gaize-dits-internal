/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import moment from "moment-timezone";
import SideNavigation from "../SideNavigation";
import { apiService } from "../../services";

// import { UserContext } from '../../context/UserContext';
// import Loader from '../Loader';
// import * as Intercom from '../../util/Intercom';
// import { AppContext } from '../../context/AppContext';
import Header from "../Header";
import { Toaster } from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { setUser } from "../../redux/user/user.actions";
import LoaderContainer from "../elements/LoaderContainer";
import Loader from "../elements/Loader";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import routePaths from "../../config/routepaths.config";
import { API_URLS } from "../../config/api.config";

const AdminLayoutContainer = styled.div`
   height: 100vh;
   width: 100%;
   overflow: hidden;
`;

const MainContent = styled.div`
   overflow:auto;
   width: calc(100% - 80px);
    margin-left: auto;
    height: calc(100% - 60px);
    margin-top: 60px;
    background: #f9f9f9;
   @media screen and (max-width: 991px) {
      width: 100%;
      overflow: auto;
      height: calc(100% - 75px);
      margin-top: 75px;
   }
`;
const ContentWrapper = styled.div`
   padding: 15px;
   height: 100%;
   width: auto;
`;

const DashboardLayout = ({ children }: { children: JSX.Element }) => {
   // const { user, setUser } = useContext<any>(UserContext);

   const [isLoading, setIsLoading] = useState(false);

   const navigate = useNavigate();

   // useEffect(() => {
   //    apiService.get(
   //       API_URLS.GETUSERDATA,
   //       (response) => {
   //          if (response?.data?.success) {
   //             return navigate(routePaths.LOGIN);
   //          }
   //          setUser((oldUser) => response?.data as any);
   //       },
   //       () => {
   //          setIsLoading(false);
   //       }
   //    );
   // }, [setUser, navigate]);

   return (
      <AdminLayoutContainer>
         <Toaster
            toastOptions={{
               // Define default options
               className: "",
               duration: 2000,
               style: {
                  background: "#363636",
                  color: "#fff",
                  fontSize: "14px",
               },
               success: {
                  style: {
                     background: "green",
                  },
               },
               error: {
                  style: {
                     background: "red",
                  },
               },
            }}
            position="bottom-right"
         />
         <Header />
         <SideNavigation />
         <MainContent>
            {isLoading ? (
               <LoaderContainer>
                  <Loader />
               </LoaderContainer>
            ) : (
               <ContentWrapper>{children}</ContentWrapper>
            )}
         </MainContent>
      </AdminLayoutContainer>
   );
};

export default DashboardLayout;
