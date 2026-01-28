import type { Waybill } from '@/types';

export interface Customer {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  creditLevel: 'A' | 'B' | 'C' | 'D';
  cooperationStatus: 'active' | 'inactive' | 'suspended';
  registerDate: string;
  totalOrders: number;
  totalAmount: number;
  unsettledAmount: number;
  lastOrderDate: string;
  remark: string;
}

export const customerList: Customer[] = [
  {
    id: '1',
    name: '新疆国际贸易有限公司',
    contact: '张经理',
    phone: '0991-8888888',
    email: 'zhang@xjtrade.com',
    address: '新疆乌鲁木齐市天山区国际贸易大厦',
    creditLevel: 'A',
    cooperationStatus: 'active',
    registerDate: '2022-03-15',
    totalOrders: 156,
    totalAmount: 28500000,
    unsettledAmount: 450000,
    lastOrderDate: '2024-01-20',
    remark: '优质客户，合作稳定',
  },
  {
    id: '2',
    name: '中亚物流集团',
    contact: '李总',
    phone: '0992-6666666',
    email: 'li@zylogistics.com',
    address: '新疆伊犁州霍尔果斯市物流园区',
    creditLevel: 'A',
    cooperationStatus: 'active',
    registerDate: '2021-08-20',
    totalOrders: 234,
    totalAmount: 42800000,
    unsettledAmount: 0,
    lastOrderDate: '2024-01-19',
    remark: '大客户，月订单量稳定',
  },
  {
    id: '3',
    name: '西北贸易公司',
    contact: '王经理',
    phone: '0931-5555555',
    email: 'wang@xbtrade.com',
    address: '甘肃省兰州市城关区贸易中心',
    creditLevel: 'B',
    cooperationStatus: 'active',
    registerDate: '2023-01-10',
    totalOrders: 89,
    totalAmount: 12500000,
    unsettledAmount: 180000,
    lastOrderDate: '2024-01-18',
    remark: '新客户，需重点关注',
  },
  {
    id: '4',
    name: '丝路货运代理',
    contact: '刘经理',
    phone: '0993-7777777',
    email: 'liu@silkroad.com',
    address: '新疆喀什地区喀什市货运市场',
    creditLevel: 'C',
    cooperationStatus: 'suspended',
    registerDate: '2022-11-05',
    totalOrders: 45,
    totalAmount: 5600000,
    unsettledAmount: 890000,
    lastOrderDate: '2024-01-15',
    remark: '存在欠款，已暂停合作',
  },
  {
    id: '5',
    name: '欧亚供应链管理',
    contact: '陈总',
    phone: '010-9999999',
    email: 'chen@oyasupply.com',
    address: '北京市朝阳区国贸大厦',
    creditLevel: 'A',
    cooperationStatus: 'active',
    registerDate: '2023-06-18',
    totalOrders: 67,
    totalAmount: 15800000,
    unsettledAmount: 0,
    lastOrderDate: '2024-01-20',
    remark: '北京客户，订单质量高',
  },
  {
    id: '6',
    name: '天山物流有限公司',
    contact: '赵经理',
    phone: '0994-3333333',
    email: 'zhao@tianshan.com',
    address: '新疆昌吉州昌吉市物流园区',
    creditLevel: 'B',
    cooperationStatus: 'active',
    registerDate: '2022-09-12',
    totalOrders: 112,
    totalAmount: 18900000,
    unsettledAmount: 320000,
    lastOrderDate: '2024-01-17',
    remark: '本地客户，合作良好',
  },
  {
    id: '7',
    name: '西域贸易集团',
    contact: '孙总',
    phone: '0995-4444444',
    email: 'sun@xiyu.com',
    address: '新疆吐鲁番市高昌区贸易城',
    creditLevel: 'B',
    cooperationStatus: 'inactive',
    registerDate: '2023-02-28',
    totalOrders: 34,
    totalAmount: 4800000,
    unsettledAmount: 0,
    lastOrderDate: '2023-12-20',
    remark: '近期无订单，需跟进',
  },
  {
    id: '8',
    name: '胡杨林货运公司',
    contact: '周经理',
    phone: '0996-2222222',
    email: 'zhou@huyang.com',
    address: '新疆阿克苏地区阿克苏市货运站',
    creditLevel: 'C',
    cooperationStatus: 'active',
    registerDate: '2023-04-15',
    totalOrders: 56,
    totalAmount: 7200000,
    unsettledAmount: 560000,
    lastOrderDate: '2024-01-16',
    remark: '中小客户，订单不稳定',
  },
];

// 获取客户的信用等级颜色
export const getCreditLevelColor = (level: string) => {
  switch (level) {
    case 'A':
      return { bg: 'bg-green-100', text: 'text-green-700', label: '优秀' };
    case 'B':
      return { bg: 'bg-blue-100', text: 'text-blue-700', label: '良好' };
    case 'C':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '一般' };
    case 'D':
      return { bg: 'bg-red-100', text: 'text-red-700', label: '较差' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', label: '未知' };
  }
};

// 获取合作状态颜色
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return { bg: 'bg-green-100', text: 'text-green-700', label: '合作中' };
    case 'inactive':
      return { bg: 'bg-gray-100', text: 'text-gray-700', label: '未合作' };
    case 'suspended':
      return { bg: 'bg-red-100', text: 'text-red-700', label: '已暂停' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700', label: '未知' };
  }
};

// 获取客户的订单列表
export const getCustomerOrders = (customerId: string, waybills: Waybill[]): Waybill[] => {
  const customer = customerList.find(c => c.id === customerId);
  if (!customer) return [];
  return waybills.filter(w => w.customerName === customer.name);
};
