import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

export default function RegistrationFormDemo({ courseName }) {
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);

  return (
    <>
      {/* Register Now Button */}
      <Button
        className="w-full mt-3 max-[767.5px]:mt-0 gap-5! bg-accent hover:bg-accent/80 text-white"
        onClick={() => setShowComingSoonDialog(true)}
      >
        Register Now <ArrowRight className="w-4 h-4" />
      </Button>

      {/* Coming Soon Dialog */}
      <Dialog
        open={showComingSoonDialog}
        onOpenChange={setShowComingSoonDialog}
      >
        <DialogContent className="sm:max-w-md bg-linear-to-br from-emerald-50 to-white">
          <DialogHeader className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <DialogTitle className="text-2xl font-bold text-emerald-700 text-center">
                Coming Soon!
              </DialogTitle>
            </div>
            <DialogDescription className="text-center space-y-4">
              <p className="text-gray-600">
                We're excited to announce that the{" "}
                <span className="font-semibold text-emerald-600">
                  {courseName}
                </span>{" "}
                course is currently in development.
              </p>
              <p className="text-gray-600">
                Stay tuned for updates and be among the first to know when it
                launches!
              </p>
              <Button
                variant="outline"
                className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                onClick={() => setShowComingSoonDialog(false)}
              >
                Got it, thanks!
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
