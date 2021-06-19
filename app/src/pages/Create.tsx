import React, { memo, useState } from 'react';
import { View, Text} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Navigation } from '../types';
import { theme } from '../core/theme';
import ApiCaller from '../core/ApiCaller';

type Props = {
  navigation: Navigation;
};

const CreateScreen = ({ navigation }: Props) => {
  const [name, setName] = useState<string>('');
  const [properties, setProperties] = useState<string>('');

  var apiCaller = new ApiCaller();

  const createActivity = async (activity:any) => {
    const activityRes = await apiCaller.call('/activities', 'POST', activity);
    navigation.navigate('view', {id: activityRes?._id})
  }
  const onCreatePress = () => {
    let activityTmp = {};
    activityTmp.name = name;
    activityTmp.properties = properties;
    createActivity(activityTmp);
    setName('');
    setProperties('');
  }
  return (
    <View style={{ flex:1}}>
      <View style={{alignSelf:'center', width:'40%', marginTop:50}}>
        <TextInput
            mode= 'outlined'
            label='Nombre'
            placeholder='Nombre de la actividad'
            value={name}
            onChangeText={text=> setName(text)}
            style={{marginBottom:20}}
        />
          <TextInput
            mode= 'outlined'
            label='Propiedades'
            placeholder='Propiedades de la actividad'
            value={properties}
            onChangeText={text=> setProperties(text)}
            style={{marginBottom:60}}
        />
        <Button mode='contained' style={{ alignSelf:'center', width:200}} uppercase={false} onPress={()=> onCreatePress()}>Crear</Button>
      </View>
    </View>
  );
};
export default memo(CreateScreen);