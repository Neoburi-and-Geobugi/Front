import React, { useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import PostList from '../components/PostList';

const KakaoMapScreen = () => {
  const webViewRef = useRef(null);

  const posts = [
    {
      id: 1,
      petName: '믹스',
      description: '장안타운 근처',
      timeAgo: '2시간 전',
      image: 'https://example.com/image1.jpg',
      type: 'lost',
      location: { latitude: 37.5665, longitude: 126.9780 },
    },
    {
      id: 2,
      petName: '시바견',
      description: '죽전 3동 근처',
      timeAgo: '10분 전',
      image: 'https://example.com/image2.jpg',
      type: 'found',
      location: { latitude: 37.5678, longitude: 126.9776 },
    },
  ];

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Kakao Map</title>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=5a1e8b51b4db11968c41500e19a668f4&libraries=services"></script>
      <style>
        #map {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);

        const markers = ${JSON.stringify(posts.map(post => ({
          title: post.petName,
          lat: post.location.latitude,
          lng: post.location.longitude,
        })))};

        markers.forEach(marker => {
          const markerPosition = new kakao.maps.LatLng(marker.lat, marker.lng);
          const kakaoMarker = new kakao.maps.Marker({
            position: markerPosition,
            map: map,
          });

          kakao.maps.event.addListener(kakaoMarker, 'click', () => {
            window.ReactNativeWebView.postMessage(JSON.stringify(marker));
          });
        });
      </script>
    </body>
    </html>
  `;

  const handlePostSelect = (id: number) => {
    Alert.alert('Selected Post', `Selected post ID: ${id}`);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.map}
        onMessage={(event) => {
          const markerData = JSON.parse(event.nativeEvent.data);
          Alert.alert('Marker Clicked', `Marker clicked: ${markerData.title}`);
        }}
      />
      <View style={styles.postListContainer}>
        <PostList posts={posts} onSelect={handlePostSelect} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  postListContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default KakaoMapScreen;
