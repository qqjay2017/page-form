import React from "react";

import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "antd";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
export const fieldNamePropertiesSchema = {
  fieldName: z
    .string({
      errorMap: (issue, _ctx) => {
        console.log(issue, "issue");
        return { message: "这是必填项" };
      },
    })
    .min(1, { message: "这是必填项" })
    .max(100, { message: "最大支持长度100" }),
};

export const FieldNameFormField = ({
  form,
}: {
  form: UseFormReturn<any, any, any>;
}) => {
  return (
    <FormField
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <span className={cn("text-red-500")}>*</span>
            字段名
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          </FormControl>
          {/* <FormDescription>
                The label of the field. <br /> It will be displayed above the
                field
              </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
