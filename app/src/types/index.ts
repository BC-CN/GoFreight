// 运单相关类型
export interface Waybill {
  id: string;
  waybillNo: string;
  status: WaybillStatus;
  customerName: string;
  origin: string;
  destination: string;
  goodsType: string;
  weight: number;
  vehicleType: string;
  customsLocation: string;
  unloadLocation: string;
  quantity: number;
  loadingTime: string;
  loadingWarehouse: string;
  orderAmount: number;
  createTime: string;
  updateTime: string;
  nodes: WaybillNode[];
  documents: Document[];
  driverInfo?: DriverInfo;
  vehicleInfo?: VehicleInfo;
  operatorInfo?: OperatorInfo;
  salesmanInfo?: SalesmanInfo;
}

export type WaybillStatus = 
  | 'pending'
  | 'finding_vehicle'
  | 'vehicle_found'
  | 'loading'
  | 'loaded'
  | 'sealed'
  | 'customs_declaring'
  | 'customs_cleared'
  | 'exited'
  | 'in_transit'
  | 'delivered'
  | 'completed'
  | 'exception';

export interface WaybillNode {
  id: string;
  type: NodeType;
  status: 'pending' | 'processing' | 'completed' | 'exception';
  timestamp?: string;
  operator?: string;
  location?: string;
  remark?: string;
  documents?: Document[];
}

export type NodeType = 
  | 'loading'
  | 'sealing'
  | 'customs_declaration'
  | 'exit'
  | 'transit'
  | 'delivery';

export interface Document {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  uploadTime: string;
  uploader: string;
}

export type DocumentType = 
  | 'exit_video'
  | 'seal_photo'
  | 'exit_certificate'
  | 'customs_doc'
  | 'vehicle_photo'
  | 'other';

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  licenseNo: string;
  avatar?: string;
}

export interface VehicleInfo {
  headNo: string;
  trailerNo: string;
  headPhoto?: string;
  trailerPhoto?: string;
}

export interface OperatorInfo {
  id: string;
  name: string;
  phone: string;
}

export interface SalesmanInfo {
  id: string;
  name: string;
  phone: string;
}

// 统计数据类型
export interface DashboardStats {
  todayOrders: number;
  todayOrdersChange: number;
  inTransitVehicles: number;
  inTransitChange: number;
  totalRevenue: number;
  revenueChange: number;
  exceptionOrders: number;
  exceptionChange: number;
  monthOrders: number;
  yearOrders: number;
  exitedVehicles: number;
  grossProfit: number;
  grossMargin: number;
}

// 地图数据类型
export interface CountryData {
  name: string;
  nameCN: string;
  code: string;
  inTransit: number;
  exited: number;
  exception: number;
  lat: number;
  lng: number;
}

export interface RouteData {
  id: string;
  from: string;
  to: string;
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  efficiency: number;
  avgTime: number;
  exceptionRate: number;
  orderCount: number;
}

// 节点效率数据
export interface NodeEfficiency {
  node: string;
  avgTime: number;
  threshold: number;
  isOverThreshold: boolean;
}

// 异常数据
export interface ExceptionData {
  type: string;
  count: number;
  percentage: number;
}

export interface ExceptionOrder {
  id: string;
  waybillNo: string;
  route: string;
  exceptionType: string;
  description: string;
  occurTime: string;
  status: 'pending' | 'processing' | 'resolved';
}

// 绩效数据类型
export interface OperatorPerformance {
  id: string;
  name: string;
  orderCount: number;
  avgProcessTime: number;
  overtimeRate: number;
  isHighRisk: boolean;
}

export interface SalesmanPerformance {
  id: string;
  name: string;
  orderScale: number;
  exceptionRate: number;
  isHighRisk: boolean;
}

// 财务数据类型
export interface FinancialTrend {
  date: string;
  revenue: number;
  cost: number;
  profit: number;
}

export interface FinancialRisk {
  exceptionLoss: number;
  unsettledAmount: number;
  overdueAmount: number;
}

export interface HighRiskOrder {
  id: string;
  waybillNo: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskReason: string;
  amount: number;
}

// 用户角色类型
export type UserRole = 'customer' | 'driver' | 'salesman' | 'operator' | 'manager';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  permissions: string[];
}
