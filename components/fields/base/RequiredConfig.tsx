import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React from "react";
import { UseFormReturn } from "react-hook-form";

import { WeightEditTitle } from "./WeightEditTitle";

import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";

export const RequiredField = ({
  form,
}: {
  form: UseFormReturn<any, any, any>;
}) => {
  return (
    <FormField
      control={form.control}
      name="required"
      render={({ field }) => (
        <FormItem className="flex items-center  rounded-lg border p-3 shadow-sm space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <WeightEditTitle
            className="ml-2"
            title="这是个必填项"
            tooltip="选择必填后，填写者不填写将无法提交表单"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const requiredPropertiesSchema = {
  required: z.boolean().default(false),
};
