import * as React from 'react';
import * as RN from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Motion from '../screens/motion/motion';
import Looks from '../screens/looks/Looks';
import Control from '../screens/control/Control';
import Events from '../screens/event/Event';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const MyTabs = (props: any) => {
  const navigation = useNavigation<any>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RN.TouchableOpacity
          style={styles.doneBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <RN.Text style={styles.doneBtnText}>Done</RN.Text>
        </RN.TouchableOpacity>
      ),
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12, width: '100%', color: 'white'},
        tabBarStyle: {backgroundColor: 'blue'},
        swipeEnabled: false,
        tabBarIndicatorStyle: {backgroundColor: 'white'},
      }}>
      <Tab.Screen name="Motion" component={Motion} />
      <Tab.Screen name="Looks" component={Looks} />
      <Tab.Screen name="Control" component={Control} />
      <Tab.Screen name="Events" component={Events} />
    </Tab.Navigator>
  );
};

const styles = RN.StyleSheet.create({
  doneBtn: {
    backgroundColor: 'blue',
    paddingHorizontal: 7 * 2,
    paddingVertical: 7 / 1.5,
    borderRadius: 7,
  },
  doneBtnText: {color: 'white'},
});

export default MyTabs;
