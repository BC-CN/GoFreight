import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Share2, FileText, Truck, User, MapPin, Calendar, Package, CheckCircle, Clock, AlertCircle, Download } from 'lucide-react';
import type { Waybill } from '@/types';
import { statusMap, nodeTypeMap } from '@/data/mockData';

interface WaybillManagementProps {
  waybills: Waybill[];
}

function WaybillTimeline({ nodes }: { nodes: Waybill['nodes'] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
      <div className="space-y-6">
        {nodes.map((node) => (
          <div key={node.id} className="relative flex items-start gap-4">
            <div 
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                node.status === 'completed' 
                  ? 'bg-green-500' 
                  : node.status === 'processing'
                  ? 'bg-blue-500'
                  : node.status === 'exception'
                  ? 'bg-red-500'
                  : 'bg-gray-300'
              }`}
            >
              {node.status === 'completed' ? (
                <CheckCircle className="w-4 h-4 text-white" />
              ) : node.status === 'processing' ? (
                <Clock className="w-4 h-4 text-white" />
              ) : node.status === 'exception' ? (
                <AlertCircle className="w-4 h-4 text-white" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-center justify-between">
                <h5 className="font-medium text-gray-900">{nodeTypeMap[node.type]}</h5>
                {node.timestamp && (
                  <span className="text-xs text-gray-500">{node.timestamp}</span>
                )}
              </div>
              {node.location && (
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {node.location}
                </p>
              )}
              {node.operator && (
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  操作人: {node.operator}
                </p>
              )}
              {node.remark && (
                <p className="text-sm text-gray-500 mt-1">{node.remark}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WaybillDetailDialog({ waybill, open, onClose }: { waybill: Waybill | null; open: boolean; onClose: () => void }) {
  if (!waybill) return null;

  const statusInfo = statusMap[waybill.status] || { label: '未知', color: '#6B7280', bgColor: '#F3F4F6' };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>运单详情</span>
            <span className="text-lg text-gray-500">{waybill.waybillNo}</span>
            <Badge 
              style={{ 
                backgroundColor: statusInfo.bgColor, 
                color: statusInfo.color,
                borderColor: statusInfo.color 
              }}
              variant="outline"
            >
              {statusInfo.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Basic Info */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-500" />
              基本信息
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">客户名称</span>
                <span className="text-gray-900">{waybill.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">起始地</span>
                <span className="text-gray-900">{waybill.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">目的地</span>
                <span className="text-gray-900">{waybill.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">货物类型</span>
                <span className="text-gray-900">{waybill.goodsType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">重量</span>
                <span className="text-gray-900">{waybill.weight}kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">车辆类型</span>
                <span className="text-gray-900">{waybill.vehicleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">订单金额</span>
                <span className="text-gray-900 font-semibold">¥{waybill.orderAmount.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Vehicle & Driver Info */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-500" />
              车辆与司机信息
            </h4>
            {waybill.vehicleInfo ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">车头号</span>
                  <span className="text-gray-900">{waybill.vehicleInfo.headNo}</span>
                </div>
                {waybill.vehicleInfo.trailerNo && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">挂车号</span>
                    <span className="text-gray-900">{waybill.vehicleInfo.trailerNo}</span>
                  </div>
                )}
                {waybill.driverInfo && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">司机姓名</span>
                      <span className="text-gray-900">{waybill.driverInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">联系电话</span>
                      <span className="text-gray-900">{waybill.driverInfo.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">驾驶证号</span>
                      <span className="text-gray-900">{waybill.driverInfo.licenseNo}</span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">暂无车辆信息</p>
            )}
          </Card>

          {/* Timeline */}
          <Card className="p-4 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              运输节点时间轴
            </h4>
            <WaybillTimeline nodes={waybill.nodes} />
          </Card>

          {/* Documents */}
          <Card className="p-4 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-orange-500" />
              相关单据
            </h4>
            {waybill.documents.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {waybill.documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-900 truncate">{doc.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">上传人: {doc.uploader}</p>
                    <p className="text-xs text-gray-500">{doc.uploadTime}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">暂无单据</p>
            )}
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function WaybillManagement({ waybills }: WaybillManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedWaybill, setSelectedWaybill] = useState<Waybill | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredWaybills = waybills.filter(waybill => {
    const matchesSearch = waybill.waybillNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         waybill.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || waybill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (waybill: Waybill) => {
    setSelectedWaybill(waybill);
    setDetailOpen(true);
  };

  const handleShare = (waybill: Waybill) => {
    // Generate shareable link
    const shareUrl = `${window.location.origin}/waybill/${waybill.waybillNo}`;
    navigator.clipboard.writeText(shareUrl);
    alert(`运单链接已复制: ${shareUrl}`);
  };

  const handleExport = () => {
    // Export data to CSV
    const headers = ['运单号', '客户', '起始地', '目的地', '货物类型', '重量(kg)', '状态', '金额(元)', '创建时间'];
    const rows = filteredWaybills.map(w => [
      w.waybillNo,
      w.customerName,
      w.origin,
      w.destination,
      w.goodsType,
      w.weight,
      statusMap[w.status]?.label || w.status,
      w.orderAmount,
      w.createTime,
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `运单列表_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div ref={sectionRef}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">运单管理</h3>
          <p className="text-sm text-gray-500 mt-1">查看和管理所有运输运单</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索运单号或客户..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">全部状态</option>
            <option value="finding_vehicle">找车中</option>
            <option value="in_transit">运输中</option>
            <option value="exited">已出境</option>
            <option value="completed">已完成</option>
            <option value="exception">异常</option>
          </select>
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            导出
          </Button>
        </div>
      </div>

      <Card 
        className="overflow-hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">运单号</TableHead>
                <TableHead className="text-gray-700">客户</TableHead>
                <TableHead className="text-gray-700">线路</TableHead>
                <TableHead className="text-gray-700">状态</TableHead>
                <TableHead className="text-gray-700">金额</TableHead>
                <TableHead className="text-gray-700">创建时间</TableHead>
                <TableHead className="text-gray-700">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWaybills.map((waybill, index) => {
                const statusInfo = statusMap[waybill.status] || { label: '未知', color: '#6B7280', bgColor: '#F3F4F6' };
                return (
                  <TableRow 
                    key={waybill.id}
                    className="hover:bg-gray-50 transition-colors"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    <TableCell className="font-medium">{waybill.waybillNo}</TableCell>
                    <TableCell>{waybill.customerName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{waybill.origin}</div>
                        <div className="text-gray-400">→ {waybill.destination}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        style={{ 
                          backgroundColor: statusInfo.bgColor, 
                          color: statusInfo.color 
                        }}
                      >
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>¥{waybill.orderAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-gray-500">{waybill.createTime}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(waybill)}
                          className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(waybill)}
                          className="text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      <WaybillDetailDialog
        waybill={selectedWaybill}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}

export default WaybillManagement;
