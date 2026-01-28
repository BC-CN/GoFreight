import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign,
  Package,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { customerList, getCreditLevelColor, getStatusColor, getCustomerOrders } from '@/data/customerData';
import { waybillList } from '@/data/mockData';
import type { Customer } from '@/data/customerData';
import type { Waybill } from '@/types';

interface CustomerManagementProps {
  waybills?: Waybill[];
}

function CustomerDetailDialog({ 
  customer, 
  open, 
  onClose,
  waybills
}: { 
  customer: Customer | null; 
  open: boolean; 
  onClose: () => void;
  waybills: Waybill[];
}) {
  if (!customer) return null;

  const creditInfo = getCreditLevelColor(customer.creditLevel);
  const statusInfo = getStatusColor(customer.cooperationStatus);
  const customerOrders = getCustomerOrders(customer.id, waybills);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>客户详情</span>
            <Badge className={`${creditInfo.bg} ${creditInfo.text}`}>
              信用{creditInfo.label}
            </Badge>
            <Badge className={`${statusInfo.bg} ${statusInfo.text}`}>
              {statusInfo.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">基本信息</TabsTrigger>
            <TabsTrigger value="statistics">业务统计</TabsTrigger>
            <TabsTrigger value="orders">关联订单</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-3">公司信息</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">客户名称</span>
                    <span className="font-medium">{customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">注册日期</span>
                    <span>{customer.registerDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">信用等级</span>
                    <Badge className={`${creditInfo.bg} ${creditInfo.text}`}>
                      {customer.creditLevel}级
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">合作状态</span>
                    <Badge className={`${statusInfo.bg} ${statusInfo.text}`}>
                      {statusInfo.label}
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-3">联系方式</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-sm">{customer.address}</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">备注</h4>
              <p className="text-gray-700">{customer.remark}</p>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <Package className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{customer.totalOrders}</p>
                <p className="text-sm text-gray-500">累计订单</p>
              </Card>
              <Card className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{(customer.totalAmount / 10000).toFixed(0)}万</p>
                <p className="text-sm text-gray-500">累计金额</p>
              </Card>
              <Card className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{(customer.unsettledAmount / 10000).toFixed(1)}万</p>
                <p className="text-sm text-gray-500">未结算金额</p>
              </Card>
              <Card className="p-4 text-center">
                <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">{customer.lastOrderDate}</p>
                <p className="text-sm text-gray-500">最近订单</p>
              </Card>
            </div>

            <Card className="p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-4">月度订单趋势</h4>
              <div className="h-48 flex items-end justify-around gap-2">
                {[65, 78, 52, 89, 95, 110, 85, 92, 105, 88, 76, 82].map((value, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-orange-200 rounded-t hover:bg-orange-300 transition-colors"
                      style={{ height: `${value * 1.5}px` }}
                    />
                    <span className="text-xs text-gray-500 mt-1">{index + 1}月</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-4">
                关联订单 ({customerOrders.length})
              </h4>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {customerOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{order.waybillNo}</span>
                        <span className="text-sm text-gray-500 ml-2">{order.origin} → {order.destination}</span>
                      </div>
                      <Badge 
                        variant="outline"
                        className={
                          order.status === 'completed' ? 'border-green-500 text-green-600' :
                          order.status === 'exception' ? 'border-red-500 text-red-600' :
                          'border-blue-500 text-blue-600'
                        }
                      >
                        {order.status === 'completed' ? '已完成' :
                         order.status === 'exception' ? '异常' :
                         order.status === 'in_transit' ? '运输中' : '处理中'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <span>金额: ¥{order.orderAmount.toLocaleString()}</span>
                      <span>创建时间: {order.createTime}</span>
                    </div>
                  </div>
                ))}
                {customerOrders.length === 0 && (
                  <p className="text-center text-gray-500 py-8">暂无关联订单</p>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export function CustomerManagement({ waybills = waybillList }: CustomerManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [creditFilter, setCreditFilter] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
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

  const filteredCustomers = customerList.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || customer.cooperationStatus === statusFilter;
    const matchesCredit = creditFilter === 'all' || customer.creditLevel === creditFilter;
    return matchesSearch && matchesStatus && matchesCredit;
  });

  const handleViewDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDetailOpen(true);
  };

  const stats = {
    total: customerList.length,
    active: customerList.filter(c => c.cooperationStatus === 'active').length,
    inactive: customerList.filter(c => c.cooperationStatus === 'inactive').length,
    suspended: customerList.filter(c => c.cooperationStatus === 'suspended').length,
    totalAmount: customerList.reduce((sum, c) => sum + c.totalAmount, 0),
    unsettledAmount: customerList.reduce((sum, c) => sum + c.unsettledAmount, 0),
  };

  return (
    <div ref={sectionRef} className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card 
          className="p-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Star className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-gray-500">客户总数</p>
            </div>
          </div>
        </Card>
        <Card 
          className="p-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 0.1s',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.active}</p>
              <p className="text-sm text-gray-500">合作中</p>
            </div>
          </div>
        </Card>
        <Card 
          className="p-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 0.2s',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{(stats.totalAmount / 100000000).toFixed(2)}亿</p>
              <p className="text-sm text-gray-500">累计金额</p>
            </div>
          </div>
        </Card>
        <Card 
          className="p-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 0.3s',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{(stats.unsettledAmount / 10000).toFixed(0)}万</p>
              <p className="text-sm text-gray-500">未结算</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card 
        className="p-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease 0.2s',
        }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索客户名称、联系人或电话..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">全部状态</option>
            <option value="active">合作中</option>
            <option value="inactive">未合作</option>
            <option value="suspended">已暂停</option>
          </select>
          <select
            value={creditFilter}
            onChange={(e) => setCreditFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">全部信用</option>
            <option value="A">A级-优秀</option>
            <option value="B">B级-良好</option>
            <option value="C">C级-一般</option>
            <option value="D">D级-较差</option>
          </select>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            新增客户
          </Button>
        </div>
      </Card>

      {/* Customer List */}
      <Card 
        className="overflow-hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease 0.3s',
        }}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">客户名称</TableHead>
                <TableHead className="text-gray-700">联系人</TableHead>
                <TableHead className="text-gray-700">联系方式</TableHead>
                <TableHead className="text-gray-700">信用等级</TableHead>
                <TableHead className="text-gray-700">状态</TableHead>
                <TableHead className="text-gray-700">累计订单</TableHead>
                <TableHead className="text-gray-700">累计金额</TableHead>
                <TableHead className="text-gray-700">未结算</TableHead>
                <TableHead className="text-gray-700">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer, index) => {
                const creditInfo = getCreditLevelColor(customer.creditLevel);
                const statusInfo = getStatusColor(customer.cooperationStatus);
                return (
                  <TableRow 
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                      transitionDelay: `${0.3 + index * 0.05}s`,
                    }}
                  >
                    <TableCell>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                    </TableCell>
                    <TableCell>{customer.contact}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{customer.phone}</div>
                        <div className="text-gray-400">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${creditInfo.bg} ${creditInfo.text}`}>
                        {customer.creditLevel}级
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusInfo.bg} ${statusInfo.text}`}>
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>{(customer.totalAmount / 10000).toFixed(0)}万</TableCell>
                    <TableCell>
                      <span className={customer.unsettledAmount > 0 ? 'text-red-500' : 'text-gray-500'}>
                        {(customer.unsettledAmount / 10000).toFixed(1)}万
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(customer)}
                          className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">未找到匹配的客户</p>
          </div>
        )}
      </Card>

      <CustomerDetailDialog
        customer={selectedCustomer}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        waybills={waybills}
      />
    </div>
  );
}

export default CustomerManagement;
