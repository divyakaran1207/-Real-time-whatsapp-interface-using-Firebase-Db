// initial state of the data layer
export const initialState = {
    user:null,
}

// pushing info into the data layer (like during sign in we dispatch an action which pushes the user into data layer)
export const actionTypes = {
    SET_USER:'SET_USER',
}

// listening to the dispatch action and making changes to the data layer(...state means to keep what the data layer already has and the next line updates the user)
const reducer = (state,action)=> {
    console.log(action);
    switch(action.type){
        case actionTypes.SET_USER:
            return{
                ...state,
                user: action.user,
            };
        default:
            return state;    
    }

};

export default reducer;