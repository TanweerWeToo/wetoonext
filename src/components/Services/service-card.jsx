"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FacultyRequestForm from "@/components/Services/faculty-request-form";
import FacultyJoinForm from "@/components/Services/faculty-join-form";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ServiceCard({ service }) {
  const [open, setOpen] = useState(false);

  const renderForm = () => {
    switch (service.formType) {
      case "faculty-request":
        return <FacultyRequestForm setOpen={setOpen} />;
      case "faculty-join":
        return <FacultyJoinForm setOpen={setOpen} />;
      default:
        return null;
    }
  };

  const CardWrapper = ({ children }) => (
    <Card className="flex flex-col justify-between bg-primary border-2 border-secondary/20 backdrop-blur-sm transition-all duration-300 hover:border-secondary hover:shadow-2xl hover:shadow-primary/10 group">
      {children}
    </Card>
  );

  const CardBody = () => (
    <>
      <CardHeader className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="bg-accent p-3 rounded-lg transition-colors duration-300 group-hover:bg-accent/80">
            {service.icon}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-white">
              {service.title}
            </CardTitle>
            <CardDescription className="mt-2 text-white/80">
              {service.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow hidden sm:flex" />
      <CardFooter className="flex relative z-10 justify-end p-4">
        {service.type === "form" ? (
          <Button className="bg-secondary text-white hover:bg-secondary/80">
            {service.cta}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        ) : (
          <div className="flex flex-col items-end space-y-2 text-sm text-white">
            <a
              href="tel:+919773573083"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 9773573083</span>
            </a>
            <a
              href="mailto:wetoo.media@gmail.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>wetoo.media@gmail.com</span>
            </a>
          </div>
        )}
      </CardFooter>
    </>
  );

  if (service.type === "form") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="text-left h-full">
            <CardWrapper>
              <div className="absolute inset-0 opacity-5 z-0">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </div>
              <CardBody />
            </CardWrapper>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[420px] scale-90 bg-white backdrop-blur-lg border-border/50">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl">
              {service.title}
            </DialogTitle>
          </DialogHeader>
          {renderForm()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <CardWrapper>
        <div className="absolute inset-0 opacity-5 z-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <CardBody />
      </CardWrapper>
    </>
  );
}
