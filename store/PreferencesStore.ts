import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getLocales } from 'expo-localization';

interface PreferencesState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      language: getLocales()[0]?.languageCode ?? 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
