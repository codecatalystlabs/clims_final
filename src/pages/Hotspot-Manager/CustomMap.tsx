
//@ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

import { getHotspots } from '../../api/apiRequests';
import { useQuery } from '@tanstack/react-query';
import useLocalStorage from '../../hooks/useLocalStorage';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const CustomMap: React.FC = () => {
  const mapRef = useRef(null);
  const [data, setData] = useState<any[]>([]);
  const [newData, setNewData] = useState<any[]>([]);
  const [userInfo] = useLocalStorage('userData', {});
  
  const hotspotQuery = useQuery({
    queryKey: ['hotspot'],
    queryFn: getHotspots,
    staleTime: 60000,
  });

  // Memoize the valid data processing
  const validData = useMemo(() => {
    if (hotspotQuery.isSuccess) {
      return hotspotQuery.data.filter((item: any) => {
        const longitude = parseFloat(item.longtitude);
        const latitude = parseFloat(item.latitude);
        return !isNaN(longitude) && !isNaN(latitude) && longitude !== 0 && latitude !== 0;
      });
    }
    return [];
  }, [hotspotQuery.data, hotspotQuery.isSuccess]);

  useEffect(() => {
    setData(validData);
  }, [validData]);

  // Memoize the filtering function
  const filterByUserLocation = useMemo(() => {
    const userLocation = userInfo?.user?.district?.toLowerCase();
    if (!userLocation) return [];
    return data.filter((item: any) =>
      item.district?.toLowerCase() === userLocation
    );
  }, [data, userInfo]);

  useEffect(() => {
    setNewData(filterByUserLocation);
  }, [filterByUserLocation]);

  const center = useMemo(() => ({
    lat: 1.3733,
    lng: 32.2903,
  }), []);

  const renderedData = useMemo(() => {
    return userInfo?.user?.role === 'moh' || userInfo?.user?.role === "jms" ? data : newData;
  }, [userInfo?.user?.role, data, newData]);

  console.log(newData,"+++>>")

  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadowPng,
    shadowSize: [41, 41],
  });

  // Use a custom component to add markers with clustering
  const MarkerClusterComponent = () => {
    const map = useMap();
    useEffect(() => {
      if (!map || !renderedData.length) return;

      // Create marker cluster group
      //@ts-ignore
      const markerClusterGroup = L.markerClusterGroup();

      // Add markers to the cluster group
      renderedData.forEach((location: any) => {
        const latitude = parseFloat(location.latitude);
        const longitude = parseFloat(location.longtitude);

        const marker = L.marker([latitude, longitude], { icon: customIcon }).bindPopup(`
          <div>
            <h4>${location.name}</h4>
            <p><strong>Type:</strong> ${location.type}</p>
            <p><strong>District:</strong> ${location.district}</p>
            <p><strong>Village:</strong> ${location.village}</p>
            <p><strong>Contact:</strong> ${location.contact_person_name} - ${location.contact_person_telephone}</p>
            <p><strong>Comment:</strong> ${location.comment || "No comment"}</p>
            <p><strong>Has Dispenser:</strong> ${location.has_condom_dispenser}</p>
          </div>
        `);
        
        markerClusterGroup.addLayer(marker);
      });

      // Add cluster group to the map
      map.addLayer(markerClusterGroup);

      return () => {
        map.removeLayer(markerClusterGroup);
      };
    }, [map, renderedData, customIcon]);

    return null;
  };

  return (
    <MapContainer center={center} zoom={7} ref={mapRef} style={{ height: "800px", width: "1500px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Custom Marker Cluster component */}
      <MarkerClusterComponent />
    </MapContainer>
  );
};

export default CustomMap;
