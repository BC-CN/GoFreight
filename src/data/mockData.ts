import type {
  Waybill,
  DashboardStats,
  CountryData,
  RouteData,
  NodeEfficiency,
  ExceptionData,
  ExceptionOrder,
  OperatorPerformance,
  SalesmanPerformance,
  FinancialTrend,
  FinancialRisk,
  HighRiskOrder,
} from '@/types';

// 看板统计数据
export const dashboardStats: DashboardStats = {
  todayOrders: 120,
  todayOrdersChange: 12,
  inTransitVehicles: 86,
  inTransitChange: 5,
  totalRevenue: 128.5,
  revenueChange: 8,
  exceptionOrders: 5,
  exceptionChange: -2,
  monthOrders: 3256,
  yearOrders: 38950,
  exitedVehicles: 234,
  grossProfit: 32.1,
  grossMargin: 25,
};

// 国家数据
export const countryData: CountryData[] = [
  { name: 'Kazakhstan', nameCN: '哈萨克斯坦', code: 'KZ', inTransit: 35, exited: 128, exception: 3, lat: 48.0196, lng: 66.9237 },
  { name: 'Uzbekistan', nameCN: '乌兹别克斯坦', code: 'UZ', inTransit: 22, exited: 89, exception: 1, lat: 41.3775, lng: 64.5853 },
  { name: 'Kyrgyzstan', nameCN: '吉尔吉斯斯坦', code: 'KG', inTransit: 15, exited: 67, exception: 0, lat: 41.2044, lng: 74.7661 },
  { name: 'Tajikistan', nameCN: '塔吉克斯坦', code: 'TJ', inTransit: 8, exited: 45, exception: 1, lat: 38.8610, lng: 71.2761 },
  { name: 'Turkmenistan', nameCN: '土库曼斯坦', code: 'TM', inTransit: 6, exited: 32, exception: 0, lat: 38.9697, lng: 59.5563 },
];

// 线路数据
export const routeData: RouteData[] = [
  { id: '1', from: '新疆阿拉山口', to: '哈萨克斯坦阿拉木图', fromLat: 45.1675, fromLng: 82.5699, toLat: 43.2220, toLng: 76.8512, efficiency: 85, avgTime: 36, exceptionRate: 3.2, orderCount: 456 },
  { id: '2', from: '新疆霍尔果斯', to: '乌兹别克斯坦塔什干', fromLat: 44.2014, fromLng: 80.4105, toLat: 41.2995, toLng: 69.2401, efficiency: 78, avgTime: 48, exceptionRate: 5.8, orderCount: 328 },
  { id: '3', from: '新疆伊尔克什坦', to: '吉尔吉斯斯坦比什凯克', fromLat: 39.7159, fromLng: 73.9197, toLat: 42.8746, toLng: 74.5698, efficiency: 92, avgTime: 28, exceptionRate: 1.5, orderCount: 267 },
  { id: '4', from: '新疆卡拉苏', to: '塔吉克斯坦杜尚别', fromLat: 38.1771, fromLng: 74.8636, toLat: 38.5598, toLng: 68.7870, efficiency: 88, avgTime: 32, exceptionRate: 2.1, orderCount: 189 },
  { id: '5', from: '新疆巴克图', to: '哈萨克斯坦阿斯塔纳', fromLat: 46.6584, fromLng: 82.9172, toLat: 51.1605, toLng: 71.4704, efficiency: 82, avgTime: 42, exceptionRate: 4.5, orderCount: 234 },
];

// 节点效率数据
export const nodeEfficiencyData: NodeEfficiency[] = [
  { node: '装车', avgTime: 45, threshold: 60, isOverThreshold: false },
  { node: '施封', avgTime: 30, threshold: 30, isOverThreshold: false },
  { node: '报关', avgTime: 75, threshold: 60, isOverThreshold: true },
  { node: '出境', avgTime: 20, threshold: 30, isOverThreshold: false },
];

