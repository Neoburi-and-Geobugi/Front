import React, { useRef } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

type Post = {
  id: number;
  petName: string;
  description: string;
  timeAgo: string;
  image: string;
  type: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

const KakaoMapScreen = ({ navigation }: { navigation: any }) => {
  const webViewRef = useRef(null);

  const posts: Post[] = [
    {
      id: 1,
      petName: '치와와',
      description: '장안타운 근처',
      timeAgo: '2시간 전',
      image: '../assets/images/pet/mix_dog.jpg',
      type: 'lost',
      location: { latitude: 37.5665, longitude: 126.9780 },
    },
    {
      id: 2,
      petName: '시바견',
      description: '죽전 3동 근처',
      timeAgo: '10분 전',
      image: '../assets/images/pet/siba_dog.jpg',
      type: 'found',
      location: { latitude: 37.5678, longitude: 126.9776 },
    },
  ];

  const markerData = posts.map(post => ({
    id: post.id,
    title: post.petName,
    lat: post.location.latitude,
    lng: post.location.longitude,
  }));

  const html = `
    <!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Kakao Map</title>
      <script type='text/javascript' src='https://dapi.kakao.com/v2/maps/sdk.js?appkey=8d252a34f75e4d65333370609e37af98&libraries=services'></script>
      <style>
        #map {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;

        }
      </style>
    </head>
    <body>
      <div id='map'></div>
      <script>
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);

        const markers = ${JSON.stringify(markerData)};

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

  const renderPostItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => Alert.alert('게시글 클릭', `${item.petName} 게시글로 이동`)}
    >
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postTextContainer}>
        <Text style={styles.postTitle}>{item.petName}</Text>
        <Text style={styles.postDescription}>{item.description}</Text>
        <Text style={styles.postTime}>{item.timeAgo}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleMarkerClick = (markerData: { id: number }) => {
    const selectedPost = posts.find(post => post.id === markerData.id);
    if (selectedPost) {
      Alert.alert('마커 클릭', `${selectedPost.petName} 게시글로 이동`);
      navigation.navigate('PostDetail', { post: selectedPost });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Text style={styles.searchBarText}>Search</Text>
      </View>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.map}
        onMessage={(event) => {
          const markerData = JSON.parse(event.nativeEvent.data);
          handleMarkerClick(markerData);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
        }}
        onLoad={() => {
          console.log('WebView loaded successfully');
        }}
      />
      <View style={styles.postListContainer}>
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    zIndex: 10,
    elevation: 5,
  },
  searchBarText: {
    fontSize: 16,
    color: '#888',
  },
  map: {
    flex: 1,
  },
  postListContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  postItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  postTextContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDescription: {
    fontSize: 14,
    color: '#666',
  },
  postTime: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default KakaoMapScreen;
