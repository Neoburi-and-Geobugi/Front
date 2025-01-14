import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "KakaoMap">;

const KakaoMapScreen = ({ navigation, route }: Props) => {
  const handleMessage = (event: any) => {
    const address = event.nativeEvent.data; // WebView에서 전달된 주소
    if (address) {
      route.params.onAddressSelect(address); // 주소를 부모 컴포넌트로 전달
      navigation.goBack(); // WebView 화면 닫기
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&libraries=services"></script>
            <style>
              #map { width: 100%; height: 100%; }
              #searchBox { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 90%; z-index: 10; }
            </style>
          </head>
          <body>
            <input id="searchBox" type="text" placeholder="검색어를 입력하세요" onkeypress="searchAddress(event)" style="padding: 10px; font-size: 16px; width: 90%;" />
            <div id="map"></div>
            <script>
              var mapContainer = document.getElementById('map');
              var mapOption = { center: new kakao.maps.LatLng(37.5665, 126.9780), level: 3 };
              var map = new kakao.maps.Map(mapContainer, mapOption);

              var geocoder = new kakao.maps.services.Geocoder();

              function searchAddress(event) {
                if (event.key === 'Enter') {
                  var query = document.getElementById('searchBox').value;
                  geocoder.addressSearch(query, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                      map.setCenter(coords);
                      var marker = new kakao.maps.Marker({ map: map, position: coords });
                      var address = result[0].address_name;

                      // React Native WebView로 주소 전달
                      window.ReactNativeWebView.postMessage(address);
                    }
                  });
                }
              }
            </script>
          </body>
          </html>
          `,
        }}
        onMessage={handleMessage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KakaoMapScreen;
