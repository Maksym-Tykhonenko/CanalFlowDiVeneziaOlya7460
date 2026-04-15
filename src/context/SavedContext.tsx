import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SavedContextType = {
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const SavedContext = createContext<SavedContextType>({
  savedIds: [],
  toggleSaved: () => {},
  isSaved: () => false,
});

const STORAGE_KEY = '@saved_locations';

export const SavedProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) {
        setSavedIds(JSON.parse(data));
      }
    });
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  return (
    <SavedContext.Provider value={{savedIds, toggleSaved, isSaved}}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
