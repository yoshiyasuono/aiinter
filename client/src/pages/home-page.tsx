import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-[#2F4F4F] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src="/ai-logo-white.png" alt="AI School" className="h-12 w-auto" />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-[#2F4F4F] text-white py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">
              ai Admission Application
            </h1>
            <p className="text-lg mb-8">
              Begin your admission application process
            </p>
            <Link href="/apply">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8">
                Start Application
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 ai International School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}