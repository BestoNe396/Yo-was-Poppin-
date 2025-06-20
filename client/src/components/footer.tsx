import { FileText, Book } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {/* Wider CP Branding */}
            <div className="cp-brand text-lg px-4 py-2">
              CP
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Professional Contact Portal</span>
              <div>©2025 All rights reserved</div>
            </div>
          </div>
          
          {/* Links */}
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <a 
              href="/download" 
              className="hover:text-purple-600 transition-colors flex items-center"
            >
              <FileText className="w-4 h-4 mr-1" />
              Download Files
            </a>
            <a 
              href="/api/license" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition-colors flex items-center"
            >
              <Book className="w-4 h-4 mr-1" />
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
