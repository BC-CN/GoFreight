import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import type { CountryData, RouteData } from '@/types';

interface MapVisualizationProps {
  countries: CountryData[];
  routes: RouteData[];
}

interface CountryMarkerProps {
  country: CountryData;
  x: number;
  y: number;
  isActive: boolean;
  onClick: () => void;
}

function CountryMarker({ country, x, y, isActive, onClick }: CountryMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const total = country.inTransit + country.exited + country.exception;
  
  return (
    <g 
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Pulse animation */}
      <circle
        cx={x}
        cy={y}
        r={isActive ? 25 : 15}
        fill="none"
        stroke="#FF6B00"
        strokeWidth={2}
        opacity={isActive ? 0.6 : 0}
        className={isActive ? 'animate-ping' : ''}
        style={{ animationDuration: '2s' }}
      />
      
      {/* Main circle */}
      <circle
        cx={x}
        cy={y}
        r={isHovered || isActive ? 18 : 12}
        fill={isActive ? '#FF6B00' : '#fff'}
        stroke="#FF6B00"
        strokeWidth={3}
        className="transition-all duration-300"
      />
      
      {/* Inner dot */}
      <circle
        cx={x}
        cy={y}
        r={6}
        fill={isActive ? '#fff' : '#FF6B00'}
        className="transition-all duration-300"
      />
      
      {/* Label */}
      <text
        x={x}
        y={y + 35}
        textAnchor="middle"
        className="text-xs font-medium fill-gray-700"
        style={{ fontSize: '12px' }}
      >
        {country.nameCN}
      </text>
      
      {/* Stats tooltip on hover */}
      {(isHovered || isActive) && (
        <g>
          <rect
            x={x - 70}
            y={y - 110}
            width={140}
            height={90}
            rx={8}
            fill="white"
            stroke="#E5E5E5"
            strokeWidth={1}
            className="drop-shadow-lg"
          />
          <text x={x} y={y - 90} textAnchor="middle" className="text-sm font-bold fill-gray-900">
            {country.nameCN}
          </text>
          <text x={x - 60} y={y - 70} className="text-xs fill-gray-500">在途: {country.inTransit}</text>
          <text x={x - 60} y={y - 55} className="text-xs fill-gray-500">已出境: {country.exited}</text>
          <text x={x - 60} y={y - 40} className="text-xs fill-red-500">异常: {country.exception}</text>
          <text x={x} y={y - 25} textAnchor="middle" className="text-xs font-medium fill-orange-500">
            总计: {total}
          </text>
        </g>
      )}
    </g>
  );
}

interface RouteLineProps {
  route: RouteData;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isActive: boolean;
}

function RouteLine({ route, x1, y1, x2, y2, isActive }: RouteLineProps) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 - 30;
  
  // Calculate control point for curved line
  const cpX = midX;
  const cpY = midY;
  
  const pathD = `M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`;
  
  return (
    <g className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      {/* Background line */}
      <path
        d={pathD}
        fill="none"
        stroke="#E5E5E5"
        strokeWidth={4}
        strokeLinecap="round"
      />
      
      {/* Animated dashed line */}
      <path
        d={pathD}
        fill="none"
        stroke="#FF6B00"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="8 4"
        className={isActive ? 'animate-dash' : ''}
        style={{
          animation: isActive ? 'dash 1s linear infinite' : 'none',
        }}
      />
      
      {/* Efficiency badge */}
      {isActive && (
        <g>
          <circle cx={midX} cy={midY + 30} r={20} fill="white" stroke="#FF6B00" strokeWidth={2} />
          <text x={midX} y={midY + 35} textAnchor="middle" className="text-xs font-bold fill-orange-500">
            {route.efficiency}%
          </text>
        </g>
      )}
    </g>
  );
}

export function MapVisualization({ countries, routes }: MapVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [activeRoute] = useState<string | null>(null);

  // Map coordinates (simplified for demo)
  const mapCoordinates: Record<string, { x: number; y: number }> = {
    KZ: { x: 300, y: 180 },
    UZ: { x: 280, y: 280 },
    KG: { x: 380, y: 260 },
    TJ: { x: 320, y: 320 },
    TM: { x: 200, y: 260 },
    CN: { x: 500, y: 200 },
  };

  // Route coordinates
  const routeCoordinates = [
    { from: 'CN', to: 'KZ', routeId: '1' },
    { from: 'CN', to: 'UZ', routeId: '2' },
    { from: 'CN', to: 'KG', routeId: '3' },
    { from: 'CN', to: 'TJ', routeId: '4' },
    { from: 'CN', to: 'KZ', routeId: '5' },
  ];

  useEffect(() => {
    // Auto-cycle through countries
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * countries.length);
      setActiveCountry(countries[randomIndex]?.code);
    }, 3000);

    return () => clearInterval(interval);
  }, [countries]);

  return (
    <Card className="p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">出境国家/地区分布</h3>
          <p className="text-sm text-gray-500 mt-1">实时展示各国家车辆分布情况</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-gray-600">活跃</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <span className="text-gray-600">非活跃</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl overflow-hidden">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #E5E5E5 1px, transparent 1px),
              linear-gradient(to bottom, #E5E5E5 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        <svg
          ref={svgRef}
          viewBox="0 0 600 450"
          className="w-full h-full"
          style={{ minHeight: '500px' }}
        >
          {/* Route lines */}
          {routeCoordinates.map((rc) => {
            const from = mapCoordinates[rc.from];
            const to = mapCoordinates[rc.to];
            if (!from || !to) return null;
            return (
              <RouteLine
                key={rc.routeId}
                route={routes.find(r => r.id === rc.routeId) || routes[0]}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                isActive={activeRoute === rc.routeId}
              />
            );
          })}

          {/* China marker (origin) */}
          <g>
            <circle
              cx={mapCoordinates.CN.x}
              cy={mapCoordinates.CN.y}
              r={20}
              fill="#FF6B00"
              className="animate-pulse"
              style={{ animationDuration: '2s' }}
            />
            <text
              x={mapCoordinates.CN.x}
              y={mapCoordinates.CN.y + 5}
              textAnchor="middle"
              className="text-xs font-bold fill-white"
            >
              中国
            </text>
          </g>

          {/* Country markers */}
          {countries.map((country) => {
            const coords = mapCoordinates[country.code];
            if (!coords) return null;
            return (
              <CountryMarker
                key={country.code}
                country={country}
                x={coords.x}
                y={coords.y}
                isActive={activeCountry === country.code}
                onClick={() => setActiveCountry(country.code)}
              />
            );
          })}
        </svg>

        {/* Legend panel */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">业务统计</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-8">
              <span className="text-gray-500">在途车辆</span>
              <span className="font-medium text-gray-900">
                {countries.reduce((sum, c) => sum + c.inTransit, 0)}
              </span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-500">已出境</span>
              <span className="font-medium text-gray-900">
                {countries.reduce((sum, c) => sum + c.exited, 0)}
              </span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-500">异常</span>
              <span className="font-medium text-red-500">
                {countries.reduce((sum, c) => sum + c.exception, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -24;
          }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
      `}</style>
    </Card>
  );
}

export default MapVisualization;
