import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import nodemailer from "nodemailer";
import archiver from "archiver";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create nodemailer transporter with multiple fallback options
  let transporter;
  
  // Try Gmail first
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Fallback to console logging if no credentials
    transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true
    });
  }

  // Test email configuration endpoint
  app.get("/api/test-email", async (req, res) => {
    try {
      await transporter.verify();
      res.json({ success: true, message: "Email configuration is working" });
    } catch (error) {
      console.error("Email verification failed:", error);
      res.status(500).json({ 
        success: false, 
        message: "Email configuration failed",
        error: error.message 
      });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the message
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Prepare email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'reygabrielmanaloperez@gmail.com',
        subject: `Contact Portal: ${validatedData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #9333ea, #7c3aed); padding: 20px; color: white; border-radius: 10px 10px 0 0;">
              <h2 style="margin: 0; display: flex; align-items: center;">
                <span style="background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 8px; margin-right: 12px; font-weight: bold;">CP</span>
                Contact Portal Message
              </h2>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <h3 style="color: #7c3aed; margin-top: 0;">Message Details</h3>
                <p><strong>From:</strong> ${validatedData.name}</p>
                <p><strong>Email:</strong> ${validatedData.email}</p>
                <p><strong>Subject:</strong> ${validatedData.subject}</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h3 style="color: #7c3aed; margin-top: 0;">Message</h3>
                <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #7c3aed;">
                  ${validatedData.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <div style="margin-top: 20px; padding: 15px; background: #ddd6fe; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #5b21b6; font-size: 12px;">
                  This message was sent through the Professional Contact Portal
                </p>
              </div>
            </div>
          </div>
        `,
        replyTo: validatedData.email
      };
      
      // Send email
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        // Log email to console if no credentials configured
        console.log("=== EMAIL WOULD BE SENT ===");
        console.log("To:", mailOptions.to);
        console.log("Subject:", mailOptions.subject);
        console.log("From:", validatedData.name, "<" + validatedData.email + ">");
        console.log("Message:", validatedData.message);
        console.log("=========================");
      }
      
      res.json({ 
        success: true, 
        message: "Message sent successfully!",
        id: contactMessage.id,
        note: process.env.EMAIL_USER ? "Email sent to Gmail" : "Email logged to console (Gmail not configured)"
      });
      
    } catch (error: any) {
      console.error("Contact form error:", error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          success: false, 
          message: "Please check your form data",
          errors: error.errors 
        });
      }
      
      // Handle Gmail authentication errors specifically
      if (error.code === 'EAUTH') {
        return res.status(500).json({ 
          success: false, 
          message: "Email authentication failed. Please check Gmail app password setup.",
          hint: "Make sure 2-factor authentication is enabled and you're using an app password, not your regular password."
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to send message. Please try again later." 
      });
    }
  });

  // Get contact messages endpoint (for admin purposes)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ message: "Failed to retrieve messages" });
    }
  });

  // License endpoint
  app.get("/api/license", (req, res) => {
    const licenseText = `MIT License

Copyright (c) 2025 Contact Portal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

    res.set('Content-Type', 'text/plain');
    res.send(licenseText);
  });

  // Download endpoints for zip files
  app.get("/api/download/:filename", async (req, res) => {
    const { filename } = req.params;
    
    try {
      const archive = archiver('zip', { zlib: { level: 9 } });
      
      res.attachment(filename);
      res.setHeader('Content-Type', 'application/zip');
      
      archive.pipe(res);
      
      const projectRoot = path.resolve('.');
      
      if (filename === 'contact-portal-complete.zip') {
        // Add all project files except node_modules and build artifacts
        archive.glob('**/*', {
          cwd: projectRoot,
          ignore: [
            'node_modules/**',
            'dist/**',
            '*.log',
            '.env*',
            '.git/**',
            'tmp/**',
            '*.zip'
          ]
        });
        
        // Add deployment files
        archive.append(`# Contact Portal

Professional contact portal website with purple branding and Nodemailer integration.

## Features
- Modern React frontend with purple gradient styling
- Express.js backend with email functionality
- Contact form with validation
- Responsive design with rounded corners
- Professional CP branding

## Setup
1. Extract files to your server
2. Run \`npm install\`
3. Set environment variables:
   - EMAIL_USER=your-gmail@gmail.com
   - EMAIL_PASS=your-app-password
4. Run \`npm run dev\` for development or \`npm start\` for production

## Deployment
Upload to any Node.js hosting service like:
- Vercel
- Netlify
- Railway
- DigitalOcean
- AWS

## License
MIT License - See LICENSE file for details
`, { name: 'README.md' });

      } else if (filename === 'contact-portal-frontend.zip') {
        // Frontend only
        archive.directory(path.join(projectRoot, 'client'), 'client');
        archive.file(path.join(projectRoot, 'package.json'), { name: 'package.json' });
        archive.file(path.join(projectRoot, 'vite.config.ts'), { name: 'vite.config.ts' });
        archive.file(path.join(projectRoot, 'tailwind.config.ts'), { name: 'tailwind.config.ts' });
        
      } else if (filename === 'contact-portal-backend.zip') {
        // Backend only
        archive.directory(path.join(projectRoot, 'server'), 'server');
        archive.directory(path.join(projectRoot, 'shared'), 'shared');
        archive.file(path.join(projectRoot, 'package.json'), { name: 'package.json' });
        archive.file(path.join(projectRoot, 'tsconfig.json'), { name: 'tsconfig.json' });
        
      } else {
        return res.status(404).json({ error: 'File not found' });
      }
      
      await archive.finalize();
      
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ error: 'Failed to create download' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
