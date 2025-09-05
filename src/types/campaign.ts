export interface CampaignStep {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  active: boolean;
}

export interface Campaign {
  id?: string;
  name: string;
  description: string;
  budget: number;
  startDate: Date;
  endDate: Date;
  targetAudience: TargetAudience;
  objectives: CampaignObjective[];
  createdAt?: Date;
  updatedAt?: Date;
  status: CampaignStatus;
}

export interface TargetAudience {
  demographics: Demographics;
  interests: string[];
  locations: string[];
  ageRange: {
    min: number;
    max: number;
  };
}

export interface Demographics {
  gender: 'all' | 'male' | 'female' | 'other';
  income: 'low' | 'medium' | 'high' | 'all';
  education: 'high-school' | 'college' | 'graduate' | 'all';
}

export interface CampaignObjective {
  type: 'awareness' | 'engagement' | 'conversion' | 'retention';
  target: number;
  metric: string;
}

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';

export interface NavigationState {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  canGoBack: boolean;
}
