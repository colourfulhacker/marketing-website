export interface Service {
  title: string;
  icon: string;
  description: string;
  selling: string;
  whoCanSell: string;
  howToSell: string;
  earnings: string;
  gradient: string;
  pricingStart: string;
  pricingRange: string;
  commissionRate: string;
  avgDealSize: string;
  monthlyTarget: string;
  potentialMonthlyEarning: string;
}

export interface JobPosition {
  title: string;
  description: string;
  category: string;
  salary: string;
  badge: string | null;
  responsibilities: string[];
  servicesPromoted: string[];
  serviceDescription: string;
  performanceExpectations: string;
  monthlyGoal: string;
}
