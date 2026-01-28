import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle, DollarSign, Clock, FileWarning } from 'lucide-react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';
import type { FinancialTrend, FinancialRisk, HighRiskOrder } from '@/types';

interface FinancialRiskProps {
  trendData: FinancialTrend[];
  riskData: FinancialRisk;
  highRiskOrders: HighRiskOrder[];
}

function FinancialChart({ data, isVisible }: { data: FinancialTrend[]; isVisible: boolean }) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isVisible]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          key={animationKey}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
            formatter={(value: number) => [`${value}万元`, '']}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            name="收入"
            stroke="#FF6B00"
            strokeWidth={2}
            fill="url(#revenueGradient)"
            animationDuration={1500}
            animationBegin={0}
          />
          <Area
            type="monotone"
            dataKey="cost"
            name="成本"
            stroke="#6B7280"
            strokeWidth={2}
            fill="transparent"
            strokeDasharray="5 5"
            animationDuration={1500}
            animationBegin={200}
          />
          <Line
            type="monotone"
            dataKey="profit"
            name="毛利"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            animationDuration={1500}
            animationBegin={400}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

interface RiskMetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  isVisible: boolean;
  index: number;
}

function RiskMetricCard({ title, value, unit, icon, color, isVisible, index }: RiskMetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const duration = 1000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(value * easeOut);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, index * 150);
    }
  }, [isVisible, value, index]);

  return (
    <div 
      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-500 hover:shadow-md"
      style={{ 
        backgroundColor: `${color}15`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div 
        className="p-3 rounded-lg"
        style={{ backgroundColor: `${color}25` }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-900">
          {displayValue.toFixed(1)}
          <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
        </p>
      </div>
    </div>
  );
}

interface HighRiskOrdersListProps {
  orders: HighRiskOrder[];
  isVisible: boolean;
}

function HighRiskOrdersList({ orders, isVisible }: HighRiskOrdersListProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getRiskText = (level: string) => {
    switch (level) {
      case 'high':
        return '高风险';
      case 'medium':
        return '中风险';
      default:
        return '低风险';
    }
  };

  return (
    <div className="space-y-3 max-h-[280px] overflow-y-auto">
      {orders.map((order, index) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transitionDelay: `${index * 80}ms`,
          }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-900">{order.waybillNo}</span>
              <Badge variant="outline" className={getRiskColor(order.riskLevel)}>
                {getRiskText(order.riskLevel)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{order.riskReason}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {(order.amount / 10000).toFixed(1)}万
            </p>
            <p className="text-xs text-gray-500">涉及金额</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FinancialRiskSection({ trendData, riskData, highRiskOrders }: FinancialRiskProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const riskMetrics = [
    {
      title: '异常损失',
      value: riskData.exceptionLoss,
      unit: '万元',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: '#EF4444',
    },
    {
      title: '未结算金额',
      value: riskData.unsettledAmount,
      unit: '万元',
      icon: <DollarSign className="w-5 h-5" />,
      color: '#F59E0B',
    },
    {
      title: '超期账款',
      value: riskData.overdueAmount,
      unit: '万元',
      icon: <Clock className="w-5 h-5" />,
      color: '#EF4444',
    },
  ];

  return (
    <div ref={sectionRef}>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">财务与风险</h3>
        <p className="text-sm text-gray-500 mt-1">收入成本趋势与风险订单监控</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Trend Chart */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-base font-semibold text-gray-900">收入/成本/毛利趋势</h4>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-gray-600">收入</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500" />
                <span className="text-gray-600">成本</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-600">毛利</span>
              </div>
            </div>
          </div>
          <FinancialChart data={trendData} isVisible={isVisible} />
        </Card>

        {/* Risk Metrics */}
        <div className="space-y-4">
          {riskMetrics.map((metric, index) => (
            <RiskMetricCard
              key={metric.title}
              {...metric}
              isVisible={isVisible}
              index={index}
            />
          ))}
          
          {/* Gross Margin */}
          <Card 
            className="p-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease 0.45s',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">毛利率</p>
                  <p className="text-xl font-bold text-gray-900">25%</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+2%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* High Risk Orders */}
        <Card className="p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileWarning className="w-5 h-5 text-red-500" />
              </div>
              <h4 className="text-base font-semibold text-gray-900">高风险订单</h4>
            </div>
            <Badge variant="outline" className="text-red-500 border-red-200">
              需重点关注
            </Badge>
          </div>
          <HighRiskOrdersList orders={highRiskOrders} isVisible={isVisible} />
        </Card>
      </div>
    </div>
  );
}

export default FinancialRiskSection;
