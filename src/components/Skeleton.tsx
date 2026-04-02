import React, { useEffect } from "react";
import { DimensionValue, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle | ViewStyle[];
  flex?: number;
}

export const Skeleton = ({
  width,
  height,
  borderRadius = 8,
  style,
  flex,
}: SkeletonProps) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 800 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const baseStyle: ViewStyle = {
    backgroundColor: "#E5E7EB",
    borderRadius,
  };

  if (width !== undefined) baseStyle.width = width;
  if (height !== undefined) baseStyle.height = height;
  if (flex !== undefined) baseStyle.flex = flex;

  return <Animated.View style={[baseStyle, animatedStyle, style]} />;
};
