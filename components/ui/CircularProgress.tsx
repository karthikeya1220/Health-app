import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { scale, COMPONENT } from '@/utils/responsive';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  backgroundColor: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = scale(120),
  strokeWidth = scale(8),
  color,
  backgroundColor,
}) => {
  // Ensure minimum size for touch accessibility
  const adjustedSize = Math.max(size, scale(60));
  const adjustedStrokeWidth = Math.min(strokeWidth, adjustedSize / 10);
  
  const radius = (adjustedSize - adjustedStrokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={[styles.container, { width: adjustedSize, height: adjustedSize }]}>
      <Svg width={adjustedSize} height={adjustedSize} style={styles.svg}>
        {/* Background circle */}
        <Circle
          cx={adjustedSize / 2}
          cy={adjustedSize / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={adjustedStrokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <Circle
          cx={adjustedSize / 2}
          cy={adjustedSize / 2}
          r={radius}
          stroke={color}
          strokeWidth={adjustedStrokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${adjustedSize / 2} ${adjustedSize / 2})`}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
});