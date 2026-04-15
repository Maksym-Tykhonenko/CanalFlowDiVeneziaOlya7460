import React from 'react';
import {SavedProvider} from './src/context/SavedContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <SavedProvider>
      <AppNavigator />
    </SavedProvider>
  );
};

export default App;
