import { CheckCircle } from "lucide-react";

interface FormProgressProps {
  steps: string[];
  currentStep: number;
  completedSteps?: number[];
}

export function FormProgress({ steps, currentStep, completedSteps = [] }: FormProgressProps) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute left-0 top-5 h-0.5 w-full bg-gray-700">
          <div 
            className="h-full bg-lfc-red transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {/* Steps */}
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index) || index < currentStep;
          
          return (
            <div key={index} className="relative flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                transition-all duration-300 z-10
                ${isActive ? 'bg-lfc-red text-white scale-110' : 
                  isCompleted ? 'bg-lfc-red text-white' : 
                  'bg-gray-800 text-gray-400 border-2 border-gray-700'}
              `}>
                {isCompleted && !isActive ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <span className={`
                mt-2 text-xs font-medium whitespace-nowrap
                ${isActive ? 'text-lfc-red' : isCompleted ? 'text-white' : 'text-gray-500'}
              `}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}