import * as React from 'react';
import * as RN from 'react-native';
import Sprit from '../../component/Sprit';
import AnimationBoard from '../../component/AnimationBoard';
import AnimationList from '../../component/AnimationList';

const Home = () => {
  return (
    <RN.View style={styles.container}>
      <AnimationBoard />
      <Sprit />
      <AnimationList />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
  animationBoard: {
    flex: 0.7,
    backgroundColor: 'white',
    padding: 7,
    margin: 7,
    elevation: 5,
    borderRadius: 7,
  },
});

export default React.memo(Home);
