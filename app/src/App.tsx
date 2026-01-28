import { useState, useEffect } from 'react';
import { Navigation } from '@/sections/Navigation';
import { StatsOverview } from '@/sections/StatsOverview';
import { MapVisualization } from '@/sections/MapVisualization';
import { RouteEfficiency } from '@/sections/RouteEfficiency';
import { ProcessEfficiency } from '@/sections/ProcessEfficiency';
import { TeamPerformance } from '@/sections/TeamPerformance';
import { FinancialRiskSection } from '@/sections/FinancialRisk';
import { WaybillManagement } from '@/sections/WaybillManagement';
import { OrderCreation } from '@/sections/OrderCreation';
import { CustomerManagement } from '@/sections/CustomerManagement';
import { 
  dashboardStats, 
  countryData, 
  routeData, 
  nodeEfficiencyData, 
  exceptionTypeData, 
  exceptionOrders,
  operatorPerformanceData,
  salesmanPerformanceData,
  financialTrendData,
  financialRiskData,
  highRiskOrders,
  waybillList 
} from '@/data/mockData';
import './App.css';

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <section>
        <StatsOverview stats={dashboardStats} />
      </section>

      {/* Map Visualization */}
      <section>
        <MapVisualization countries={countryData} routes={routeData} />
      </section>

      {/* Route Efficiency */}
      <section>
        <RouteEfficiency routes={routeData} />
      </section>

      {/* Process Efficiency */}
      <section>
        <ProcessEfficiency 
          nodeEfficiency={nodeEfficiencyData} 
          exceptionTypes={exceptionTypeData}
          exceptionOrders={exceptionOrders}
        />
      </section>

      {/* Team Performance */}
      <section>
        <TeamPerformance 
          operators={operatorPerformanceData}
          salesmen={salesmanPerformanceData}
        />
      </section>

      {/* Financial Risk */}
      <section>
        <FinancialRiskSection 
          trendData={financialTrendData}
          riskData={financialRiskData}
          highRiskOrders={highRiskOrders}
        />
      </section>
    </div>
  );
}

function WaybillsPage() {
  return (
    <div className="space-y-8">
      {/* Order Creation */}
      <section>
        <OrderCreation />
      </section>

      {/* Waybill Management */}
      <section>
        <WaybillManagement waybills={waybillList} />
      </section>
    </div>
  );
}

function FinancePage() {
  return (
    <div className="space-y-8">
      <section>
        <FinancialRiskSection 
          trendData={financialTrendData}
          riskData={financialRiskData}
          highRiskOrders={highRiskOrders}
        />
      </section>
    </div>
  );
}

function CustomersPage() {
  return (
    <div className="space-y-8">
      <section>
        <CustomerManagement waybills={waybillList} />
      </section>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'waybills':
        return <WaybillsPage />;
      case 'finance':
        return <FinancePage />;
      case 'customers':
        return <CustomersPage />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === 'dashboard' && '跨境物流运营看板'}
              {activeTab === 'waybills' && '运单管理'}
              {activeTab === 'finance' && '财务管理'}
              {activeTab === 'customers' && '客户管理'}
            </h1>
            <p className="text-gray-500 mt-1">
              {activeTab === 'dashboard' && '实时监控跨境物流运营数据与业务态势'}
              {activeTab === 'waybills' && '查看和管理所有运输运单，创建新订单'}
              {activeTab === 'finance' && '查看财务数据与风险订单'}
              {activeTab === 'customers' && '管理客户信息与合作关系'}
            </p>
          </div>

          {/* Page Content */}
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-500 rounded-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">GoFreight</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 GoFreight. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-orange-500 transition-colors">帮助中心</a>
              <a href="#" className="hover:text-orange-500 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-orange-500 transition-colors">服务条款</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
