"use client"

import { ReactNode, createContext, useContext } from "react";
import { CeramicClient } from "@ceramicnetwork/http-client"
import { ComposeClient } from "@composedb/client";
import { RuntimeCompositeDefinition } from "@composedb/types";

import { definition } from "../__generated__/definition.js";

/**
 * Configure ceramic Client & create context.
 */
const ceramic = new CeramicClient("http://localhost:7007");

const composeClient = new ComposeClient({
  ceramic: "http://localhost:7007",
  // cast our definition as a RuntimeCompositeDefinition
  definition: definition as RuntimeCompositeDefinition,
});

export const CeramicContext = createContext({ceramic, composeClient});

export const CeramicContextProvider = ({ children }: {children: ReactNode}) => {
  return (
    <CeramicContext.Provider value={{ceramic, composeClient}}>
      {children}
    </CeramicContext.Provider>
  );
};

/**
 * Provide access to the Ceramic & Compose clients.
 * @example const { ceramic, compose } = useCeramicContext()
 * @returns CeramicClient
 */
export const useCeramicContext = () => useContext(CeramicContext);