// 异常类型数据
export const exceptionTypeData: ExceptionData[] = [
  { type: '超时', count: 23, percentage: 45 },
  { type: '单据问题', count: 15, percentage: 30 },
  { type: '换头', count: 8, percentage: 15 },
  { type: '其他', count: 5, percentage: 10 },
];

// 异常订单列表
export const exceptionOrders: ExceptionOrder[] = [
  { id: '1', waybillNo: 'GF20240120001', route: '新疆→哈萨克斯坦', exceptionType: '超时', description: '报关环节超时2小时', occurTime: '2024-01-20 14:30', status: 'processing' },
  { id: '2', waybillNo: 'GF20240119045', route: '新疆→乌兹别克斯坦', exceptionType: '单据问题', description: '关封信息有误需重新申报', occurTime: '2024-01-19 09:15', status: 'resolved' },
  { id: '3', waybillNo: 'GF20240118023', route: '新疆→吉尔吉斯斯坦', exceptionType: '换头', description: '车辆故障需更换车头', occurTime: '2024-01-18 16:45', status: 'resolved' },
  { id: '4', waybillNo: 'GF20240120018', route: '新疆→塔吉克斯坦', exceptionType: '超时', description: '装车环节超时1.5小时', occurTime: '2024-01-20 08:20', status: 'pending' },
  { id: '5', waybillNo: 'GF20240117089', route: '新疆→哈萨克斯坦', exceptionType: '单据问题', description: '缺少货物清单', occurTime: '2024-01-17 11:30', status: 'resolved' },
];

// 操作员绩效数据
export const operatorPerformanceData: OperatorPerformance[] = [
  { id: '1', name: '张小明', orderCount: 45, avgProcessTime: 30, overtimeRate: 5, isHighRisk: false },
  { id: '2', name: '李华', orderCount: 52, avgProcessTime: 28, overtimeRate: 3, isHighRisk: false },
  { id: '3', name: '王强', orderCount: 38, avgProcessTime: 35, overtimeRate: 8, isHighRisk: true },
  { id: '4', name: '刘芳', orderCount: 48, avgProcessTime: 32, overtimeRate: 4, isHighRisk: false },
  { id: '5', name: '陈静', orderCount: 41, avgProcessTime: 31, overtimeRate: 6, isHighRisk: false },
];

// 业务员绩效数据
export const salesmanPerformanceData: SalesmanPerformance[] = [
  { id: '1', name: '李小红', orderScale: 156.8, exceptionRate: 3, isHighRisk: false },
  { id: '2', name: '张伟', orderScale: 189.5, exceptionRate: 5.5, isHighRisk: true },
  { id: '3', name: '王芳', orderScale: 134.2, exceptionRate: 2.1, isHighRisk: false },
  { id: '4', name: '刘强', orderScale: 167.3, exceptionRate: 4.2, isHighRisk: false },
  { id: '5', name: '陈明', orderScale: 145.6, exceptionRate: 3.8, isHighRisk: false },
];

// 财务趋势数据
export const financialTrendData: FinancialTrend[] = [
  { date: '1月', revenue: 980, cost: 735, profit: 245 },
  { date: '2月', revenue: 1120, cost: 840, profit: 280 },
  { date: '3月', revenue: 1050, cost: 787, profit: 263 },
  { date: '4月', revenue: 1180, cost: 885, profit: 295 },
  { date: '5月', revenue: 1250, cost: 937, profit: 313 },
  { date: '6月', revenue: 1320, cost: 990, profit: 330 },
  { date: '7月', revenue: 1285, cost: 964, profit: 321 },
  { date: '8月', revenue: 1350, cost: 1012, profit: 338 },
  { date: '9月', revenue: 1420, cost: 1065, profit: 355 },
  { date: '10月', revenue: 1380, cost: 1035, profit: 345 },
  { date: '11月', revenue: 1450, cost: 1087, profit: 363 },
  { date: '12月', revenue: 1520, cost: 1140, profit: 380 },
];

// 财务风险数据
export const financialRiskData: FinancialRisk = {
  exceptionLoss: 2.5,
  unsettledAmount: 45,
  overdueAmount: 12,
};

