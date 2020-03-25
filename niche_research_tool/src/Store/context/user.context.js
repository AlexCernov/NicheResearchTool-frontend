import React from 'react'

export default React.createContext({
    user : {},
    isAuthenticated : false,
    dbUser : undefined,
    loginEmail: {},
    loginGoogle: {},
    signOut: {},
})