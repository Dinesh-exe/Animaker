import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import * as RN from 'react-native';

const AnimationList = ({setMotion}: any) => {
  const navigation = useNavigation<any>();

  const data = [
    {
      id: 1,
      image: require('../assets/dog.png'),
      selected: true,
      isEmpty: false,
    },
    {
      id: 2,
      image: '',
      selected: false,
      isEmpty: true,
    },
  ];

  const renderItem = React.useCallback(({item}: any) => {
    if (!item?.isEmpty) {
      return (
        <RN.TouchableOpacity
          onPress={() => {
            navigation.navigate('Action', {
              onReceived: (data: any) => {
                setMotion(data);
              },
            });
          }}>
          <RN.View style={styles.card}>
            <RN.Image source={item?.image} style={styles.image} />
            <RN.View style={styles.createBtnContainer}>
              <RN.Text style={styles.createBtnText}>Add Actions</RN.Text>
            </RN.View>
          </RN.View>
        </RN.TouchableOpacity>
      );
    } else {
      return (
        <RN.View style={styles.newCard}>
          <RN.Text style={{alignSelf: 'center', color: 'black', fontSize: 20}}>
            +
          </RN.Text>
        </RN.View>
      );
    }
  }, []);

  return (
    <RN.FlatList
      data={data}
      keyExtractor={(item: any) => item?.id}
      renderItem={renderItem}
      horizontal
    />
  );
};

const styles = RN.StyleSheet.create({
  card: {
    flex: 0,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 7,
    margin: 7,
    minWidth: 80,
  },
  image: {height: 50, width: 50, alignSelf: 'center', marginVertical: 7},
  createBtnContainer: {
    backgroundColor: 'blue',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    padding: 7,
  },
  createBtnText: {
    fontSize: 7,
    color: 'white',
    alignSelf: 'center',
  },
  newCard: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 7,
    margin: 7,
    minWidth: 80,
  },
});

export default AnimationList;
