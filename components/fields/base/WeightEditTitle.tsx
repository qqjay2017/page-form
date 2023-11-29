import React from "react";
import { LabelTooltip } from "./LabelTooltip";
import { cn } from "@/lib/utils";

export const WeightEditTitle = ({
  title,
  tooltip,
  className,
  titleClassName,
  iconClassName,
  icon: Icon,
}: {
  title: string;
  tooltip?: string;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
  icon?: React.ElementType;
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      {Icon && <Icon className={cn(iconClassName)} />}
      <span
        className={cn(
          "text-[#121315]  font-semibold text-[14px]",
          titleClassName
        )}
      >
        {title}
      </span>
      {tooltip && <LabelTooltip content={tooltip} />}
    </div>
  );
};
