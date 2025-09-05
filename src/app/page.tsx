'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  MessageCircle, 
  User, 
  Settings, 
  Gift, 
  DollarSign, 
  Layers,
  Upload,
  Check
} from 'lucide-react';

export default function CampaignCreationPage() {
  const [selectedCampaignType, setSelectedCampaignType] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherCampaignGoal, setOtherCampaignGoal] = useState('');
  const [selectedProductType, setSelectedProductType] = useState<'new' | 'existing'>('new');
  const [productUrl, setProductUrl] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const totalSteps = 4;

  // Mock existing products data
  const existingProducts = [
    { id: '1', name: 'Yeti Cooler', createdDate: '8/25/29' },
    { id: '2', name: 'Yeti Cooler', createdDate: '8/25/29' },
    { id: '3', name: 'Yeti Cooler', createdDate: '8/25/29' },
    { id: '4', name: 'Yeti Cooler', createdDate: '8/25/29' },
    { id: '5', name: 'Yeti Cooler', createdDate: '8/25/29' },
    { id: '6', name: 'Yeti Cooler', createdDate: '8/25/29' },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Navigation */}
      <div className="w-12 sm:w-14 lg:w-16 bg-white border-r border-gray-200 flex flex-col items-center py-2 sm:py-4">
        {/* Logo/Brand */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-black rounded mb-4 sm:mb-6 lg:mb-8">
        </div>
        
        {/* Navigation Items */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <Button 
            size="icon" 
            variant="ghost" 
            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg hover:bg-gray-100"
          >
            <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg hover:bg-gray-100"
          >
            <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg hover:bg-gray-100"
          >
            <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
          </Button>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg hover:bg-gray-100"
          >
            <Settings className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
          </Button>
        </div>
        
        {/* Spacer to push profile to bottom */}
        <div className="flex-1"></div>
        
        {/* Profile Section */}
        <div className="mt-auto mb-2 sm:mb-4">
          <Button 
            size="icon" 
            variant="ghost" 
            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full hover:bg-gray-100 border-2 border-gray-200 hover:border-gray-300 transition-colors"
          >
            <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div>
            <h1 className="text-base sm:text-lg font-medium text-gray-900">
              Untitled Campaign
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-7xl">
            {/* Left Progress Stepper - Hidden on mobile, horizontal on tablet, vertical on desktop */}
            <div className="hidden sm:flex lg:flex-col items-center justify-between sm:w-full lg:w-auto sm:h-auto lg:h-[500px] xl:h-[600px] sm:py-4 lg:py-8">
              {/* Step Counter */}
              <div className="text-lg sm:text-xl text-gray-600 sm:mb-4 lg:mb-6 font-semibold sm:mr-4 lg:mr-0">
                {currentStep}/{totalSteps}
              </div>
              
              {/* Progress Dots */}
              <div className="flex sm:flex-row lg:flex-col justify-between sm:w-full lg:w-auto sm:h-auto lg:h-full">
                {Array.from({ length: totalSteps }, (_, index) => {
                  const stepNumber = index + 1;
                  const isActive = stepNumber === currentStep;
                  const isCompleted = stepNumber < currentStep;
                  const isCurrentOrCompleted = stepNumber <= currentStep;
                  
                  return (
                    <div key={stepNumber} className="flex sm:flex-col lg:flex-col items-center sm:flex-1 lg:flex-1">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-all duration-300 shadow-sm flex items-center justify-center ${
                        isActive || isCompleted ? 'bg-black shadow-lg' : 'bg-gray-300'
                      }`}>
                        {isCompleted && (
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        )}
                      </div>
                      
                      {stepNumber < totalSteps && (
                        <div className={`sm:h-0.5 sm:w-full lg:w-0.5 lg:h-full sm:flex-1 lg:flex-1 sm:mt-4 sm:mb-4 lg:mt-6 lg:mb-6 transition-all duration-300 ${
                          isCurrentOrCompleted ? 'bg-black' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Campaign Creation Card */}
            <div className="w-full sm:w-full md:w-[700px] lg:w-[960px] xl:w-[1020px] h-auto sm:h-[500px] md:h-[550px] lg:h-[580px] xl:h-[600px]">
              {/* Step 1: Choose Campaign Type */}
              <div className="relative h-full rounded-2xl p-[4px] sm:p-[5px] lg:p-[6px]" style={{ background: 'linear-gradient(to right, #B04ADC, #FF7247, #F3B246)' }}>
                <div className="h-full w-full rounded-xl bg-white shadow-lg sm:shadow-xl flex flex-col">
                  <div className="pb-4 sm:pb-6 px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 lg:pt-12">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        {currentStep}. {currentStep === 1 ? 'Campaign Type' : 
                         currentStep === 2 ? 'Add Campaign Information' :
                         currentStep === 3 ? 'Target Audience' : 'Review & Launch'}
                      </h2>
                      <p className="text-base sm:text-lg lg:text-xl text-gray-500 leading-relaxed">
                        {currentStep === 1 ? 'Select the best one that fits your goal' :
                         currentStep === 2 ? 'Upload a file or paste a link - we will pull the product and campaign details for you.' :
                         currentStep === 3 ? 'Define who should see your campaign' : 'Review all details and launch'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-0 px-4 sm:px-8 lg:px-12 pb-4 sm:pb-6 lg:pb-8 flex-1 flex flex-col">
                  {currentStep === 1 && !showOtherInput ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 flex-1 py-2 sm:py-4">
                    {/* Sending/Gifting Option */}
                    <button
                      onClick={() => {
                        setSelectedCampaignType('gifting');
                        // Auto-advance to step 2 after selection
                        setTimeout(() => {
                          setCurrentStep(2);
                        }, 300);
                      }}
                      className={`p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 hover:border-gray-400 hover:shadow-md h-full flex flex-col group min-h-[200px] sm:min-h-[250px] ${
                        selectedCampaignType === 'gifting'
                          ? 'border-black bg-gray-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 lg:space-y-6 h-full justify-center">
                        <div className={`p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                          selectedCampaignType === 'gifting'
                            ? 'bg-black shadow-lg'
                            : 'bg-gray-100 group-hover:bg-gray-200'
                        }`}>
                          <Gift className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-colors ${
                            selectedCampaignType === 'gifting'
                              ? 'text-white'
                              : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <p className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${
                            selectedCampaignType === 'gifting'
                              ? 'text-gray-900'
                              : 'text-gray-700'
                          }`}>
                            Sending/Gifting
                          </p>
                          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                            Send the gifts out to selected customers to strengthen your relationship.
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Paid Promotion Option */}
                    <button
                      onClick={() => {
                        setSelectedCampaignType('promotion');
                        // Auto-advance to step 2 after selection
                        setTimeout(() => {
                          setCurrentStep(2);
                        }, 300);
                      }}
                      className={`p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 hover:border-gray-400 hover:shadow-md h-full flex flex-col group min-h-[200px] sm:min-h-[250px] ${
                        selectedCampaignType === 'promotion'
                          ? 'border-black bg-gray-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 lg:space-y-6 h-full justify-center">
                        <div className={`p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                          selectedCampaignType === 'promotion'
                            ? 'bg-black shadow-lg'
                            : 'bg-gray-100 group-hover:bg-gray-200'
                        }`}>
                          <DollarSign className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-colors ${
                            selectedCampaignType === 'promotion'
                              ? 'text-white'
                              : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <p className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${
                            selectedCampaignType === 'promotion'
                              ? 'text-gray-900'
                              : 'text-gray-700'
                          }`}>
                            Paid Promotion
                          </p>
                          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                            Pay for getting your content, promotions, or products featured.
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Other Option */}
                    <button
                      onClick={() => {
                        setSelectedCampaignType('other');
                        setShowOtherInput(true);
                      }}
                      className={`p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 hover:border-gray-400 hover:shadow-md h-full flex flex-col group min-h-[200px] sm:min-h-[250px] sm:col-span-2 lg:col-span-1 ${
                        selectedCampaignType === 'other'
                          ? 'border-black bg-gray-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 lg:space-y-6 h-full justify-center">
                        <div className={`p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                          selectedCampaignType === 'other'
                            ? 'bg-black shadow-lg'
                            : 'bg-gray-100 group-hover:bg-gray-200'
                        }`}>
                          <Layers className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-colors ${
                            selectedCampaignType === 'other'
                              ? 'text-white'
                              : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <p className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${
                            selectedCampaignType === 'other'
                              ? 'text-gray-900'
                              : 'text-gray-700'
                          }`}>
                            Other
                          </p>
                          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                            For all campaigns, special types, influencing.
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                  ) : showOtherInput && currentStep === 1 ? (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <Layers className="w-6 h-6 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Other</h3>
                      </div>
                      <p className="text-sm text-gray-500" style={{ marginLeft: '60px' }}>
                        For all other types of creator collaboration campaigns.
                      </p>
                    </div>
                    
                    <div className="flex-1 mb-6">
                      <textarea
                        placeholder="Tell us what your goal is for this campaign."
                        value={otherCampaignGoal}
                        onChange={(e) => setOtherCampaignGoal(e.target.value)}
                        className="w-full h-full min-h-[200px] text-lg py-4 px-4 rounded-xl border-2 border-gray-200 focus:border-black focus:ring-0 resize-none placeholder:text-gray-400"
                      />
                    </div>
                    
                    {/* Action Buttons for Other input */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                      <Button 
                        variant="outline"
                        className="px-8 py-4 text-lg font-medium rounded-xl border-2"
                        onClick={() => {
                          setShowOtherInput(false);
                          setSelectedCampaignType(null);
                          setOtherCampaignGoal('');
                        }}
                      >
                        Back
                      </Button>
                      
                      <Button 
                        className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-xl font-medium rounded-xl ml-auto"
                        disabled={!otherCampaignGoal.trim()}
                        onClick={() => {
                          if (otherCampaignGoal.trim()) {
                            setCurrentStep(2);
                            setShowOtherInput(false);
                          }
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                  ) : currentStep === 2 ? (
                  <div className="flex-1 flex flex-col mb-6">
                    {/* Product Type Tabs */}
                    <div className="flex justify-center mb-8">
                      <button
                        onClick={() => setSelectedProductType('new')}
                        className={`px-6 py-3 text-base font-medium rounded-lg mr-4 transition-colors ${
                          selectedProductType === 'new'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        New Product
                      </button>
                      <button
                        onClick={() => setSelectedProductType('existing')}
                        className={`px-6 py-3 text-base font-medium rounded-lg transition-colors ${
                          selectedProductType === 'existing'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Existing Products
                      </button>
                    </div>

                    {selectedProductType === 'new' ? (
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="max-w-2xl mx-auto w-full px-16 space-y-6">
                          {/* Product URL Section */}
                          <div>
                            <label className="block text-base font-medium text-gray-900 mb-2">
                              Product URL (optional)
                            </label>
                            <Input
                              type="url"
                              placeholder="Paste link"
                              value={productUrl}
                              onChange={(e) => setProductUrl(e.target.value)}
                              className="text-base py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-black focus:ring-0"
                            />
                          </div>

                          {/* File Upload Section */}
                          <div>
                            <label className="block text-base font-medium text-gray-900 mb-2">
                              File Upload
                            </label>
                            <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-gray-400 transition-colors cursor-pointer h-32 flex items-center justify-center">
                              <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                  <Upload className="w-5 h-5 text-gray-500" />
                                </div>
                                <p className="text-base font-medium text-gray-900 mb-1">
                                  Drop in your product/campaign info
                                </p>
                                <p className="text-sm text-gray-500 mb-2">
                                  Click to upload
                                </p>
                                <p className="text-xs text-gray-400">
                                  PDF/CSV
                                </p>
                              </div>
                              <input
                                type="file"
                                multiple
                                accept=".pdf,.csv"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                  if (e.target.files) {
                                    setUploadedFiles(Array.from(e.target.files));
                                  }
                                }}
                              />
                            </div>
                            
                            {uploadedFiles.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700 mb-2">Uploaded files:</p>
                                <ul className="space-y-1">
                                  {uploadedFiles.map((file, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-center">
                                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                      {file.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Buttons for New Product */}
                        <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                          {currentStep > 1 && (
                            <Button 
                              variant="outline"
                              className="px-8 py-4 text-lg font-medium rounded-xl border-2"
                              onClick={() => {
                                setCurrentStep(currentStep - 1);
                                setSelectedCampaignType(null);
                              }}
                            >
                              Back
                            </Button>
                          )}
                          
                          <Button 
                            className="bg-black hover:bg-gray-800 text-white px-10 py-4 text-xl font-medium rounded-xl ml-auto"
                            onClick={() => {
                              if (currentStep < totalSteps) {
                                setCurrentStep(currentStep + 1);
                              }
                            }}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full">
                        {/* Search Bar */}
                        <div className="relative mb-4">
                          <Input
                            type="text"
                            placeholder="Summer Yeti Cooler..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="text-base py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-black focus:ring-0"
                          />
                        </div>

                        {/* Products List */}
                        <div className="flex-1 overflow-hidden mb-4">
                          <div className="h-full max-h-48 overflow-y-auto space-y-3 pr-2">
                            {existingProducts.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                onClick={() => {
                                  if (selectedProducts.includes(product.id)) {
                                    setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                                  } else {
                                    setSelectedProducts([...selectedProducts, product.id]);
                                  }
                                }}
                              >
                                <div className="flex items-center">
                                  <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                                    selectedProducts.includes(product.id)
                                      ? 'bg-black border-black'
                                      : 'border-gray-300'
                                  }`}>
                                    {selectedProducts.includes(product.id) && (
                                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                                    )}
                                  </div>
                                  <span className="text-base font-medium text-gray-900">{product.name}</span>
                                </div>
                                <span className="text-sm text-gray-500">Created {product.createdDate}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Action Buttons for Existing Products */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          {currentStep > 1 && (
                            <Button 
                              variant="outline"
                              className="px-8 py-3 text-base font-medium rounded-xl border-2 mr-3"
                              onClick={() => {
                                setCurrentStep(currentStep - 1);
                                setSelectedCampaignType(null);
                              }}
                            >
                              Back
                            </Button>
                          )}
                          
                          <Button 
                            className="bg-gray-500 hover:bg-gray-600 text-white px-10 py-3 text-lg font-medium rounded-xl ml-auto"
                            onClick={() => {
                              // Handle scan functionality here
                              console.log('Scanning selected products:', selectedProducts);
                            }}
                          >
                            Scan
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <p className="text-2xl mb-4">Step {currentStep} Content</p>
                      <p className="text-lg">This step is under construction. Select any option to continue.</p>
                    </div>
                  </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
