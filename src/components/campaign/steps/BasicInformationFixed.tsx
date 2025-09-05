'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';

interface BasicInformationProps {
  onNext?: () => void;
  className?: string;
}

export const BasicInformationFixed: React.FC<BasicInformationProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">
              Getting Started
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Let&apos;s start with some basic information about your campaign. You can always edit these details later.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="campaign-name" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Campaign Name *
            </label>
            <Input
              id="campaign-name"
              name="campaignName"
              type="text"
              placeholder="Enter your campaign name"
              className="max-w-md"
              required
            />
            <p className="text-xs text-muted-foreground">
              Choose a descriptive name that helps you identify this campaign
            </p>
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="campaign-description" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Description
            </label>
            <textarea
              id="campaign-description"
              name="campaignDescription"
              placeholder="Describe your campaign objectives and strategy..."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Optional: Provide more details about your campaign goals and strategy
            </p>
          </div>
        </div>

        <Card className="bg-muted/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <span>Campaign Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Name:</div>
              <div className="text-sm text-muted-foreground italic">
                Your campaign name will appear here
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Description:</div>
              <div className="text-sm text-muted-foreground italic">
                Your campaign description will appear here
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
