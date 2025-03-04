import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Globe2, BookOpen, Users, Clock, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-50 to-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              International School Admissions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Begin your journey towards a world-class education at our prestigious international school. 
              We nurture global citizens through innovative learning experiences.
            </p>
            <Link href="/apply">
              <Button size="lg" className="bg-[#4CAF50] hover:bg-[#45a049] text-lg px-8">
                Start Application
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <Globe2 className="w-12 h-12 text-[#4CAF50] mb-4" />
                <CardTitle>Global Education</CardTitle>
              </CardHeader>
              <CardContent>
                Diverse curriculum fostering international mindedness and cultural understanding.
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-[#4CAF50] mb-4" />
                <CardTitle>Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                Rigorous academic programs tailored to develop critical thinking and creativity.
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <Users className="w-12 h-12 text-[#4CAF50] mb-4" />
                <CardTitle>Diverse Community</CardTitle>
              </CardHeader>
              <CardContent>
                Students and faculty from over 50 countries creating a rich multicultural environment.
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <Clock className="w-12 h-12 text-[#4CAF50] mb-4" />
                <CardTitle>Modern Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                State-of-the-art facilities supporting both academic and extracurricular activities.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Process Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-[#4CAF50]">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Application</h3>
              <p className="text-gray-600">
                Complete our comprehensive online application form with all required information.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-[#4CAF50]">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Document Review</h3>
              <p className="text-gray-600">
                Our admissions team will review your application and supporting documents.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-[#4CAF50]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Final Decision</h3>
              <p className="text-gray-600">
                Receive our admissions decision within 5-7 business days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#4CAF50] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step towards providing your child with an exceptional international education experience.
          </p>
          <Link href="/apply">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-[#4CAF50]">
              Begin Application Process
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 International School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}