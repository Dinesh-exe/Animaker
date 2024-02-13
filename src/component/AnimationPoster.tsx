import * as React from "react";
import * as RN from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimationPoster = ({ data, index }: any, ref: any) => {
  const translateX = useSharedValue(0);
  const translatey = useSharedValue(0);
  const rotate = useSharedValue("0deg");
  const imageSize = useSharedValue(50);
  const banner = useSharedValue(0);

  const context = useSharedValue({ x: 0, y: 0 });

  React.useImperativeHandle(ref, () => ({
    playAnimation,
    resetAnimation,
  }));

  const playAnimation = () => {
    if (Boolean(data?.data) && data?.shouldPerform) {
      if (data?.data?.find((e: any) => e?.actionId === "repeat")) {
        data?.data?.map(async (item: any, index: any) => {
          setTimeout(async () => {
            renderAnimationRepeat(item);
          }, index * 1000);
        });
      } else {
        data?.data?.map(async (item: any, index: any) => {
          setTimeout(async () => {
            renderAnimationSequence(item);
          }, index * 1000);
        });
      }
    }
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translatey.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translatey.value = event.translationY + context.value.y;
    });

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translatey.value },
      ],
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotate.value }],
      height: imageSize.value,
      width: imageSize.value,
    };
  });

  const animatedBannerStyle = useAnimatedStyle(() => {
    return {
      display: Boolean(banner.value) ? "flex" : "none",
    };
  });

  const resetAnimation = () => {
    translateX.value = withTiming(0, {
      duration: 1000,
    });
    translatey.value = withTiming(index * 10, {
      duration: 1000,
    });
    rotate.value = "0deg";
    imageSize.value = withTiming(50, {
      duration: 1000,
    });
    banner.value = 0;
  };

  const renderAnimationRepeat = (item: any) =>
    withRepeat(
      (Number(item?.actionId === "x") &&
        (translateX.value = withRepeat(
          withTiming(item?.actionValue ?? 0, {
            duration: 1000,
          }),
          3,
          true
        )),
      Number(item?.actionId === "y") &&
        (translatey.value = withRepeat(
          withTiming(item?.actionValue ?? 0, {
            duration: 1000,
          }),
          3,
          true
        )),
      Number(item?.actionId === "rotate") &&
        ((rotate.value = "0deg"),
        (rotate.value = withRepeat(
          withTiming(item?.actionValue ?? 0, {
            duration: 1000,
          }),
          3
        ))),
      Number(item?.actionId === "xy") &&
        ((translateX.value = withRepeat(
          withTiming(item?.xActionValue ?? 0, {
            duration: 1000,
          }),
          3
        )),
        (translatey.value = withRepeat(
          withTiming(item?.yActionValue ?? 0, {
            duration: 1000,
          }),
          3,
          true
        ))),
      Number(item?.actionId === "random") &&
        ((translateX.value = withRepeat(
          withTiming(item?.xActionValue ?? 0, {
            duration: 1000,
          }),
          3,
          true
        )),
        (translatey.value = withRepeat(
          withTiming(item?.yActionValue ?? 0, {
            duration: 1000,
          }),
          3,
          true
        ))),
      Number(item?.actionId === "hello") &&
        (banner.value = withRepeat(
          withTiming(
            item?.actionValue ?? 0,
            {
              duration: item?.actionValue ?? 1000,
            },
            () => {
              banner.value = 0;
            }
          ),
          3,
          true
        )),
      Number(item?.actionId === "increaseSize") &&
        (imageSize.value = withRepeat(
          withTiming(item?.actionValue ?? 0, {
            duration: 1000,
          }),
          3,
          true
        )),
      Number(item?.actionId === "decreaseSize") &&
        (imageSize.value = withRepeat(
          withTiming(item?.actionValue ?? 0, {
            duration: 1000,
          }),
          3,
          true
        )))
    );

  const renderAnimationSequence = (item: any) =>
    withSequence(
      Number(item?.actionId === "x") &&
        (translateX.value = withTiming(item?.actionValue ?? 0, {
          duration: 1000,
        })),
      Number(item?.actionId === "y") &&
        (translatey.value = withTiming(item?.actionValue ?? 0, {
          duration: 1000,
        })),
      Number(item?.actionId === "rotate") &&
        ((rotate.value = "0deg"),
        (rotate.value = withTiming(item?.actionValue ?? 0, {
          duration: 1000,
        }))),
      Number(item?.actionId === "xy") &&
        ((translateX.value = withTiming(item?.xActionValue ?? 0, {
          duration: 1000,
        })),
        (translatey.value = withTiming(item?.yActionValue ?? 0, {
          duration: 1000,
        }))),
      Number(item?.actionId === "random") &&
        ((translateX.value = withTiming(item?.xActionValue ?? 0, {
          duration: 1000,
        })),
        (translatey.value = withTiming(item?.yActionValue ?? 0, {
          duration: 1000,
        }))),
      Number(item?.actionId === "hello") &&
        (banner.value = withTiming(
          item?.actionValue ?? 0,
          {
            duration: item?.actionValue ?? 1000,
          },
          () => {
            banner.value = 0;
          }
        )),
      Number(item?.actionId === "increaseSize") &&
        (imageSize.value = withTiming(item?.actionValue ?? 0, {
          duration: 1000,
        })),
      Number(item?.actionId === "decreaseSize") &&
        (imageSize.value = withTiming(item?.actionValue ?? 0, {
          duration: 1000,
        }))
    );
  return (
    <GestureDetector gesture={gesture} key={data?.id}>
      <Animated.View style={[animatedViewStyle, styles.animationViewContainer]}>
        <Animated.View style={[styles.banner, animatedBannerStyle]}>
          <Animated.Text style={styles.bannerText}>Hello</Animated.Text>
        </Animated.View>
        <Animated.Image
          source={require("../assets/dog.png")}
          style={animatedImageStyle}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = RN.StyleSheet.create({
  animationViewContainer: {
    width: 80,
  },
  banner: {
    backgroundColor: "blue",
    paddingVertical: 7 / 3,
    paddingHorizontal: 7,
    borderRadius: 7,
    position: "absolute",
    top: -7,
    right: 7 / 1.2,
    zIndex: 1,
  },
  bannerText: { color: "white", fontSize: 10 },
});

export default React.memo(React.forwardRef(AnimationPoster));
