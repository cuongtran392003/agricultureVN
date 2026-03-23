// components/CustomTabBar.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname, router } from 'expo-router';
import { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

const TABS: {
  name: string;
  path: string;
  icon: IoniconsName;
  iconOutline: IoniconsName;
}[] = [
  {
    name: 'Trang chủ',
    path: '/(tabs)/home',
    icon: 'home',
    iconOutline: 'home-outline',
  },
  {
    name: 'Lịch trình',
    path: '/(tabs)/schedule',
    icon: 'calendar',
    iconOutline: 'calendar-outline',
  },
  {
    name: 'Chẩn đoán',
    path: '/(tabs)/diagnosis',
    icon: 'camera',
    iconOutline: 'camera-outline',
  },
  {
    name: 'Thị trường',
    path: '/(tabs)/market',
    icon: 'stats-chart',
    iconOutline: 'stats-chart-outline',
  },
  {
    name: 'Cài đặt',
    path: '/(tabs)/settings',
    icon: 'settings',
    iconOutline: 'settings-outline',
  },
];

export default function CustomTabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      {TABS.map((tab) => {
        const isActive = pathname === tab.path || pathname.includes(tab.path.replace('/(tabs)', ''));

        return (
          <TouchableOpacity
            key={tab.path}
            onPress={() => router.navigate(tab.path as any)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            {/* Icon với background tròn khi active */}
            <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
              <Ionicons
                name={isActive ? tab.icon : tab.iconOutline}
                size={22}
                color={isActive ? '#2E7D32' : '#8D7B6A'}
              />
            </View>

            {/* Label */}
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0EDE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: '#E8F5E9', // nền tròn xanh lá nhạt
  },
  label: {
    fontSize: 10,
    color: '#8D7B6A',
    fontWeight: '400',
  },
  labelActive: {
    color: '#2E7D32',
    fontWeight: '600',
  },
});