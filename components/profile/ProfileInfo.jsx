import { View, Text, Image } from 'react-native'
import React from 'react'

const ProfileInfo = ({usermail,username}) => {
  return (
    <View style={{padding: 10,marginTop: 10,flex:1, justifyContent: "center", alignItems: "center"}}>
        <Image source={require('../../assets/images/logo.png')} style={{width: 150, height: 150, borderRadius: 50}} resizeMethod='contain' />
      <Text style={{fontSize: 20, fontFamily: "outfit-bold"}}>{username}</Text>
      <Text style={{fontSize: 16, fontFamily: "outfit", color: "gray"}}>{usermail}</Text>
    </View>
  )
}

export default ProfileInfo