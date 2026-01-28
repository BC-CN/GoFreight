import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Truck, Package, DollarSign, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { DashboardStats } from '@/types';

interface StatsOverviewProps {
  stats: DashboardStats;
}

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change: number;
  icon: React.ReactNode;
  index: number;
}

function StatCard({ title, value, unit = '', change, icon, index }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (numericValue - startValue) * easeOut;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 300 + index * 100);

    return () => clearTimeout(timer);
  }, [value, index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    setIsHovered(false);
  };

  const formatValue = (val: number) => {
    if (typeof value === 'string' && value.includes('.')) {
      return val.toFixed(1);
    }
    return Math.round(val).toString();
  };

  const isPositive = change >= 0;

  return (
    <Card
      ref={cardRef}
      className="relative p-6 cursor-pointer transition-all duration-300"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.05)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-2">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">
              {formatValue(displayValue)}
            </span>
            <span className="text-lg text-gray-600">{unit}</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-xs text-gray-400 ml-1">较昨日</span>
          </div>
        </div>
        <div 
          className={`p-3 rounded-xl transition-transform duration-500 ${isHovered ? 'rotate-[360deg]' : ''}`}
          style={{ backgroundColor: 'rgba(255, 107, 0, 0.1)' }}
        >
          <div className="text-orange-500">{icon}</div>
        </div>
      </div>
      
      {/* Animated border effect */}
      <div 
        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 transition-opacity duration-300"
        style={{ 
          opacity: isHovered ? 1 : 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.1), transparent)',
          backgroundSize: '200% 100%',
          animation: isHovered ? 'shimmer 2s infinite' : 'none',
        }}
      />
    </Card>
  );
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statsData = [
    {
      title: '今日出境订单',
      value: stats.todayOrders,
      unit: '单',
      change: stats.todayOrdersChange,
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: '在途车辆',
      value: stats.inTransitVehicles,
      unit: '辆',
      change: stats.inTransitChange,
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: '总收入',
      value: stats.totalRevenue,
      unit: '万元',
      change: stats.revenueChange,
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: '异常订单',
      value: stats.exceptionOrders,
      unit: '单',
      change: stats.exceptionChange,
      icon: <AlertTriangle className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatCard
          key={stat.title}
          {...stat}
          index={index}
        />
      ))}
    </div>
  );
}

export default StatsOverview;
