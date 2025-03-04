import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { formStorage } from "@/lib/form-storage";
import Stepper from "@/components/stepper";
import StudentForm from "@/components/student-form";
import AddressForm from "@/components/address-form";
import ParentForm from "@/components/parent-form";
import MedicalForm from "@/components/medical-form";
import EducationForm from "@/components/education-form";
import EmergencyForm from "@/components/emergency-form";
import TermsForm from "@/components/terms-form";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const steps = [
  { title: "Student", description: "Basic information" },
  { title: "Address", description: "Contact details" },
  { title: "Parents", description: "Guardian information" },
  { title: "Medical", description: "Health details" },
  { title: "Education", description: "Previous schools" },
  { title: "Emergency", description: "Emergency contacts" },
  { title: "Terms", description: "Agreements" },
];

export default function ApplicationForm() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const saved = formStorage.load();
    if (saved) {
      setCurrentStep(saved.step);
      setFormData(saved.data);
      setCompletedSteps(Array.from({ length: saved.step }, (_, i) => i));
    }
  }, []);

  const applicationMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/applications", data);
      return await res.json();
    },
    onSuccess: (data) => {
      formStorage.clear();
      setLocation(`/success/${data.referenceNumber}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Error submitting application",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleStepSubmit = (data: any) => {
    console.log('Step data received:', data);
    console.log('Current step:', currentStep);
    console.log('Current form data:', formData);

    // Combine the current form data with the new data
    const updatedData = { 
      ...formData, 
      ...data
    };

    console.log('Updated data:', updatedData);
    setFormData(updatedData);

    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setCompletedSteps((prev) => [...prev, currentStep]);
      formStorage.save({
        step: nextStep,
        data: updatedData,
      });
    } else {
      // Format the data before submission if needed
      const submissionData = {
        ...updatedData,
        // Ensure dateOfBirth is a string in YYYY-MM-DD format
        dateOfBirth: updatedData.dateOfBirth instanceof Date 
          ? updatedData.dateOfBirth.toISOString().split('T')[0]
          : updatedData.dateOfBirth,
      };
      applicationMutation.mutate(submissionData);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Admission Application
        </h1>

        <Stepper
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />

        <Card className="mt-8">
          <CardContent className="pt-6">
            {applicationMutation.isPending ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#4CAF50]" />
              </div>
            ) : (
              <>
                {currentStep === 0 && (
                  <StudentForm
                    onSubmit={handleStepSubmit}
                    defaultValues={formData}
                  />
                )}
                {currentStep === 1 && (
                  <AddressForm
                    onSubmit={handleStepSubmit}
                    defaultValues={formData}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 2 && (
                  <ParentForm
                    onSubmit={handleStepSubmit}
                    defaultValues={formData}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 3 && (
                  <MedicalForm
                    onSubmit={handleStepSubmit}
                    defaultValues={formData}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 4 && (
                  <EducationForm
                    onSubmit={handleStepSubmit}
                    defaultValues={formData}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 5 && (
                  <EmergencyForm
                    onSubmit={handleStepSubmit}
                    defaultValues={formData}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 6 && (
                  <TermsForm
                    onSubmit={handleStepSubmit}
                    defaultValues={formData}
                    onBack={handleBack}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}