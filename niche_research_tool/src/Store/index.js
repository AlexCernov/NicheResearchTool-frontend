import React, {useState} from 'react'
import UserContext from './context/user.context'
import { auth } from '../firebase/firebase.utils'
import {signInWithEmail, signInWithGoogle, signUpWithEmail} from '../firebase/firebase.utils'




 function Store (props) {


    const [action,setAction] = useState(false)
  

    const logout = () => {
        auth.signOut()
    }



    const loginWithEmail = async (user,password) => {
        setAction(true)
        signInWithEmail(user, password).then(u => {
            loginUser(u.user.uid)
          }).catch( error => console.log(error));
        setAction(false)
          
    }
    
    const loginWithGoogle = async () => {
        setAction(true)
        signInWithGoogle().then(u =>{
            if(u.additionalUserInfo.isNewUser === true)
            {
                let names = u.user.displayName.split(" ")
                if(names.length === 2)
                {
                    registerUser(u.user.uid,names[0],names[1],u.user.email,u.user.photoURL)
                    console.log("From login google")
                    console.log(store)
                }
            }
            else
            {
                loginUser(u.user.uid)
            }
        })
        setAction(false)
    }
    
   
    const loginUser = uid => {
      fetch('https://localhost:44346/api/Users/' + uid).then( u => 
         u.json()).then( u => setStore(prev => ({...prev, dbUser: u}))
        ).catch(e => console.log(e))
    }


    const registerUser = async (uid,firstName,lastName,email,photoURL) =>{
         return await fetch('https://localhost:44346/api/Users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                Id: uid,
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Photo: photoURL,
                Role: { Id: 1, Type: "Non-premium"}
                })
            }
            ).then( u => u.json()).then( u =>
                setStore(prev => ({...prev, dbUser : u }))
            )
        }
    
    
    const registerWithEmailAndPassword = async (firstName,lastName,email,password) => {
        console.log(firstName,lastName,email,password)
        let guser
        setAction(true)

        await signUpWithEmail(email, password).then( googleUser => 
            {
              guser=googleUser
            }
            ).catch( e => console.log(e))
        await registerUser(guser.user.uid,firstName,lastName,email,guser.user.photoURL)
        setAction(false)

    }

    const [store,setStore] = useState({
        user : {},
        isAuthenticated : false,
        dbUser : undefined,
        loginEmail: loginWithEmail,
        loginGoogle: loginWithGoogle,
        registerWithEmail: registerWithEmailAndPassword,
        signOut: logout,

    })

    


    React.useEffect( () => {
        auth.onAuthStateChanged(t => {
            if(t !== null)
            {
                store.dbUser === undefined && loginUser(t.uid)                    
                setStore(prev => ({...prev, user: t, isAuthenticated: true}))
                
            }
            else
            {
                setStore(prev => ({...prev, user: {}, isAuthenticated: false, dbUser: undefined}))

            }
            
          })
    }, [action,store.dbUser])
    
        return (
            <UserContext.Provider
            value={store}
            >
                {props.children}
            </UserContext.Provider>
            )
    
}
export default Store

