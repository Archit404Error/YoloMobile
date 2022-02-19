import React, { useState } from "react";
import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { windowHeight, windowWidth } from "../styles";

export default ({ initialLat, initialLong }) => {
    const [region, setRegion] = useState({
        latitude: initialLat,
        longitude: initialLong,
        latitudeDelta: 0.95,
        longitudeDelta: 0.95,
    })

    const [markerPos, setMarkerPos] = useState({
        latitude: initialLat,
        longitude: initialLong
    })

    return (
        <MapView
            region={region}
            onRegionChangeComplete={reg => setRegion(reg)}
            onMarkerDrag={dragEvent => setMarkerPos(dragEvent.nativeEvent.coordinate)}
            style={{ height: windowHeight / 3, width: windowWidth }}
        >
            <Marker
                draggable
                coordinate={markerPos}
            />
        </MapView>
    )
}