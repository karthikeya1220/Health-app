import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Home, User, Activity, Trophy } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { 
  ResponsiveLayout, 
  ResponsiveGrid, 
  ResponsiveCard,
  useResponsiveDimensions 
} from '@/components/ui/ResponsiveLayout';
import { 
  SCREEN, 
  COMPONENT, 
  LAYOUT, 
  TYPOGRAPHY,
  useBreakpoint,
  responsiveValue 
} from '@/utils/responsive';

// Example responsive card component
const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = '#6366F1' 
}: {
  title: string;
  value: string;
  icon: any;
  color?: string;
}) => {
  const { colors } = useTheme();
  const { isMobile, isCompact } = useBreakpoint();
  
  return (
    <ResponsiveCard>
      <View style={{
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        padding: LAYOUT.getCardPadding(),
      }}>
        <View style={{
          width: COMPONENT.icon.lg,
          height: COMPONENT.icon.lg,
          backgroundColor: color + '20',
          borderRadius: LAYOUT.getBorderRadius(8),
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: isMobile ? LAYOUT.getPadding(8) : 0,
          marginRight: isMobile ? 0 : LAYOUT.getPadding(12),
        }}>
          <Icon 
            size={COMPONENT.icon.md} 
            color={color} 
            strokeWidth={2}
          />
        </View>
        
        <View style={{ 
          flex: 1, 
          alignItems: isMobile ? 'center' : 'flex-start' 
        }}>
          <Text style={{
            fontSize: TYPOGRAPHY.getCaptionSize(),
            color: colors.textSecondary,
            marginBottom: 4,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            {title}
          </Text>
          <Text style={{
            fontSize: TYPOGRAPHY.getHeaderSize(4),
            fontWeight: '700',
            color: colors.text,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            {value}
          </Text>
        </View>
      </View>
    </ResponsiveCard>
  );
};

// Example responsive stats grid
const StatsGrid = () => {
  const stats = [
    { title: 'Steps Today', value: '8,432', icon: Activity, color: '#10B981' },
    { title: 'Calories Burned', value: '432', icon: Trophy, color: '#F59E0B' },
    { title: 'Active Minutes', value: '78', icon: Home, color: '#EF4444' },
    { title: 'Heart Rate', value: '72 BPM', icon: User, color: '#8B5CF6' },
  ];

  return (
    <ResponsiveGrid>
      {stats.map((stat, index) => (
        <DashboardCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </ResponsiveGrid>
  );
};

// Example responsive dashboard screen
const ExampleResponsiveDashboard = () => {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const { 
    isMobile, 
    isCompact, 
    contentPadding, 
    headerHeight 
  } = useResponsiveDimensions();

  return (
    <ResponsiveLayout safeArea={true} scrollable={true}>
      {/* Header */}
      <View style={{
        height: headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: contentPadding,
        marginBottom: LAYOUT.getPadding(20),
      }}>
        <View>
          <Text style={{
            fontSize: TYPOGRAPHY.getHeaderSize(2),
            fontWeight: '700',
            color: colors.text,
          }}>
            Good Morning
          </Text>
          <Text style={{
            fontSize: TYPOGRAPHY.getBodySize('medium'),
            color: colors.textSecondary,
            marginTop: 4,
          }}>
            Let's check your health progress
          </Text>
        </View>
        
        <TouchableOpacity style={{
          width: COMPONENT.avatar.lg,
          height: COMPONENT.avatar.lg,
          backgroundColor: colors.primary + '20',
          borderRadius: COMPONENT.avatar.lg / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <User size={COMPONENT.icon.md} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={{ marginBottom: LAYOUT.getPadding(24) }}>
        <Text style={{
          fontSize: TYPOGRAPHY.getHeaderSize(4),
          fontWeight: '600',
          color: colors.text,
          marginBottom: LAYOUT.getPadding(16),
          paddingHorizontal: contentPadding,
        }}>
          Today's Overview
        </Text>
        <View style={{ paddingHorizontal: contentPadding }}>
          <StatsGrid />
        </View>
      </View>

      {/* Progress Section */}
      <View style={{ marginBottom: LAYOUT.getPadding(24) }}>
        <Text style={{
          fontSize: TYPOGRAPHY.getHeaderSize(4),
          fontWeight: '600',
          color: colors.text,
          marginBottom: LAYOUT.getPadding(16),
          paddingHorizontal: contentPadding,
        }}>
          Progress
        </Text>
        <View style={{ paddingHorizontal: contentPadding }}>
          <ResponsiveCard>
            <View style={{
              height: responsiveValue({
                xs: 200,
                sm: 220,
                md: 240,
                lg: 260,
                default: 240,
              }),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: TYPOGRAPHY.getBodySize('large'),
                color: colors.textSecondary,
                textAlign: 'center',
              }}>
                Your weekly progress chart would go here
              </Text>
            </View>
          </ResponsiveCard>
        </View>
      </View>

      {/* Responsive spacing at bottom for mobile */}
      <View style={{ height: LAYOUT.getPadding(40) }} />
    </ResponsiveLayout>
  );
};

export default ExampleResponsiveDashboard;
