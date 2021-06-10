import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ApiCaller from './api/ApiCaller';
import { Button, TextInput  } from 'react-native-paper';

export default function App() {
  // variables
  const [text, setText] = useState<string>("");
  const [data,setData] = useState<any>();
  // llamada a la api
  var apiCaller = new ApiCaller();
  // List activities
  const onListButtonPress = async ()=>{
    const tmp = await apiCaller.call('/activities', 'GET');
    setData(tmp); 
  }
  const onViewButtonPress = async (id:string)=>{
    const tmp = await apiCaller.call('/activities/'+id, 'GET');
    console.log('view data: \n Id:', id, '\nObject', tmp)
    setData(tmp); 
  }
  const onCreateButtonPress = async (id:string)=>{
    const tmp = await apiCaller.call('/activities/'+id, 'GET');
    setData(tmp); 
  }
  const onDeleteButtonPress = async (id:string) => {

    const tmp = await apiCaller.call('/activities/'+id,'DELETE');
  }
  
  // fin llamada a la api
  return (
    <View style={styles.container}>
      <Text style={{flex:1, marginTop:'5%', marginBottom:20, alignContent:'flex-start', fontSize:30, fontWeight:'700'}}>CRUD APP CLICK THE BUTTONS!</Text>
      <View style={{flex:11}}>
        <View style={{flex:2, flexDirection:'column', borderColor:'red'}}>
          <View style={{flex:1, flexDirection:'column'}}>
            {
              data!=undefined?(data.length>1)?
              data?.map((element:any, index:number) =>{
                  return(
                    <View key={index}>
                      <Text style={{fontWeight:'700'}}>_id: </Text>
                      <Text>{element?._id}</Text>
                      <Text style={{fontWeight:'700'}}>_name: </Text>
                      <Text>{element?.name}</Text>
                      <Text style={{fontWeight:'700'}}>properties: </Text>
                      <Text>{element?.properties}</Text>
                    </View>
                  );
              })
              :
              <View>
                <Text style={{fontWeight:'700'}}>_id: </Text>
                <Text>{data?._id}</Text>
                <Text style={{fontWeight:'700'}}>_name: </Text>
                <Text>{data?.name}</Text>
                <Text style={{fontWeight:'700'}}>properties: </Text>
                <Text>{data?.properties}</Text>
              </View>
            :null
            }
          </View>
          <View style={{flex:1, flexDirection:'column'}}>
            <TextInput
              label="Activity _id"
              value={text}
              onChangeText={text => setText(text)}
              mode='outlined'
              style={{backgroundColor:'white', flex:1}}
              placeholder='put your activity "_id" here'
            />
          </View>
        </View>
        <View style={{flex:1, flexDirection:'column'}}>
          <Button mode={'contained'} style={{flexDirection:'column', backgroundColor:'#0874ED', marginVertical:10 }} onPress={onListButtonPress}>List activities</Button>
          <Button mode={'contained'} style={{flexDirection:'column', backgroundColor:'#12B3E2', marginVertical:10 }} onPress={()=>onViewButtonPress(text)}>View activity</Button>
          <Button mode={'contained'} style={{flexDirection:'column', backgroundColor:'#FFA600', marginVertical:10 }} onPress={()=>onCreateButtonPress(text)}>Create activity</Button>
          <Button mode={'contained'} style={{flexDirection:'column', backgroundColor:'#E21212', marginVertical:10 }} onPress={()=>onDeleteButtonPress(text)}>Delete activity</Button>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width:'90%', 
    alignSelf:'center',
  },
});
