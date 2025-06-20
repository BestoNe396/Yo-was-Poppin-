import { Download, Package, FileText, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DownloadPage() {
  const downloadItems = [
    {
      title: "Complete Contact Portal",
      description: "Full source code with all dependencies and configuration files",
      filename: "contact-portal-complete.zip",
      icon: Package,
      size: "~2.5 MB"
    },
    {
      title: "Frontend Only",
      description: "React/Vite frontend application with UI components",
      filename: "contact-portal-frontend.zip", 
      icon: Code,
      size: "~1.8 MB"
    },
    {
      title: "Backend Only",
      description: "Express server with Nodemailer email functionality",
      filename: "contact-portal-backend.zip",
      icon: FileText,
      size: "~0.7 MB"
    }
  ];

  const handleDownload = (filename: string) => {
    // Create download URL for the zip file
    const downloadUrl = `/api/download/${filename}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="cp-brand text-2xl w-12 h-12 flex items-center justify-center">
              CP
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Contact Portal Downloads</h1>
              <p className="text-sm text-gray-600">Download deployment files</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Professional Contact Portal Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-3xl font-bold text-gradient-purple px-6 py-3 rounded-2xl border border-purple-200 purple-gradient-light shadow-sm">
              Download Center
            </h2>
          </div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Download the files you need to deploy your professional contact portal website.
          </p>
        </div>

        {/* Download Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-purple-100">
              <CardHeader className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {item.size}
                  </span>
                </div>
                <Button
                  onClick={() => handleDownload(item.filename)}
                  className="w-full btn-purple py-3 flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-700">Deployment Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">For Complete Deployment:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                  <li>Download the "Complete Contact Portal" package</li>
                  <li>Extract the zip file to your server</li>
                  <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npm install</code></li>
                  <li>Set up your Gmail credentials in environment variables</li>
                  <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code> or <code className="bg-gray-100 px-2 py-1 rounded">npm start</code></li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Required Environment Variables:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li><code className="bg-gray-100 px-2 py-1 rounded">EMAIL_USER</code> - Your Gmail address</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">EMAIL_PASS</code> - Your Gmail app password</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="cp-brand text-lg px-4 py-2">
                CP
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Professional Contact Portal</span>
                <div>©2025 All rights reserved</div>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="/" className="hover:text-purple-600 transition-colors">
                Back to Contact Portal
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}