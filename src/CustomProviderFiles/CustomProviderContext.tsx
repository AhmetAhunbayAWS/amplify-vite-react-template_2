import { createContext } from "react";
import CustomProviderList from "./CustomProvider";
import { CustomProvidersDefinition } from "./DefineCustomProviders";


export const CustomProviderContext = createContext<CustomProviderList>(CustomProvidersDefinition)
