import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MarkerImage = ({ imageUri, type }: { imageUri: string; type: 'lost' | 'found' }) => {
  return (
    <View style={[styles.marker, type === 'lost' ? styles.lost : styles.found]}>
      <Image source={{ uri: imageUri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  lost: {
    borderColor: 'purple',
  },
  found: {
    borderColor: 'green',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default MarkerImage;
