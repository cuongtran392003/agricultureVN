import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export const GlobalBackground = () => {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {/* Base Nature Color */}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "#F4F9F4" }, // Soft off-white green
        ]}
      />

      <Svg width={width} height={height} style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#81C784" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#4CAF50" stopOpacity="0.05" />
          </LinearGradient>
          <LinearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#DCE775" stopOpacity="0.1" />
            <Stop offset="100%" stopColor="#AED581" stopOpacity="0.05" />
          </LinearGradient>
          <LinearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#4DB6AC" stopOpacity="0.1" />
            <Stop offset="100%" stopColor="#81C784" stopOpacity="0.05" />
          </LinearGradient>
        </Defs>

        {/* Top Left Blob (Leaves/Sky feel) */}
        <Circle cx={-100} cy={-50} r={350} fill="url(#grad2)" />
        <Path
          d="M0,0 C150,50 300,150 400,0 L0,0 Z"
          fill="url(#grad1)"
        />

        {/* Right Blob */}
        <Circle cx={width + 150} cy={height * 0.3} r={400} fill="url(#grad1)" />

        {/* Bottom Left / Earth blob */}
        <Circle cx={-50} cy={height + 100} r={300} fill="url(#grad3)" />
        <Path
          d={`M0,${height} C150,${height - 200} ${width},${
            height - 100
          } ${width},${height} L0,${height} Z`}
          fill="url(#grad1)"
        />
      </Svg>
    </View>
  );
};
