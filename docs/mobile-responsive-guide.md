# Mobile Responsive Design Guide

This guide demonstrates how to create mobile-responsive screens in the Health App using the enhanced responsive utilities.

## Key Principles

### 1. Mobile-First Approach
Always design for the smallest screen first, then enhance for larger screens.

### 2. Touch-Friendly Interfaces
Ensure all interactive elements meet minimum touch target sizes (44px on iOS, 48px on Android).

### 3. Adaptive Layouts
Use flexible layouts that adapt to different screen sizes and orientations.

## Enhanced Responsive Utilities

### Screen Information
```typescript
import { SCREEN, useBreakpoint } from '@/utils/responsive';

// Check device capabilities
const { isMobile, isCompact, deviceSize } = useBreakpoint();

// Screen dimensions
SCREEN.width          // Device width
SCREEN.height         // Device height
SCREEN.isMobile       // < 480px width
SCREEN.isCompact      // < 414px width
SCREEN.usableHeight   // Content area height
```

### Responsive Values
```typescript
import { responsiveValue } from '@/utils/responsive';

const fontSize = responsiveValue({
  xs: 12,    // 320px and below
  sm: 14,    // 320px - 375px
  md: 16,    // 375px - 414px
  lg: 18,    // 414px - 428px
  xl: 20,    // 428px - 480px
  xxl: 22,   // 480px - 768px
  xxxl: 24,  // 768px and above
  default: 16
});
```

### Layout Helpers
```typescript
import { LAYOUT, COMPONENT, TYPOGRAPHY } from '@/utils/responsive';

// Responsive padding/margins
const padding = LAYOUT.getContentPadding(); // Auto-adjusts per screen size

// Component heights
const buttonHeight = COMPONENT.button.md; // Touch-friendly button height
const headerHeight = COMPONENT.getHeaderHeight(); // Responsive header

// Typography
const fontSize = TYPOGRAPHY.getFontSize(16); // Responsive font scaling
const lineHeight = TYPOGRAPHY.getLineHeight(fontSize); // Proper line height
```

## Responsive Components

### ResponsiveLayout
Provides automatic safe area handling and responsive padding:

```tsx
import { ResponsiveLayout } from '@/components/ui/ResponsiveLayout';

<ResponsiveLayout 
  safeArea={true}     // Handle safe areas
  scrollable={true}   // Make scrollable
  padding={true}      // Add responsive padding
>
  <YourContent />
</ResponsiveLayout>
```

### ResponsiveGrid
Creates adaptive grid layouts:

```tsx
import { ResponsiveGrid } from '@/components/ui/ResponsiveLayout';

<ResponsiveGrid columns={2}> {/* Auto-adjusts on mobile */}
  <Card1 />
  <Card2 />
  <Card3 />
  <Card4 />
</ResponsiveGrid>
```

### ResponsiveCard
Cards with mobile-optimized spacing:

```tsx
import { ResponsiveCard } from '@/components/ui/ResponsiveLayout';

<ResponsiveCard padding={true}>
  <CardContent />
</ResponsiveCard>
```

## Mobile Layout Patterns

### 1. Stack on Mobile, Grid on Larger Screens
```tsx
const { isMobile } = useBreakpoint();

<View style={{
  flexDirection: isMobile ? 'column' : 'row',
  gap: LAYOUT.getPadding(16),
}}>
  <Item1 />
  <Item2 />
</View>
```

### 2. Responsive Text Alignment
```tsx
const { isCompact } = useBreakpoint();

<Text style={{
  textAlign: isCompact ? 'center' : 'left',
  fontSize: TYPOGRAPHY.getFontSize(16),
}}>
  Your text content
</Text>
```

### 3. Adaptive Icon Sizes
```tsx
<Icon 
  size={COMPONENT.icon.md} 
  color={colors.primary} 
/>
```

### 4. Touch-Friendly Buttons
```tsx
<TouchableOpacity style={{
  height: COMPONENT.button.md,
  minWidth: TOUCH.minTarget,
  paddingHorizontal: LAYOUT.getPadding(16),
  borderRadius: LAYOUT.getBorderRadius(8),
}}>
  <Text>Button Text</Text>
</TouchableOpacity>
```

## Best Practices

### 1. Use Responsive Utilities
Always use the provided responsive utilities instead of hardcoded values:

```tsx
// ❌ Don't do this
const styles = StyleSheet.create({
  container: {
    padding: 16,
    fontSize: 18,
  },
});

// ✅ Do this
const styles = StyleSheet.create({
  container: {
    padding: LAYOUT.getContentPadding(),
    fontSize: TYPOGRAPHY.getFontSize(18),
  },
});
```

### 2. Test on Multiple Screen Sizes
Always test your layouts on:
- Small phones (iPhone SE)
- Standard phones (iPhone 12)
- Large phones (iPhone 14 Plus)
- Different orientations

### 3. Consider Thumb Reach
Place important actions within thumb reach zones:

```tsx
const { thumbReachBottom } = SCREEN;

<TouchableOpacity style={{
  position: 'absolute',
  bottom: Math.min(50, SCREEN.height - thumbReachBottom),
}}>
  <PrimaryAction />
</TouchableOpacity>
```

### 4. Handle Keyboard Overlays
Use KeyboardAvoidingView for forms:

```tsx
<KeyboardAvoidingView 
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
>
  <ScrollView keyboardShouldPersistTaps="handled">
    <FormContent />
  </ScrollView>
</KeyboardAvoidingView>
```

## Screen Size Breakpoints

| Breakpoint | Width Range | Typical Devices |
|------------|-------------|-----------------|
| xs         | < 320px     | Very old devices |
| sm         | 320-375px   | iPhone SE, iPhone 8 |
| md         | 375-414px   | iPhone 12, Pixel 6 |
| lg         | 414-428px   | iPhone 14, Galaxy S21 |
| xl         | 428-480px   | iPhone 14 Plus, Note series |
| xxl        | 480-768px   | Small tablets |
| xxxl       | > 768px     | Large tablets |

## Common Mobile Gotchas

### 1. Safe Area Insets
Always handle safe areas on devices with notches:

```tsx
import { useSafeLayout } from '@/utils/responsive';

const { insets, getContainerStyle } = useSafeLayout();

<View style={getContainerStyle()}>
  <Content />
</View>
```

### 2. Minimum Touch Targets
Ensure interactive elements are large enough:

```tsx
const touchSize = TOUCH.getTouchSize(40); // At least 44px
```

### 3. Text Readability
Ensure text is readable on all screen sizes:

```tsx
const fontSize = TYPOGRAPHY.getFontSize(16); // Auto-scales
const lineHeight = TYPOGRAPHY.getLineHeight(fontSize); // Proper spacing
```

### 4. Loading States
Provide appropriate loading states for mobile:

```tsx
const { isCompact } = useBreakpoint();

<SkeletonLoader 
  height={isCompact ? 60 : 80}
  borderRadius={LAYOUT.getBorderRadius(8)}
/>
```

## Example Implementation

See `components/examples/ResponsiveDashboard.tsx` for a complete example of a mobile-responsive dashboard screen.

## Migration Guide

To update existing screens to be mobile-responsive:

1. Replace hardcoded dimensions with responsive utilities
2. Use ResponsiveLayout for container structure
3. Replace static grids with ResponsiveGrid
4. Update typography to use TYPOGRAPHY helpers
5. Ensure touch targets meet minimum sizes
6. Test on various screen sizes

Following these guidelines will ensure your app provides an excellent experience across all mobile device sizes.
