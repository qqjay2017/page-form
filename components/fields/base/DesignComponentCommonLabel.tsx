import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

export const DesignComponentCommonLabel = ({
  error,
  label,
  required,
}: {
  error?: any;
  label?: any;
  required?: any;
}) => {
  return (
    <Label className={cn(error && "text-red-500")}>
      {label}
      {required && <span className="text-red-500 ml-2">*</span>}
    </Label>
  );
};
