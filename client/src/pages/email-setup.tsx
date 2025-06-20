import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Mail, Shield, Key } from "lucide-react";

export default function EmailSetupPage() {
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
              <h1 className="text-xl font-semibold text-gray-900">Email Setup Guide</h1>
              <p className="text-sm text-gray-600">Gmail Configuration Instructions</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <h2 className="text-3xl font-bold text-gradient-purple px-6 py-3 rounded-2xl border border-purple-200 purple-gradient-light shadow-sm">
                Gmail App Password Setup
              </h2>
            </div>
          </div>

          {/* Current Issue Alert */}
          <Alert className="mb-8 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-800">
              <strong>Authentication Error:</strong> The Gmail credentials are not working. This usually means you need to set up an App Password instead of using your regular Gmail password.
            </AlertDescription>
          </Alert>

          {/* Step-by-step Instructions */}
          <div className="grid gap-6">
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Shield className="w-5 h-5 mr-2" />
                  Step 1: Enable 2-Factor Authentication
                </CardTitle>
                <CardDescription>
                  Gmail requires 2-factor authentication to use app passwords
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Go to <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Google Account Security</a></li>
                  <li>Under "Signing in to Google", select "2-Step Verification"</li>
                  <li>Follow the setup process to enable 2-factor authentication</li>
                  <li>Verify with your phone number or authenticator app</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Key className="w-5 h-5 mr-2" />
                  Step 2: Generate App Password
                </CardTitle>
                <CardDescription>
                  Create a specific password for the contact portal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Go to <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Google App Passwords</a></li>
                  <li>Sign in to your Google account if prompted</li>
                  <li>Select "Mail" as the app</li>
                  <li>Choose "Other (custom name)" and enter "Contact Portal"</li>
                  <li>Click "Generate"</li>
                  <li>Copy the 16-character password (it will look like: <code className="bg-gray-100 px-2 py-1 rounded">abcd efgh ijkl mnop</code>)</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Mail className="w-5 h-5 mr-2" />
                  Step 3: Update Credentials
                </CardTitle>
                <CardDescription>
                  Use the app password in your contact portal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Current Settings:</h4>
                  <p className="text-sm text-purple-800 mb-1">
                    <strong>Email:</strong> reygabrielmanaloperez@gmail.com
                  </p>
                  <p className="text-sm text-purple-800">
                    <strong>Password:</strong> Use the 16-character app password (not your regular Gmail password)
                  </p>
                </div>
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-800">
                    <strong>Important:</strong> Remove all spaces from the app password when entering it. Use only the 16 characters without spaces.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-purple-700">Troubleshooting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Common Issues:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>535 Authentication Error:</strong> Using regular password instead of app password</li>
                    <li><strong>Username not accepted:</strong> Make sure email is exactly: reygabrielmanaloperez@gmail.com</li>
                    <li><strong>App Password not working:</strong> Try generating a new one</li>
                    <li><strong>Still failing:</strong> Wait a few minutes after generating the app password</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Alternative Testing:</h4>
                  <p className="text-sm text-gray-700">
                    If Gmail setup continues to fail, the contact form will still work and log messages to the server console. 
                    You can check the server logs to see submitted messages until Gmail is properly configured.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back Link */}
          <div className="text-center mt-12">
            <a href="/" className="text-purple-600 hover:text-purple-700 font-medium">
              ← Back to Contact Portal
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}