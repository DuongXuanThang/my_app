import React, { useState, useRef, useEffect, ReactNode } from "react";
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  Source,
  Layer,
  GeolocateControl,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
// import { SearchOutlined } from "@ant-design/icons";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";
// import { ActionIcon } from "../../../../web.admin/src/icons/ActionIcon";
// import { Icon } from "components/Icon";
// import GeoCoderControl from "./GeoCoderControl";
// import { Button, Input, Row } from "antd";
// import { FullScreenControlCm } from "./components/styleFullScreen";

interface Location {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  // Các trường khác trong đối tượng kết quả tìm kiếm
}

interface propsMap {
  children?: string | ReactNode | JSX.Element;
  showSearch?: boolean;
  showFullScreen?: boolean;
  miniMap?: boolean;
}
export function Mapcustom(
//     {
//   children,
//   showFullScreen = true,
//   showSearch = true,
//   miniMap = false,
// }: propsMap
) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  return (
    <div
      className={
        isFullscreen
          ? "fixed top-0 right-0 bottom-0 left-0 z-[9999]"
          : "w-full h-full relative"
      }
    >
      <ReactMapGL
        mapLib={maplibregl}
        style={{ width: "100%", height: " 100%", position: "relative" }}
        mapStyle={`https://api.ekgis.vn/v2/mapstyles/style/osmplus/standard/style.json?api_key=wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy`}
      >
        {/* Định nghĩa nguồn dữ liệu */}
        <Source
          id="raster-tiles"
          type="raster"
          tileSize={256}
          tiles={[
            `https://api.ekgis.vn/v1/maps/roadmap/{z}/{x}/{y}.png?api_key=wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy`,
          ]}
        />

        {/* Định nghĩa lớp hiển thị */}
        {/* <Layer id="raster-layer" type="raster" source="raster-tiles" />
        {(showSearch || showFullScreen) && !miniMap && (
          <Row className="absolute top-[20px] right-[20px]">
            {showSearch && (
              <div className="w-[248px] h-[48px] ">
                <Input
                  placeholder="Tìm kiếm ..."
                  suffix={
                    <SearchOutlined
                      style={{ color: "rgba(0,0,0,.45)", fontSize: 20 }}
                    />
                  }
                />
              </div>
            )}
            {showFullScreen && (
              <Button
                onClick={toggleFullscreen}
                className="w-[48px] h-[39px] inline-flex justify-center items-center ml-2"
                icon={
                  !isFullscreen ? (
                    <Icon name="maximize" className="text-2xl" />
                  ) : (
                    <Icon name="minimize" className="text-2xl" />
                  )
                }
              />
            )}
          </Row>
        )}
        {miniMap && (
          <Row className="absolute top-[8px] right-[10px] left-[10px]">
            <div className="w-full h-[48px] ">
              <Input
                placeholder="Tìm kiếm ..."
                suffix={
                  <SearchOutlined
                    style={{ color: "rgba(0,0,0,.45)", fontSize: 20 }}
                  />
                }
              />
            </div>
          </Row>
        )}
        {children} */}
      </ReactMapGL>
    </div>
  );
}