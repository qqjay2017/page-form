import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { CiCircleQuestion } from "react-icons/ci";
export const LabelTooltip = ({ content }: { content: string }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className="ml-2 mt-0">
          <CiCircleQuestion
            className=" inline-block  hover:cursor-pointer"
            style={{
              color: "#acb3bd",
            }}
          />
        </TooltipTrigger>
        <TooltipContent className="  max-w-[220px]">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
