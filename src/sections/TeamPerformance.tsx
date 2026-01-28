import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, TrendingDown, User, Users } from 'lucide-react';
import type { OperatorPerformance, SalesmanPerformance } from '@/types';

interface TeamPerformanceProps {
  operators: OperatorPerformance[];
  salesmen: SalesmanPerformance[];
}

interface OperatorTableProps {
  data: OperatorPerformance[];
  isVisible: boolean;
}

function OperatorTable({ data, isVisible }: OperatorTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const getOvertimeRateColor = (rate: number) => {
    if (rate <= 5) return 'bg-green-100 text-green-700';
    if (rate <= 8) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-gray-700">操作员</TableHead>
            <TableHead className="text-gray-700">处理单量</TableHead>
            <TableHead className="text-gray-700">平均处理时长</TableHead>
            <TableHead className="text-gray-700">超时率</TableHead>
            <TableHead className="text-gray-700">状态</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((operator, index) => (
            <TableRow
              key={operator.id}
              className="transition-all duration-300 cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${index * 60}ms`,
                backgroundColor: hoveredRow === operator.id ? '#FFF0E5' : 'transparent',
              }}
              onMouseEnter={() => setHoveredRow(operator.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="font-medium text-gray-900">{operator.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-gray-900">{operator.orderCount}</span>
                <span className="text-xs text-gray-500 ml-1">单</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-700">{operator.avgProcessTime}</span>
                <span className="text-xs text-gray-500 ml-1">分钟</span>
              </TableCell>
              <TableCell>
                <Badge className={getOvertimeRateColor(operator.overtimeRate)}>
                  {operator.overtimeRate}%
                </Badge>
              </TableCell>
              <TableCell>
                {operator.isHighRisk ? (
                  <div className="flex items-center gap-1 text-red-500">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">高风险</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">正常</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface SalesmanTableProps {
  data: SalesmanPerformance[];
  isVisible: boolean;
}

function SalesmanTable({ data, isVisible }: SalesmanTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const getExceptionRateColor = (rate: number) => {
    if (rate <= 3) return 'bg-green-100 text-green-700';
    if (rate <= 5) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-gray-700">业务员</TableHead>
            <TableHead className="text-gray-700">订单规模</TableHead>
            <TableHead className="text-gray-700">异常率</TableHead>
            <TableHead className="text-gray-700">状态</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((salesman, index) => (
            <TableRow
              key={salesman.id}
              className="transition-all duration-300 cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${index * 60}ms`,
                backgroundColor: hoveredRow === salesman.id ? '#FFF0E5' : 'transparent',
              }}
              onMouseEnter={() => setHoveredRow(salesman.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="font-medium text-gray-900">{salesman.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-gray-900">{salesman.orderScale}</span>
                <span className="text-xs text-gray-500 ml-1">万元</span>
              </TableCell>
              <TableCell>
                <Badge className={getExceptionRateColor(salesman.exceptionRate)}>
                  {salesman.exceptionRate}%
                </Badge>
              </TableCell>
              <TableCell>
                {salesman.isHighRisk ? (
                  <div className="flex items-center gap-1 text-red-500">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">高风险</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">低风险</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function TeamPerformance({ operators, salesmen }: TeamPerformanceProps) {
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
        <h3 className="text-lg font-bold text-gray-900">团队绩效</h3>
        <p className="text-sm text-gray-500 mt-1">操作员与业务员绩效评估</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operator Performance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="w-5 h-5 text-orange-500" />
              </div>
              <h4 className="text-base font-semibold text-gray-900">操作员绩效</h4>
            </div>
            <Badge variant="outline" className="text-xs">
              按单量排序
            </Badge>
          </div>
          <OperatorTable data={operators} isVisible={isVisible} />
        </Card>

        {/* Salesman Performance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <h4 className="text-base font-semibold text-gray-900">业务员绩效</h4>
            </div>
            <Badge variant="outline" className="text-xs">
              按规模排序
            </Badge>
          </div>
          <SalesmanTable data={salesmen} isVisible={isVisible} />
        </Card>
      </div>
    </div>
  );
}

export default TeamPerformance;
