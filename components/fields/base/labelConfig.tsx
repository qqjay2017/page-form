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
import { cn } from "@/lib/utils";
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
          <FormLabel>标题</FormLabel>
          <FormControl>
            <Input
              {...field}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          </FormControl>
          {/* <FormDescription>
            The label of the field. <br /> It will be displayed above the field
          </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
