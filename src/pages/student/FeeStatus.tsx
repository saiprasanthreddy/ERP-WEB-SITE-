
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { CreditCard, AlertCircle, CheckCircle, Clock, Download, Receipt } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface FeeRecord {
  id: string;
  semester: string;
  academicYear: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  paymentDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  description: string;
  paymentMethod?: string;
  transactionId?: string;
}

interface FeeBreakdown {
  category: string;
  amount: number;
  description: string;
}

const FeeStatus: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>('current');

  const feeRecords: FeeRecord[] = [
    {
      id: '1',
      semester: 'Semester 6',
      academicYear: '2023-24',
      totalAmount: 85000,
      paidAmount: 85000,
      pendingAmount: 0,
      dueDate: '2024-06-15',
      paymentDate: '2024-06-10',
      status: 'paid',
      description: 'Tuition Fee + Lab Fee + Library Fee',
      paymentMethod: 'Online Banking',
      transactionId: 'TXN123456789'
    },
    {
      id: '2',
      semester: 'Semester 7',
      academicYear: '2024-25',
      totalAmount: 87000,
      paidAmount: 50000,
      pendingAmount: 37000,
      dueDate: '2024-07-15',
      status: 'partial',
      description: 'Tuition Fee + Lab Fee + Library Fee + Examination Fee'
    },
    {
      id: '3',
      semester: 'Semester 5',
      academicYear: '2023-24',
      totalAmount: 83000,
      paidAmount: 83000,
      pendingAmount: 0,
      dueDate: '2024-01-15',
      paymentDate: '2024-01-12',
      status: 'paid',
      description: 'Tuition Fee + Lab Fee + Library Fee',
      paymentMethod: 'Debit Card',
      transactionId: 'TXN987654321'
    },
    {
      id: '4',
      semester: 'Semester 4',
      academicYear: '2022-23',
      totalAmount: 80000,
      paidAmount: 80000,
      pendingAmount: 0,
      dueDate: '2023-07-15',
      paymentDate: '2023-07-10',
      status: 'paid',
      description: 'Tuition Fee + Lab Fee + Library Fee',
      paymentMethod: 'Online Banking',
      transactionId: 'TXN456789123'
    }
  ];

  const currentSemesterFees: FeeBreakdown[] = [
    { category: 'Tuition Fee', amount: 65000, description: 'Academic instruction and course materials' },
    { category: 'Lab Fee', amount: 12000, description: 'Computer lab and equipment usage' },
    { category: 'Library Fee', amount: 3000, description: 'Library access and resources' },
    { category: 'Examination Fee', amount: 5000, description: 'Internal and external examinations' },
    { category: 'Sports Fee', amount: 2000, description: 'Sports facilities and activities' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'partial': return 'outline';
      case 'overdue': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'partial': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const totalPaid = feeRecords.reduce((sum, record) => sum + record.paidAmount, 0);
  const totalPending = feeRecords.reduce((sum, record) => sum + record.pendingAmount, 0);
  const totalAmount = feeRecords.reduce((sum, record) => sum + record.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Payment Status</h1>
          <p className="text-gray-600">Track your fee payments and download receipts</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Statement
          </Button>
        </div>
      </div>

      {/* Fee Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Paid</p>
                <p className="text-2xl font-bold text-green-800">₹{totalPaid.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Pending</p>
                <p className="text-2xl font-bold text-orange-800">₹{totalPending.toLocaleString()}</p>
              </div>
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Amount</p>
                <p className="text-2xl font-bold text-blue-800">₹{totalAmount.toLocaleString()}</p>
              </div>
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Payment Rate</p>
                <p className="text-2xl font-bold text-purple-800">{((totalPaid/totalAmount)*100).toFixed(1)}%</p>
              </div>
              <Receipt className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Semester Fee Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Current Semester Fee Structure (Semester 7)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentSemesterFees.map((fee, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{fee.category}</p>
                  <p className="text-sm text-gray-600">{fee.description}</p>
                </div>
                <p className="text-lg font-bold">₹{fee.amount.toLocaleString()}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">Total Amount</p>
                <p className="text-xl font-bold text-blue-600">
                  ₹{currentSemesterFees.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="current">Current Academic Year</option>
              <option value="all">All Years</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeRecords.map((record) => (
              <div key={record.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(record.status)}
                    <div>
                      <h3 className="font-semibold">{record.semester} - {record.academicYear}</h3>
                      <p className="text-sm text-gray-600">{record.description}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(record.status)} className="capitalize">
                    {record.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-bold">₹{record.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Paid Amount</p>
                    <p className="font-bold text-green-600">₹{record.paidAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending Amount</p>
                    <p className="font-bold text-orange-600">₹{record.pendingAmount.toLocaleString()}</p>
                  </div>
                </div>

                {record.status !== 'pending' && (
                  <div className="space-y-2 mb-4">
                    <Progress value={(record.paidAmount / record.totalAmount) * 100} className="h-2" />
                    <p className="text-xs text-gray-500">
                      {((record.paidAmount / record.totalAmount) * 100).toFixed(1)}% completed
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="space-y-1">
                    <p><span className="text-gray-500">Due Date:</span> {new Date(record.dueDate).toLocaleDateString()}</p>
                    {record.paymentDate && (
                      <p><span className="text-gray-500">Payment Date:</span> {new Date(record.paymentDate).toLocaleDateString()}</p>
                    )}
                    {record.paymentMethod && (
                      <p><span className="text-gray-500">Payment Method:</span> {record.paymentMethod}</p>
                    )}
                    {record.transactionId && (
                      <p><span className="text-gray-500">Transaction ID:</span> {record.transactionId}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {record.status === 'pending' || record.status === 'partial' ? (
                      <Button size="sm">Pay Now</Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Receipt className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeStatus;
