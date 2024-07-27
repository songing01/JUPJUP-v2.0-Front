import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Routes from "./Routes";

import pin1 from "../../assets/post/pin1.svg";
import pin2 from "../../assets/post/pin2.svg";
import pin3 from "../../assets/post/pin3.svg";
import pin4 from "../../assets/post/pin4.svg";
import pin5 from "../../assets/post/pin5.svg";
import pin6 from "../../assets/post/pin6.svg";
import pin7 from "../../assets/post/pin7.svg";
import pin8 from "../../assets/post/pin8.svg";
import pin9 from "../../assets/post/pin9.svg";

const { kakao } = window;

const SearchMap = () => {
  const mapRef = useRef(null);
  const markerCountRef = useRef(0); //마커 최대 개수 9개 관리를 위한 ref

  const [keyword, setKeyword] = useState("");
  const [lat, setLat] = useState(0); //지도 중심 좌표, 마커와 무관
  const [lon, setLon] = useState(0); //지도 중심 좌표, 마커와 무관
  const [markers, setMarkers] = useState([]); //지도 표시 마커 배열
  const [route, setRoute] = useState([]); //객체(주소명,경도,위도)배열

  const pinImages = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9];

  // 마커를 생성하고 지도위에 표시하는 함수입니다
  function addMarker(position) {
    //마커 최대 9개
    if (markerCountRef.current < 9) {
      // 마커이미지를 생성합니다
      const currentIndex = markerCountRef.current;
      const imageSrc = pinImages[currentIndex];

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        new kakao.maps.Size(32, 32), // Define the size of the marker image
        { offset: new kakao.maps.Point(16, 32) } // Define the offset point of the marker
      );
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        image: markerImage,
        position: position,
      });

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }

      //좌표로 도로명 주소 가져오기 & 배열에 저장
      searchDetailAddrFromCoords(position, (result, status) => {
        console.log(result[0]);
        console.log(result[0].address.address_name);
        console.log(result[0].address.region_2depth_name);

        // 생성된 마커를 배열에 추가합니다
        setMarkers((prev) => {
          const updatedMarkers = [...prev, marker];
          markerCountRef.current = updatedMarkers.length; // Update marker count ref
          return updatedMarkers;
        });

        setRoute((prev) => [
          ...prev,
          {
            address: result[0].address.address_name,
            latitude: position.Ma,
            longitude: position.La,
          },
        ]);
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(mapRef.current);
      marker.setDraggable(true);
    } else {
      console.log("초과");
    }
  }

  useEffect(() => {
    //첫 지도 생성 (현위치 기준)
    const mapContainer = document.getElementById("map-view");
    const mapOption = {
      center: new kakao.maps.LatLng(37.5664056, 126.9778222),
      level: 5,
    };

    mapRef.current = new kakao.maps.Map(mapContainer, mapOption);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);

          mapRef.current.setCenter(locPosition);
          console.log("현재위치 가져오기 성공");
        },
        function (error) {
          console.error("위치 정보를 가져오는데 실패했습니다:", error); // 실패 로그
          const locPosition = new kakao.maps.LatLng(37.5664056, 126.9778222);
          mapRef.current.setCenter(locPosition);
          alert("위치 권한을 허용해야 합니다.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("Geolocation을 사용할 수 없습니다."); // Geolocation 미지원 로그
    }

    // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(
      mapRef.current,
      "click",
      function (mouseEvent) {
        // 클릭한 위치에 마커를 표시합니다
        addMarker(mouseEvent.latLng);
      }
    );
  }, []);

  useEffect(() => {
    //검색을 통해 중심 이동 & 핀 생성
    if (lat !== 0 && lon !== 0) {
      const locPosition = new kakao.maps.LatLng(lat, lon);
      if (mapRef.current) {
        mapRef.current.setCenter(locPosition);
        addMarker(locPosition);
      }
    }
  }, [lat, lon]);

  useEffect(() => {
    console.log(markers);
    console.log(route);
  }, [markers]);

  return (
    <Wrapper>
      <div className="title">플로깅 루트</div>
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        setLat={setLat}
        setLon={setLon}
      />
      <MapContainer>
        <Map id="map-view" />
      </MapContainer>

      <Routes isDeletable={true} route={route} />
    </Wrapper>
  );
};

export default SearchMap;

const MapContainer = styled.div`
  flex-shrink: 0;
  border-radius: 2px;
  position: relative;
  width: 100%;

  ::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }

  .map-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Map = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
