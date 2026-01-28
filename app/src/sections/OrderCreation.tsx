import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, CheckCircle, Truck, Package, MapPin, Calendar, DollarSign, Building } from 'lucide-react';

interface OrderCreationProps {
  onOrderCreated?: () => void;
}

interface FormData {
  customerName: string;
  origin: string;
  destination: string;
  goodsType: string;
  weight: string;
  vehicleType: string;
  customsLocation: string;
  unloadLocation: string;
  quantity: string;
  loadingTime: string;
  loadingWarehouse: string;
  orderAmount: string;
}

const initialFormData: FormData = {
  customerName: '',
  origin: '',
  destination: '',
  goodsType: '',
  weight: '',
  vehicleType: '',
  customsLocation: '',
  unloadLocation: '',
  quantity: '1',
  loadingTime: '',
  loadingWarehouse: '',
  orderAmount: '',
};

export function OrderCreation({ onOrderCreated }: OrderCreationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
      setFormData(initialFormData);
      onOrderCreated?.();
    }, 2000);
  };

  const isFormValid = () => {
    return (
      formData.customerName &&
      formData.origin &&
      formData.destination &&
      formData.goodsType &&
      formData.weight &&
      formData.vehicleType &&
      formData.loadingTime &&
      formData.orderAmount
    );
  };

  const formFields = [
    { 
      label: '客户名称', 
      field: 'customerName' as const, 
      placeholder: '请输入客户名称',
      icon: <Building className="w-4 h-4 text-gray-400" />,
      required: true 
    },
    { 
      label: '起始地', 
      field: 'origin' as const, 
      placeholder: '请输入起始地',
      icon: <MapPin className="w-4 h-4 text-gray-400" />,
      required: true 
    },
    { 
      label: '目的地', 
      field: 'destination' as const, 
      placeholder: '请输入目的地',
      icon: <MapPin className="w-4 h-4 text-gray-400" />,
      required: true 
    },
    { 
      label: '货物种类', 
      field: 'goodsType' as const, 
      placeholder: '请输入货物种类',
      icon: <Package className="w-4 h-4 text-gray-400" />,
      required: true 
    },
    { 
      label: '货物重量(kg)', 
      field: 'weight' as const, 
      placeholder: '请输入货物重量',
      icon: <Package className="w-4 h-4 text-gray-400" />,
      type: 'number',
      required: true 
    },
    { 
      label: '车辆类型', 
      field: 'vehicleType' as const, 
      placeholder: '请输入车辆类型',
      icon: <Truck className="w-4 h-4 text-gray-400" />,
      required: true 
    },
    { 
      label: '清关地', 
      field: 'customsLocation' as const, 
      placeholder: '请输入清关地',
      icon: <MapPin className="w-4 h-4 text-gray-400" />,
    },
    { 
      label: '卸货地', 
      field: 'unloadLocation' as const, 
      placeholder: '请输入卸货地',
      icon: <MapPin className="w-4 h-4 text-gray-400" />,
    },
    { 
      label: '需要数量', 
      field: 'quantity' as const, 
      placeholder: '请输入需要数量',
      icon: <Package className="w-4 h-4 text-gray-400" />,
      type: 'number',
    },
    { 
      label: '装货时间', 
      field: 'loadingTime' as const, 
      placeholder: '请选择装货时间',
      icon: <Calendar className="w-4 h-4 text-gray-400" />,
      type: 'datetime-local',
      required: true 
    },
    { 
      label: '装货库房', 
      field: 'loadingWarehouse' as const, 
      placeholder: '请输入装货库房',
      icon: <Building className="w-4 h-4 text-gray-400" />,
    },
    { 
      label: '下单金额(元)', 
      field: 'orderAmount' as const, 
      placeholder: '请输入下单金额',
      icon: <DollarSign className="w-4 h-4 text-gray-400" />,
      type: 'number',
      required: true 
    },
  ];

  return (
    <div ref={sectionRef}>
      <Card 
        className="p-8 text-center bg-gradient-to-br from-orange-50 to-white border-orange-100"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">创建运输订单</h3>
          <p className="text-gray-500 mb-6">
            快速创建新的跨境运输订单，系统将自动生成运单并同步至马士拿平台
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 h-auto text-base"
          >
            <Plus className="w-5 h-5 mr-2" />
            创建订单
          </Button>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-orange-500" />
              创建运输订单
            </DialogTitle>
            <DialogDescription>
              填写以下信息创建新的运输订单，所有必填项均需填写
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {formFields.map(({ label, field, placeholder, icon, type = 'text', required }) => (
              <div key={field} className="space-y-2">
                <Label className="flex items-center gap-1">
                  {label}
                  {required && <span className="text-red-500">*</span>}
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {icon}
                  </div>
                  <Input
                    type={type}
                    placeholder={placeholder}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  提交中...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  确认创建
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <DialogTitle className="text-xl">订单创建成功</DialogTitle>
          <DialogDescription>
            订单已创建成功，系统将自动同步至马士拿平台并生成运单
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderCreation;
