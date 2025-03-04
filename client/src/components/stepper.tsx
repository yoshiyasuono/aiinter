import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export default function Stepper({ steps, currentStep, completedSteps }: StepperProps) {
  return (
    <div className="w-full py-6">
      <div className="mx-auto w-full max-w-7xl">
        <nav aria-label="Progress">
          <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step, index) => (
              <li key={step.title} className="md:flex-1">
                <div
                  className={cn(
                    "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                    index === currentStep
                      ? "border-[#4CAF50]"
                      : completedSteps.includes(index)
                      ? "border-[#4CAF50]"
                      : "border-gray-200"
                  )}
                >
                  <span className="flex items-center text-sm font-medium">
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        index === currentStep
                          ? "bg-[#4CAF50] text-white"
                          : completedSteps.includes(index)
                          ? "bg-[#4CAF50] text-white"
                          : "border-2 border-gray-300"
                      )}
                    >
                      {completedSteps.includes(index) ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span className="ml-3 text-gray-900">{step.title}</span>
                  </span>
                  <span className="ml-11 text-sm text-gray-500">
                    {step.description}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
