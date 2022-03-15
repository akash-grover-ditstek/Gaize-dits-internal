import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import routePaths from "../config/routepaths.config";
import { localStorageService } from "../services";

const AccessDenied = () => {
   return <h1>Access Denied</h1>;
};

const DashboardRoute = ({ children }: { children: JSX.Element }) => {
   let location = useLocation();

   const isAuthenticated = localStorageService.isAuthenticated();
   const userDetail = localStorageService.getUserDetail();
   if (!isAuthenticated)
      return (<Navigate to={routePaths.LOGIN} state={{ from: location }} />) as any;
   else if (isAuthenticated && userDetail?.organization?.subscriptionId === "")
      return (<Navigate to={routePaths.STRIPE} state={{ from: location }} />) as any;

   return (
      <>
         <DashboardLayout>{children}</DashboardLayout>
      </>
   );
};

export default DashboardRoute;
