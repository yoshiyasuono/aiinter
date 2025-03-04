import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            International School Admissions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to our online application system. Start your journey towards
            world-class education today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Easy Application</CardTitle>
            </CardHeader>
            <CardContent>
              Complete our user-friendly online application form at your own pace.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              Save your progress and return anytime to complete your application.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Response</CardTitle>
            </CardHeader>
            <CardContent>
              Receive updates about your application status promptly.
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/apply">
            <Button size="lg" className="bg-[#4CAF50] hover:bg-[#45a049]">
              Start Application
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
