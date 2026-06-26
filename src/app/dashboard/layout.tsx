import React from "react";
import { DashboardHeader } from "./components/header";

export default function DashboardLayoult({children}: {children: React.ReactNode}){
    return(
        <>
        <DashboardHeader/>
        {children}
        </>
    )
}