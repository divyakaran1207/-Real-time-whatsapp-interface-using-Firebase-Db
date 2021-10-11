import React,{useReducer, createContext,useContext} from "react";

// crating a context => which is where the data layer is.
export const StateContext = createContext();

//(the StateProvider here is the data layer)
export const StateProvider = ({reducer,initialState
    ,children}) => (
// Set up the data layer         
        <StateContext.Provider value={useReducer(reducer,initialState)}>
            {children}
        </StateContext.Provider>
    );

// allows us to pull data from the data layer 
export const useStateValue = ()=> useContext(StateContext);