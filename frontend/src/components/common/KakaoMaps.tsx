import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao?: any;
  }
}
const { kakao } = window;

const KakaoMaps = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 2
    };
    const map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커 생성
      position: map.getCenter()
    });

    marker.setMap(map);
  }, []);

  return (
    <div
      id="map"
      style={{
        width: '51vh',
        height: '20vh'
      }}
    />
  );
};

export default KakaoMaps;
