import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ApplicationSuccess() {
  const { reference } = useParams();
  const { data: application, isLoading } = useQuery({
    queryKey: [`/api/applications/reference/${reference}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#4CAF50]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-[#4CAF50]" />
            </div>
            <CardTitle className="text-2xl">Application Submitted!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Thank you for submitting your application. Your reference number is:
              </p>
              <p className="text-2xl font-mono font-bold text-[#4CAF50]">
                {reference}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Next Steps:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Save your reference number for future correspondence</li>
                <li>We will review your application and contact you within 5-7 business days</li>
                <li>Prepare any additional documents that may be requested</li>
              </ul>
            </div>

            <div className="text-center pt-4">
              <Link href="/">
                <Button className="bg-[#4CAF50] hover:bg-[#45a049]">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
