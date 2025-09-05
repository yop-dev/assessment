import { CampaignStep } from '@/types';

export const CAMPAIGN_STEPS: CampaignStep[] = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Set up your campaign name and description',
    completed: false,
    active: true,
  },
  {
    id: 'objectives',
    title: 'Objectives & Goals',
    description: 'Define your campaign objectives and success metrics',
    completed: false,
    active: false,
  },
  {
    id: 'target-audience',
    title: 'Target Audience',
    description: 'Define your target audience and demographics',
    completed: false,
    active: false,
  },
  {
    id: 'budget-schedule',
    title: 'Budget & Schedule',
    description: 'Set your budget and campaign timeline',
    completed: false,
    active: false,
  },
  {
    id: 'review-launch',
    title: 'Review & Launch',
    description: 'Review your campaign details and launch',
    completed: false,
    active: false,
  },
];

export const CAMPAIGN_OBJECTIVES = [
  { type: 'awareness', label: 'Brand Awareness', description: 'Increase brand recognition and visibility' },
  { type: 'engagement', label: 'Engagement', description: 'Drive user interaction and participation' },
  { type: 'conversion', label: 'Conversion', description: 'Generate leads and sales' },
  { type: 'retention', label: 'Retention', description: 'Retain and re-engage existing customers' },
];

export const DEMOGRAPHICS_OPTIONS = {
  gender: [
    { value: 'all', label: 'All Genders' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ],
  income: [
    { value: 'all', label: 'All Income Levels' },
    { value: 'low', label: 'Low Income' },
    { value: 'medium', label: 'Medium Income' },
    { value: 'high', label: 'High Income' },
  ],
  education: [
    { value: 'all', label: 'All Education Levels' },
    { value: 'high-school', label: 'High School' },
    { value: 'college', label: 'College' },
    { value: 'graduate', label: 'Graduate' },
  ],
};

export const VALIDATION_RULES = {
  campaignName: {
    required: 'Campaign name is required',
    minLength: { value: 3, message: 'Campaign name must be at least 3 characters' },
    maxLength: { value: 100, message: 'Campaign name must be less than 100 characters' },
  },
  description: {
    maxLength: { value: 500, message: 'Description must be less than 500 characters' },
  },
  budget: {
    required: 'Budget is required',
    min: { value: 1, message: 'Budget must be greater than 0' },
  },
};
