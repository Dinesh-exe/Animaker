import * as React from 'react';
import * as RN from 'react-native';
import AnimationPoster from './AnimationPoster';
import {AppContext} from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimationBoard = () => {
  let animationPosterRef: any = React.useRef([]);
  const appData: any = React.useContext(AppContext);

  const playAnimation = async () => {
    appData?.selectedMotion?.map((item: any) => {
      animationPosterRef[item?.id]?.playAnimation();
    });
  };

  const renderResetBtn = () => (
    <RN.TouchableOpacity
      style={styles.resetBtn}
      onPress={() => {
        appData?.selectedMotion?.map((item: any) => {
          animationPosterRef[item?.id]?.resetAnimation();
        });
      }}>
      <Icon name="stop-outline" size={20} color={'white'} />
    </RN.TouchableOpacity>
  );

  const renderPlayBtn = () => (
    <RN.TouchableOpacity style={styles.playBtn} onPress={playAnimation}>
      <Icon name="play-circle-outline" size={20} color={'white'} />
    </RN.TouchableOpacity>
  );

  const renderItem = React.useCallback(({item, index}: any) => {
    if (!item?.isEmpty) {
      return (
        <AnimationPoster
          data={item}
          index={index}
          ref={(animationRef: any) => {
            animationPosterRef[item?.id] = animationRef;
          }}
          key={index}
        />
      );
    } else {
      return <></>;
    }
  }, []);

  const keyExtractor = React.useCallback(
    (item: any, index: any) => item?.id?.toString(),
    [],
  );

  const renderCreature = () => (
    <RN.FlatList
      data={appData?.selectedMotion}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={{flex: 1}}
    />
  );

  return (
    <RN.View style={styles.animationBoard}>
      {renderResetBtn()}
      {renderPlayBtn()}
      {renderCreature()}
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  animationBoard: {
    flex: 0.9,
    backgroundColor: 'white',
    padding: 7,
    margin: 7,
    elevation: 5,
    borderRadius: 7,
  },
  resetBtn: {
    height: 30,
    width: 30,
    backgroundColor: 'blue',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  playBtn: {
    height: 30,
    width: 30,
    backgroundColor: 'blue',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 10,
  },
});

export default React.memo(AnimationBoard);
