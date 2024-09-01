import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: object) {
  const navigator = navigationRef.current;
  if (navigator?.isReady()) {
    navigator.navigate(name, params);
  }
}