// 高风险订单
export const highRiskOrders: HighRiskOrder[] = [
  { id: '1', waybillNo: 'GF20240120001', riskLevel: 'high', riskReason: '超期货款未收回', amount: 85000 },
  { id: '2', waybillNo: 'GF20240115034', riskLevel: 'high', riskReason: '客户信用评级下降', amount: 120000 },
  { id: '3', waybillNo: 'GF20240118056', riskLevel: 'medium', riskReason: '异常处理中', amount: 45000 },
  { id: '4', waybillNo: 'GF20240110078', riskLevel: 'medium', riskReason: '单据不全', amount: 32000 },
  { id: '5', waybillNo: 'GF20240120092', riskLevel: 'high', riskReason: '货物滞留', amount: 156000 },
];

// 运单列表数据
export const waybillList: Waybill[] = [
  {
    id: '1',
    waybillNo: 'GF20240120001',
    status: 'in_transit',
    customerName: '新疆国际贸易有限公司',
    origin: '新疆阿拉山口',
    destination: '哈萨克斯坦阿拉木图',
    goodsType: '电子产品',
    weight: 25000,
    vehicleType: '集装箱车',
    customsLocation: '阿拉山口口岸',
    unloadLocation: '阿拉木图物流园',
    quantity: 2,
    loadingTime: '2024-01-20 08:00',
    loadingWarehouse: '阿拉山口保税仓A区',
    orderAmount: 45000,
    createTime: '2024-01-18 10:30',
    updateTime: '2024-01-20 16:45',
    nodes: [
      { id: '1', type: 'loading', status: 'completed', timestamp: '2024-01-20 08:30', operator: '张小明', location: '阿拉山口保税仓A区', remark: '装车完成' },
      { id: '2', type: 'sealing', status: 'completed', timestamp: '2024-01-20 09:15', operator: '李华', location: '阿拉山口保税仓A区', remark: '施封完成' },
      { id: '3', type: 'customs_declaration', status: 'completed', timestamp: '2024-01-20 11:30', operator: '王强', location: '阿拉山口海关', remark: '报关完成' },
      { id: '4', type: 'exit', status: 'completed', timestamp: '2024-01-20 14:20', operator: '刘芳', location: '阿拉山口口岸', remark: '出境完成' },
      { id: '5', type: 'transit', status: 'processing', operator: '陈静', location: '哈萨克斯坦境内', remark: '运输中' },
    ],
    documents: [
      { id: '1', type: 'exit_video', name: '出境视频.mp4', url: '/docs/video1.mp4', uploadTime: '2024-01-20 14:25', uploader: '刘芳' },
      { id: '2', type: 'seal_photo', name: '施封照片.jpg', url: '/docs/photo1.jpg', uploadTime: '2024-01-20 09:20', uploader: '李华' },
    ],
    driverInfo: { id: '1', name: '马师傅', phone: '138****1234', licenseNo: '6501****' },
    vehicleInfo: { headNo: '新A12345', trailerNo: '新A6789挂' },
    operatorInfo: { id: '1', name: '张小明', phone: '0991****' },
    salesmanInfo: { id: '1', name: '李小红', phone: '0991****' },
  },
  {
    id: '2',
    waybillNo: 'GF20240120002',
    status: 'sealed',
    customerName: '中亚物流集团',
    origin: '新疆霍尔果斯',
    destination: '乌兹别克斯坦塔什干',
    goodsType: '纺织品',
    weight: 18000,
    vehicleType: '厢式货车',
    customsLocation: '霍尔果斯口岸',
    unloadLocation: '塔什干批发市场',
    quantity: 1,
    loadingTime: '2024-01-20 10:00',
    loadingWarehouse: '霍尔果斯物流园B区',
    orderAmount: 32000,
    createTime: '2024-01-19 14:20',
    updateTime: '2024-01-20 11:30',
    nodes: [
      { id: '1', type: 'loading', status: 'completed', timestamp: '2024-01-20 10:30', operator: '李华', location: '霍尔果斯物流园B区', remark: '装车完成' },
      { id: '2', type: 'sealing', status: 'completed', timestamp: '2024-01-20 11:20', operator: '王强', location: '霍尔果斯物流园B区', remark: '施封完成' },
      { id: '3', type: 'customs_declaration', status: 'pending', operator: '刘芳', location: '霍尔果斯海关', remark: '等待报关' },
    ],
    documents: [
      { id: '3', type: 'seal_photo', name: '施封照片.jpg', url: '/docs/photo2.jpg', uploadTime: '2024-01-20 11:25', uploader: '王强' },
    ],
    driverInfo: { id: '2', name: '王师傅', phone: '139****5678', licenseNo: '6502****' },
    vehicleInfo: { headNo: '新B54321', trailerNo: '' },
    operatorInfo: { id: '2', name: '李华', phone: '0992****' },
    salesmanInfo: { id: '2', name: '张伟', phone: '0992****' },
  },
  {
    id: '3',
    waybillNo: 'GF20240120003',
    status: 'exited',
    customerName: '西北贸易公司',
    origin: '新疆伊尔克什坦',
    destination: '吉尔吉斯斯坦比什凯克',
    goodsType: '机械设备',
    weight: 35000,
    vehicleType: '低平板车',
    customsLocation: '伊尔克什坦口岸',
    unloadLocation: '比什凯克工业区',
    quantity: 3,
    loadingTime: '2024-01-19 14:00',
    loadingWarehouse: '伊尔克什坦堆场C区',
    orderAmount: 68000,
    createTime: '2024-01-17 09:15',
    updateTime: '2024-01-20 09:30',
    nodes: [
      { id: '1', type: 'loading', status: 'completed', timestamp: '2024-01-19 14:45', operator: '王强', location: '伊尔克什坦堆场C区', remark: '装车完成' },
      { id: '2', type: 'sealing', status: 'completed', timestamp: '2024-01-19 15:30', operator: '刘芳', location: '伊尔克什坦堆场C区', remark: '施封完成' },
      { id: '3', type: 'customs_declaration', status: 'completed', timestamp: '2024-01-19 17:00', operator: '陈静', location: '伊尔克什坦海关', remark: '报关完成' },
      { id: '4', type: 'exit', status: 'completed', timestamp: '2024-01-20 09:00', operator: '张小明', location: '伊尔克什坦口岸', remark: '出境完成' },
      { id: '5', type: 'transit', status: 'processing', operator: '李华', location: '吉尔吉斯斯坦境内', remark: '运输中' },
    ],
    documents: [
      { id: '4', type: 'exit_video', name: '出境视频.mp4', url: '/docs/video2.mp4', uploadTime: '2024-01-20 09:05', uploader: '张小明' },
      { id: '5', type: 'seal_photo', name: '施封照片.jpg', url: '/docs/photo3.jpg', uploadTime: '2024-01-19 15:35', uploader: '刘芳' },
    ],
    driverInfo: { id: '3', name: '刘师傅', phone: '137****9012', licenseNo: '6503****' },
    vehicleInfo: { headNo: '新C98765', trailerNo: '新C4321挂' },
    operatorInfo: { id: '3', name: '王强', phone: '0993****' },
    salesmanInfo: { id: '3', name: '王芳', phone: '0993****' },
  },
  {
    id: '4',
    waybillNo: 'GF20240120004',
    status: 'exception',
    customerName: '丝路货运代理',
    origin: '新疆卡拉苏',
    destination: '塔吉克斯坦杜尚别',
    goodsType: '日用百货',
    weight: 12000,
    vehicleType: '厢式货车',
    customsLocation: '卡拉苏口岸',
    unloadLocation: '杜尚别市场',
    quantity: 1,
    loadingTime: '2024-01-20 07:30',
    loadingWarehouse: '卡拉苏货场D区',
    orderAmount: 28000,
    createTime: '2024-01-19 16:45',
    updateTime: '2024-01-20 15:20',
    nodes: [
      { id: '1', type: 'loading', status: 'completed', timestamp: '2024-01-20 08:15', operator: '刘芳', location: '卡拉苏货场D区', remark: '装车完成' },
      { id: '2', type: 'sealing', status: 'completed', timestamp: '2024-01-20 09:00', operator: '陈静', location: '卡拉苏货场D区', remark: '施封完成' },
      { id: '3', type: 'customs_declaration', status: 'exception', operator: '张小明', location: '卡拉苏海关', remark: '单据问题，需重新申报' },
    ],
    documents: [
      { id: '6', type: 'seal_photo', name: '施封照片.jpg', url: '/docs/photo4.jpg', uploadTime: '2024-01-20 09:05', uploader: '陈静' },
    ],
    driverInfo: { id: '4', name: '陈师傅', phone: '136****3456', licenseNo: '6504****' },
    vehicleInfo: { headNo: '新D11111', trailerNo: '' },
    operatorInfo: { id: '4', name: '刘芳', phone: '0994****' },
    salesmanInfo: { id: '4', name: '刘强', phone: '0994****' },
  },
  {
    id: '5',
    waybillNo: 'GF20240120005',
    status: 'finding_vehicle',
    customerName: '欧亚供应链管理',
    origin: '新疆巴克图',
    destination: '哈萨克斯坦阿斯塔纳',
    goodsType: '食品',
    weight: 22000,
    vehicleType: '冷藏车',
    customsLocation: '巴克图口岸',
    unloadLocation: '阿斯塔纳冷链中心',
    quantity: 2,
    loadingTime: '2024-01-21 06:00',
    loadingWarehouse: '巴克图冷库E区',
    orderAmount: 52000,
    createTime: '2024-01-20 11:30',
    updateTime: '2024-01-20 11:30',
    nodes: [
      { id: '1', type: 'loading', status: 'pending', operator: '陈静', location: '巴克图冷库E区', remark: '等待装车' },
    ],
    documents: [],
    driverInfo: undefined,
    vehicleInfo: undefined,
    operatorInfo: { id: '5', name: '陈静', phone: '0995****' },
    salesmanInfo: { id: '5', name: '陈明', phone: '0995****' },
  },
];

