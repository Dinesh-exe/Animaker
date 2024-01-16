import * as React from 'react';
import * as RN from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../App';

const AnimationList = () => {
  const appData: any = React.useContext(AppContext);
  const navigation = useNavigation<any>();

  const renderItem = React.useCallback(({item}: any) => {
    if (!item?.isEmpty) {
      return (
        <RN.TouchableOpacity
          onPress={() => {
            navigation.navigate('Action');
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
        <RN.TouchableOpacity
          onPress={() => {
            let selectedAnimation = appData?.selectedMotion?.map((e: any) => {
              if (e?.id === item?.id) {
                return {...e, isEmpty: false};
              } else {
                return e;
              }
            });
            appData?.setSelectedMotion(selectedAnimation);
          }}
          style={{flex: 1}}>
          <RN.View style={styles.newCard}>
            <RN.Text
              style={{alignSelf: 'center', color: 'black', fontSize: 20}}>
              +
            </RN.Text>
          </RN.View>
        </RN.TouchableOpacity>
      );
    }
  }, []);

  const keyExtractor = React.useCallback(
    (item: any, index: any) => item?.id?.toString(),
    [],
  );

  return (
    <RN.View style={styles.container}>
      <RN.FlatList
        data={appData?.selectedMotion}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
      />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'white',
    padding: 7,
    elevation: 5,
    borderRadius: 7,
    marginHorizontal: 7,
  },
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
    flex: 1,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 7,
    margin: 7,
    minWidth: 80,
  },
});

export default React.memo(AnimationList);
