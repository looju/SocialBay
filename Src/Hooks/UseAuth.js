import { View, Text } from 'react-native'
import React,{createContext} from 'react'



export const AuthContext=createContext({
    
})

export const AuthProvider = ({children}) => {
  return (
    <View>
      {children}
    </View>
  )
}