// 状态映射
export const statusMap: Record<string, { label: string; color: string; bgColor: string }> = {
  pending: { label: '待处理', color: '#6B7280', bgColor: '#F3F4F6' },
  finding_vehicle: { label: '找车中', color: '#F59E0B', bgColor: '#FEF3C7' },
  vehicle_found: { label: '已找到车', color: '#10B981', bgColor: '#D1FAE5' },
  loading: { label: '装车中', color: '#3B82F6', bgColor: '#DBEAFE' },
  loaded: { label: '已装车', color: '#8B5CF6', bgColor: '#EDE9FE' },
  sealed: { label: '已施封', color: '#6366F1', bgColor: '#E0E7FF' },
  customs_declaring: { label: '报关中', color: '#EC4899', bgColor: '#FCE7F3' },
  customs_cleared: { label: '已报关', color: '#14B8A6', bgColor: '#CCFBF1' },
  exited: { label: '已出境', color: '#22C55E', bgColor: '#DCFCE7' },
  in_transit: { label: '运输中', color: '#0EA5E9', bgColor: '#E0F2FE' },
  delivered: { label: '已送达', color: '#84CC16', bgColor: '#ECFCCB' },
  completed: { label: '已完成', color: '#10B981', bgColor: '#D1FAE5' },
  exception: { label: '异常', color: '#EF4444', bgColor: '#FEE2E2' },
};

// 节点类型映射
export const nodeTypeMap: Record<string, string> = {
  loading: '装车',
  sealing: '施封',
  customs_declaration: '报关',
  exit: '出境',
  transit: '运输',
  delivery: '送达',
};

// 异常类型映射
export const exceptionTypeMap: Record<string, string> = {
  overtime: '超时',
  document: '单据问题',
  vehicle_change: '换头',
  other: '其他',
};
