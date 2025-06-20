import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { MessageCircle } from "lucide-react";

export default function ContactPortal() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Professional Contact Portal Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-3xl font-bold text-gradient-purple px-6 py-3 rounded-2xl border border-purple-200 purple-gradient-light shadow-sm">
              Professional Contact Portal
            </h2>
          </div>
        </div>

        {/* Get In Touch Section */}
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <MessageCircle className="text-purple-600 text-xl w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Get In Touch</h3>
            </div>
            <p className="text-gray-600">Send me a message and I'll get back to you as soon as possible.</p>
          </div>

          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Alternative Contact</h4>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>reygabrielmanaloperez@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
