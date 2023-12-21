import {useState , createContext, Children, useContext} from "react"

const AuthContext = createContext(null)

export const AuthProvider =({Children})=>{
  const [userMob, setUserMob] = useState(null)

  const login =(userMob)=>{
    setUserMob(userMob)
  }
  const logout =()=>{
    setUserMob(null)
  }

  return (
    <AuthContext.Provider value={{userMob,login,logout}}>
         {Children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=>{
    return useContext(AuthContext)
}