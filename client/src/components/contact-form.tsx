import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Mail, Tag, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ContactForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
      queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
    },
    onError: (error: any) => {
      console.error("Contact form error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
      <div className="purple-gradient h-2"></div>
      <div className="p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <Label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 text-purple-500 mr-2" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="form-input"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 text-purple-500 mr-2" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="form-input"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <Label htmlFor="subject" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 text-purple-500 mr-2" />
              Subject
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="What is this regarding?"
              className="form-input"
              {...form.register("subject")}
            />
            {form.formState.errors.subject && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <Label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 text-purple-500 mr-2" />
              Message
            </Label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Type your message here..."
              className="form-input resize-none"
              {...form.register("message")}
            />
            {form.formState.errors.message && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={contactMutation.isPending}
              className="w-full btn-purple py-4 px-6 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{contactMutation.isPending ? "Sending..." : "Send Message"}</span>
            </Button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription>
                Message sent successfully! I'll get back to you soon.
              </AlertDescription>
            </Alert>
          )}

          {/* Error Message */}
          {contactMutation.isError && (
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription>
                Failed to send message. <a href="/email-setup" className="underline text-red-700 hover:text-red-800">Check email setup guide</a>
              </AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
