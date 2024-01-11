import * as React from 'react';
import * as RN from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const AnimationBoard = ({axis, motions}: any) => {
  const [isLayoutReady, setIsLayoutReady] = React.useState(false);
  const [motion, setMotion] = React.useState([]);
  const boardLayout = React.useRef({x: 0, y: 0});

  const translateX = useSharedValue(0);
  const translatey = useSharedValue(0);
  const rotate = useSharedValue('0deg');

  const context = useSharedValue({x: 0, y: 0});

  React.useEffect(() => {
    if (motions) {
      setMotion(motions);
    }
  }, [motions]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {x: translateX.value, y: translatey.value};
    })
    .onUpdate(event => {
      translateX.value = event.translationX + context.value.x;
      translatey.value = event.translationY + context.value.y;
    });

  requestAnimationFrame(() => {
    axis({
      x: translateX.value.toPrecision(5),
      y: translatey.value.toPrecision(5),
    });
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translatey.value},
        {rotate: rotate.value},
      ],
    };
  });

  const playAnimation = async () => {
    if (motion) {
      motion?.map((item: any) => {
        switch (item?.actionId) {
          case 'x':
            translateX.value = withSequence(
              withTiming(item?.actionValue ?? 0, {
                duration: 1000,
              }),
            );
            break;
          case 'y':
            translatey.value = withSequence(
              withTiming(item?.actionValue ?? 0, {
                duration: 1000,
              }),
            );
            break;
          case 'rotate':
            rotate.value = '0deg';
            rotate.value = withSequence(
              withTiming(item?.actionValue ?? 0, {duration: 1000}),
            );
            break;
          case 'xy':
            translateX.value = withSequence(
              withTiming(item?.xActionValue ?? 0, {
                duration: 1000,
              }),
            );
            translatey.value = withSequence(
              withTiming(item?.yActionValue ?? 0, {
                duration: 1000,
              }),
            );
            break;

          default:
            break;
        }
      });
    }
  };

  const renderResetBtn = () => (
    <RN.TouchableOpacity
      style={{
        height: 30,
        width: 30,
        backgroundColor: 'blue',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        right: 10,
      }}
      onPress={() => {
        translateX.value = boardLayout.current.x;
        translatey.value = boardLayout.current.y;
      }}>
      <RN.Text style={{color: 'white'}}>R</RN.Text>
    </RN.TouchableOpacity>
  );

  const renderPlayBtn = () => (
    <RN.TouchableOpacity
      style={{
        height: 30,
        width: 30,
        backgroundColor: 'blue',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
      }}
      onPress={playAnimation}>
      <RN.Text style={{color: 'white'}}>S</RN.Text>
    </RN.TouchableOpacity>
  );

  return (
    <RN.View
      style={styles.animationBoard}
      onLayout={e => {
        if (!isLayoutReady) {
          boardLayout.current.x = e.nativeEvent.layout.height / 2.5;
          boardLayout.current.y = e.nativeEvent.layout.width / 2.6;
          translateX.value = e.nativeEvent.layout.height / 2.5;
          translatey.value = e.nativeEvent.layout.width / 2.6;
          setIsLayoutReady(true);
        }
      }}>
      {renderResetBtn()}
      {renderPlayBtn()}
      <GestureDetector gesture={gesture}>
        <Animated.Image
          source={require('../assets/dog.png')}
          style={[
            {
              height: 50,
              width: 50,
            },
            rStyle,
          ]}
        />
      </GestureDetector>
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
});

export default AnimationBoard;
