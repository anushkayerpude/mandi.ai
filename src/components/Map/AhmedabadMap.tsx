import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { WardLocation, LocationRecommendation, ActiveThela, VendingZone } from '../../types';
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

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered on Ahmedabad coordinates
    const map = L.map(mapContainerRef.current, {
      center: [23.0150, 72.5714],
      zoom: 12,
      zoomControl: false,
    });

    // Dark sleek CartoDB tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
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

    // Map recommendation score dictionary
    const oppMap = new Map<string, number>();
    recommendations.forEach((r) => oppMap.set(r.location.id, r.opportunityScore));

    // A. Opportunity Heatmap & Ward Polygons
    if (layers.showHeatmap) {
      recommendations.forEach((rec) => {
        const score = rec.opportunityScore;
        let color = '#10b981'; // Green
        let fillColor = '#059669';
        if (score < 65) {
          color = '#ef4444'; // Red
          fillColor = '#dc2626';
        } else if (score < 80) {
          color = '#f59e0b'; // Yellow / Amber
          fillColor = '#d97706';
        }

        const isSelected = selectedLocation?.location.id === rec.location.id;

        const polygon = L.polygon(rec.location.bounds, {
          color: isSelected ? '#34d399' : color,
          weight: isSelected ? 3 : 1.5,
          fillColor,
          fillOpacity: isSelected ? 0.35 : 0.18,
          dashArray: isSelected ? undefined : '4, 4',
        });

        polygon.bindPopup(`
          <div style="font-family: Outfit, sans-serif; min-width: 180px;">
            <div style="font-size: 14px; font-weight: bold; color: #fff; margin-bottom: 2px;">
              📍 ${rec.location.name} (${rec.location.nameGu})
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 6px;">
              ${rec.location.zone} Zone • Ahmedabad
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span style="color: #cbd5e1;">Opportunity:</span>
              <strong style="color: ${color};">${rec.opportunityScore}/100</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span style="color: #cbd5e1;">Demand:</span>
              <strong style="color: #6ee7b7;">${rec.demandScore}/100</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px;">
              <span style="color: #cbd5e1;">Stability:</span>
              <strong style="color: #38bdf8;">${rec.stabilityScore}/100</strong>
            </div>
            <div style="font-size: 11px; color: #fbbf24; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4px;">
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
              background: rgba(15, 23, 42, 0.9);
              border: 1px solid ${color};
              color: ${color};
              padding: 2px 7px;
              border-radius: 9999px;
              font-size: 11px;
              font-weight: 700;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
              white-space: nowrap;
              transform: translate(-50%, -50%);
              cursor: pointer;
            ">
              ${rec.location.name} • ${rec.opportunityScore}
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
        let vzColor = '#10b981';
        let label = '🟢 AMC Vending Zone';
        if (vz.type === 'RESTRICTED_AMBER') {
          vzColor = '#f59e0b';
          label = '🟡 Time Restricted';
        } else if (vz.type === 'NO_VENDING') {
          vzColor = '#ef4444';
          label = '🔴 STRICT NO-VENDING';
        }

        const vzPoly = L.polygon(vz.coordinates, {
          color: vzColor,
          weight: 2,
          fillColor: vzColor,
          fillOpacity: 0.28,
        });

        vzPoly.bindPopup(`
          <div style="font-family: Outfit, sans-serif; min-width: 190px;">
            <div style="font-size: 13px; font-weight: bold; color: ${vzColor}; margin-bottom: 2px;">
              ${label}
            </div>
            <div style="font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 4px;">
              ${vz.name}
            </div>
            <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 4px;">
              Capacity: ${vz.currentOccupancy}/${vz.capacityThelas} Thelas
            </div>
            <div style="font-size: 10px; color: #94a3b8; font-style: italic;">
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
              width: 24px;
              height: 24px;
              background: rgba(30, 41, 59, 0.95);
              border: 1px solid #fbbf24;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.5);
            " title="${thela.vendorName} (${thela.category})">
              ${iconEmoji}
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([thela.lat, thela.lng], { icon: thelaIcon });
        marker.bindPopup(`
          <div style="font-family: Outfit, sans-serif;">
            <div style="font-size: 13px; font-weight: bold; color: #fff;">${thela.vendorName}</div>
            <div style="font-size: 11px; color: #fbbf24; text-transform: capitalize;">${thela.category} Thela</div>
            <div style="font-size: 11px; color: #94a3b8;">Active since: ${thela.activeSince}</div>
            <div style="font-size: 10px; color: #cbd5e1; margin-top: 4px;">Carrying: ${thela.products.join(', ')}</div>
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
          box-shadow: 0 0 16px rgba(2, 132, 199, 0.8);
        ">
          📍
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
    const homeMarker = L.marker([vendorStartLat, vendorStartLng], { icon: vendorHomeIcon });
    homeMarker.bindPopup('<strong style="color:#38bdf8;">Your Current Depot / Pushcart Location</strong>');
    group.addLayer(homeMarker);

    // E. Selected Target Destination Pin with Pulse Ring
    if (selectedLocation) {
      const targetIcon = L.divIcon({
        className: 'selected-target-marker',
        html: `
          <div class="custom-pin-pulse" style="
            width: 36px;
            height: 36px;
            background: #10b981;
            border: 3px solid #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.9);
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
          color: '#34d399',
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
    <div className="relative w-full h-full min-h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slateDark-900">
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
