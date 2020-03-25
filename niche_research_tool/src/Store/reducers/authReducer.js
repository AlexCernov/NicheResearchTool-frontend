export const firebaseAuth = (state, action) => {
    switch(action.type){
        case "SIGN_IN":
            return {...state, user: action.payload}
        case "LOG_IN":
        return {...state, user: action.payload}
        case "LOG_OUT":
        return {...state, user: action.payload}               
        default:
        return state
    }
}