import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Clock } from 'lucide-react';
import type { NodeEfficiency, ExceptionData, ExceptionOrder } from '@/types';

interface ProcessEfficiencyProps {
  nodeEfficiency: NodeEfficiency[];
  exceptionTypes: ExceptionData[];
  exceptionOrders: ExceptionOrder[];
}

interface BarChartProps {
  data: NodeEfficiency[];
  isVisible: boolean;
}

function BarChart({ data, isVisible }: BarChartProps) {
  const maxTime = Math.max(...data.map(d => d.avgTime));

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={item.node} className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{item.node}</span>
            <div className="flex items-center gap-2">
              {item.isOverThreshold && (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-semibold ${item.isOverThreshold ? 'text-red-500' : 'text-gray-900'}`}>
                {item.avgTime}分钟
              </span>
            </div>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                item.isOverThreshold ? 'bg-red-500' : 'bg-gradient-to-r from-orange-400 to-orange-500'
              }`}
              style={{
                width: isVisible ? `${(item.avgTime / maxTime) * 100}%` : '0%',
                transitionDelay: `${index * 150}ms`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">阈值: {item.threshold}分钟</span>
            {item.isOverThreshold && (
              <span className="text-xs text-red-500 font-medium">
                超出{(item.avgTime - item.threshold).toFixed(0)}分钟
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

interface DonutChartProps {
  data: ExceptionData[];
  isVisible: boolean;
}

function DonutChart({ data, isVisible }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  const colors = ['#EF4444', '#F59E0B', '#3B82F6', '#6B7280'];
  
  let currentAngle = 0;
  
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#E5E5E5"
            strokeWidth="12"
          />
          
          {/* Data segments */}
          {data.map((item, index) => {
            const angle = (item.percentage / total) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;
            
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = ((startAngle + angle) * Math.PI) / 180;
            
            const x1 = 50 + 40 * Math.cos(startRad);
            const y1 = 50 + 40 * Math.sin(startRad);
            const x2 = 50 + 40 * Math.cos(endRad);
            const y2 = 50 + 40 * Math.sin(endRad);
            
            const largeArc = angle > 180 ? 1 : 0;
            
            const pathD = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            return (
              <path
                key={item.type}
                d={pathD}
                fill={colors[index]}
                className="transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 100}ms`,
                }}
              />
            );
          })}
          
          {/* Center hole */}
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="white"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-lg font-bold text-gray-900">{data.reduce((sum, d) => sum + d.count, 0)}</span>
            <span className="text-xs text-gray-500 block">异常</span>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex-1 space-y-2">
        {data.map((item, index) => (
          <div
            key={item.type}
            className="flex items-center justify-between text-sm"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
              transition: `all 0.5s ease ${index * 100 + 400}ms`,
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index] }}
              />
              <span className="text-gray-600">{item.type}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900">{item.count}</span>
              <span className="text-xs text-gray-400">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ExceptionListProps {
  orders: ExceptionOrder[];
  isVisible: boolean;
}

function ExceptionList({ orders, isVisible }: ExceptionListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待处理';
      case 'processing':
        return '处理中';
      case 'resolved':
        return '已解决';
      default:
        return '未知';
    }
  };

  return (
    <div className="space-y-3 max-h-[280px] overflow-y-auto">
      {orders.map((order, index) => (
        <div
          key={order.id}
          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transitionDelay: `${index * 80}ms`,
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">{order.waybillNo}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{order.route}</p>
              <p className="text-sm text-gray-700">{order.description}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{order.occurTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProcessEfficiency({ nodeEfficiency, exceptionTypes, exceptionOrders }: ProcessEfficiencyProps) {
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

  return (
    <div ref={sectionRef}>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">流程效率与异常</h3>
        <p className="text-sm text-gray-500 mt-1">各节点耗时分析与异常类型分布</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Node Efficiency */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-base font-semibold text-gray-900">节点平均耗时</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>超阈值标红</span>
            </div>
          </div>
          <BarChart data={nodeEfficiency} isVisible={isVisible} />
        </Card>

        {/* Exception Analysis */}
        <Card className="p-6">
          <h4 className="text-base font-semibold text-gray-900 mb-6">异常类型分布</h4>
          <DonutChart data={exceptionTypes} isVisible={isVisible} />
        </Card>

        {/* Exception Orders List */}
        <Card className="p-6 lg:col-span-2">
          <h4 className="text-base font-semibold text-gray-900 mb-4">近期异常订单</h4>
          <ExceptionList orders={exceptionOrders} isVisible={isVisible} />
        </Card>
      </div>
    </div>
  );
}

export default ProcessEfficiency;
