import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { WardLocation, LocationRecommendation, ActiveThela } from '../../types';
import { AMC_VENDING_ZONES } from '../../data/vendingZones';
import { SAMPLE_ACTIVE_THELAS } from '../../data/sampleVendors';
import { generateThelaRoute } from '../../utils/geo';
import { MapLayerControls, MapLayerState } from './MapLayerControls';
import { RouteNavigator } from './RouteNavigator';

interface AhmedabadMapProps {
  selectedLocation: LocationRecommendation | null;
  recommendations: LocationRecommendation[];
  onSelectWard: (ward: WardLocation) => void;
  vendorStartLat: number;
  vendorStartLng: number;
  isNavigating: boolean;
  onStopNavigation: () => void;
}

export const AhmedabadMap: React.FC<AhmedabadMapProps> = ({
  selectedLocation,
  recommendations,
  onSelectWard,
  vendorStartLat,
  vendorStartLng,
  isNavigating,
  onStopNavigation,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  const [layers, setLayers] = useState<MapLayerState>({
    showHeatmap: true,
    showThelas: true,
    showVendingZones: true,
    showPois: true,
  });

  const handleToggleLayer = (layerKey: keyof MapLayerState) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // 1. Initialize Map with Clean Light Tiles
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered on Ahmedabad coordinates
    const map = L.map(mapContainerRef.current, {
      center: [23.0150, 72.5714],
      zoom: 12,
      zoomControl: false,
    });

    // Clean CartoDB Positron Light Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    layersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Render Overlays (Wards, Heatmap, Thelas, Vending Zones, Selected Pin, Route)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = layersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // A. Opportunity Heatmap & Ward Polygons
    if (layers.showHeatmap) {
      recommendations.forEach((rec) => {
        const score = rec.opportunityScore;
        let color = '#2d6a4f'; // Earthy Green
        let fillColor = '#52b788';
        if (score < 65) {
          color = '#dc2626'; // Red
          fillColor = '#f87171';
        } else if (score < 80) {
          color = '#d97706'; // Amber / Terracotta
          fillColor = '#fbbf24';
        }

        const isSelected = selectedLocation?.location.id === rec.location.id;

        const polygon = L.polygon(rec.location.bounds, {
          color: isSelected ? '#1b4332' : color,
          weight: isSelected ? 3.5 : 1.5,
          fillColor,
          fillOpacity: isSelected ? 0.45 : 0.22,
          dashArray: isSelected ? undefined : '4, 4',
        });

        polygon.bindPopup(`
          <div style="font-family: Outfit, sans-serif; min-width: 180px;">
            <div style="font-size: 14px; font-weight: bold; color: #1c1917; margin-bottom: 2px;">
              📍 ${rec.location.name} (${rec.location.nameGu})
            </div>
            <div style="font-size: 11px; color: #78716c; margin-bottom: 6px;">
              ${rec.location.zone} Zone • Ahmedabad
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span style="color: #44403c;">Opportunity:</span>
              <strong style="color: ${color}; font-weight: 800;">${rec.opportunityScore}/100</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span style="color: #44403c;">Demand:</span>
              <strong style="color: #2d6a4f;">${rec.demandScore}/100</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px;">
              <span style="color: #44403c;">Stability:</span>
              <strong style="color: #0369a1;">${rec.stabilityScore}/100</strong>
            </div>
            <div style="font-size: 11px; color: #b45309; border-top: 1px solid #e7e5e4; padding-top: 4px; font-weight: 600;">
              ⏰ Peak: ${rec.bestSellingWindow}
            </div>
          </div>
        `);

        polygon.on('click', () => {
          onSelectWard(rec.location);
        });

        group.addLayer(polygon);

        // Add ward opportunity badge icon in the center
        const badgeIcon = L.divIcon({
          className: 'custom-ward-badge',
          html: `
            <div style="
              background: #ffffff;
              border: 1.5px solid ${color};
              color: #1c1917;
              padding: 2px 8px;
              border-radius: 9999px;
              font-size: 11px;
              font-weight: 800;
              box-shadow: 0 3px 8px rgba(60, 50, 35, 0.16);
              white-space: nowrap;
              transform: translate(-50%, -50%);
              cursor: pointer;
            ">
              ${rec.location.name} • <span style="color:${color};">${rec.opportunityScore}</span>
            </div>
          `,
          iconSize: [0, 0],
        });

        const badgeMarker = L.marker([rec.location.lat, rec.location.lng], { icon: badgeIcon });
        badgeMarker.on('click', () => onSelectWard(rec.location));
        group.addLayer(badgeMarker);
      });
    }

    // B. AMC Vending Zones
    if (layers.showVendingZones) {
      AMC_VENDING_ZONES.forEach((vz) => {
        let vzColor = '#2d6a4f';
        let label = '🟢 AMC Vending Zone';
        if (vz.type === 'RESTRICTED_AMBER') {
          vzColor = '#d97706';
          label = '🟡 Time Restricted';
        } else if (vz.type === 'NO_VENDING') {
          vzColor = '#dc2626';
          label = '🔴 STRICT NO-VENDING';
        }

        const vzPoly = L.polygon(vz.coordinates, {
          color: vzColor,
          weight: 2,
          fillColor: vzColor,
          fillOpacity: 0.25,
        });

        vzPoly.bindPopup(`
          <div style="font-family: Outfit, sans-serif; min-width: 190px;">
            <div style="font-size: 13px; font-weight: bold; color: ${vzColor}; margin-bottom: 2px;">
              ${label}
            </div>
            <div style="font-size: 12px; font-weight: 700; color: #1c1917; margin-bottom: 4px;">
              ${vz.name}
            </div>
            <div style="font-size: 11px; color: #44403c; margin-bottom: 4px;">
              Capacity: <strong>${vz.currentOccupancy}/${vz.capacityThelas} Thelas</strong>
            </div>
            <div style="font-size: 10px; color: #78716c; font-style: italic;">
              ${vz.rules}
            </div>
          </div>
        `);

        group.addLayer(vzPoly);
      });
    }

    // C. Competing Thelas
    if (layers.showThelas) {
      SAMPLE_ACTIVE_THELAS.forEach((thela) => {
        let iconEmoji = '🛒';
        if (thela.category === 'vegetables') iconEmoji = '🥔';
        else if (thela.category === 'fruits') iconEmoji = '🍎';
        else if (thela.category === 'leafy') iconEmoji = '🥬';

        const thelaIcon = L.divIcon({
          className: 'active-thela-pin',
          html: `
            <div style="
              width: 26px;
              height: 26px;
              background: #ffffff;
              border: 1.5px solid #d97706;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.18);
            " title="${thela.vendorName} (${thela.category})">
              ${iconEmoji}
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        const marker = L.marker([thela.lat, thela.lng], { icon: thelaIcon });
        marker.bindPopup(`
          <div style="font-family: Outfit, sans-serif;">
            <div style="font-size: 13px; font-weight: bold; color: #1c1917;">${thela.vendorName}</div>
            <div style="font-size: 11px; color: #b45309; text-transform: capitalize; font-weight: 600;">${thela.category} Thela</div>
            <div style="font-size: 11px; color: #78716c;">Active since: ${thela.activeSince}</div>
            <div style="font-size: 10px; color: #44403c; margin-top: 4px;">Carrying: ${thela.products.join(', ')}</div>
          </div>
        `);
        group.addLayer(marker);
      });
    }

    // D. Vendor's Current Location Pin
    const vendorHomeIcon = L.divIcon({
      className: 'vendor-home-marker',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: #0284c7;
          border: 3px solid #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          box-shadow: 0 0 12px rgba(2, 132, 199, 0.6);
        ">
          📍
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
    const homeMarker = L.marker([vendorStartLat, vendorStartLng], { icon: vendorHomeIcon });
    homeMarker.bindPopup('<strong style="color:#0369a1;">Your Current Depot / Pushcart Location</strong>');
    group.addLayer(homeMarker);

    // E. Selected Target Destination Pin with Pulse Ring
    if (selectedLocation) {
      const targetIcon = L.divIcon({
        className: 'selected-target-marker',
        html: `
          <div class="custom-pin-pulse" style="
            width: 36px;
            height: 36px;
            background: #2d6a4f;
            border: 3px solid #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
            box-shadow: 0 0 16px rgba(45, 106, 79, 0.7);
          ">
            ⭐
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const targetMarker = L.marker([selectedLocation.location.lat, selectedLocation.location.lng], {
        icon: targetIcon,
      });
      group.addLayer(targetMarker);

      // If Navigating: Draw Animated Route Polyline and fit bounds
      if (isNavigating) {
        const routePoints = generateThelaRoute(
          vendorStartLat,
          vendorStartLng,
          selectedLocation.location.lat,
          selectedLocation.location.lng
        );

        const routeLine = L.polyline(routePoints, {
          color: '#2d6a4f',
          weight: 4,
          dashArray: '8, 8',
          opacity: 0.9,
        });
        group.addLayer(routeLine);

        map.fitBounds(routeLine.getBounds(), { padding: [60, 60], maxZoom: 14 });
      }
    }
  }, [
    layers,
    recommendations,
    selectedLocation,
    vendorStartLat,
    vendorStartLng,
    isNavigating,
    onSelectWard,
  ]);

  // Fly to selected location when selected without navigation
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedLocation || isNavigating) return;
    mapInstanceRef.current.flyTo(
      [selectedLocation.location.lat, selectedLocation.location.lng],
      13.5,
      { duration: 1.2 }
    );
  }, [selectedLocation, isNavigating]);

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-3xl overflow-hidden border border-khaki-300 shadow-md bg-khaki-150">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Layer Toggles */}
      <MapLayerControls layers={layers} onToggle={handleToggleLayer} />

      {/* Navigation Overlay */}
      {isNavigating && selectedLocation && (
        <RouteNavigator
          recommendation={selectedLocation}
          onClose={onStopNavigation}
        />
      )}
    </div>
  );
};
