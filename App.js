import React from 'react';
import { StyleSheet } from 'react-native';
import Search from './components/Search';

export default function App() {
  return (
    <Search />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
