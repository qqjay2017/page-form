import React from "react";

import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "antd";
import { UseFormReturn } from "react-hook-form";
import { LabelTooltip } from "./LabelTooltip";
import { WeightEditTitle } from "./WeightEditTitle";

export const labelPropertiesSchema = {
  label: z.string().min(0).max(50),
};

export const LabelFormField = ({
  form,
}: {
  form: UseFormReturn<any, any, any>;
}) => {
  return (
    <FormField
      control={form.control}
      name="label"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center">
            <WeightEditTitle
              title={"标题"}
              tooltip="标题用于告诉填写者应该在该字段中输入什么样的内容。通常是一个词语或词组，也可以是一个问题。"
            />
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
