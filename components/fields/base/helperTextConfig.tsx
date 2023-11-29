import { UseFormReturn } from "react-hook-form";
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
import { WeightEditTitle } from "./WeightEditTitle";

export const HelpTextField = ({
  form,
}: {
  form: UseFormReturn<any, any, any>;
}) => {
  return (
    <FormField
      control={form.control}
      name="helperText"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <WeightEditTitle
              title={"提示"}
              tooltip="提示属性用于指定对该模块进行一些附加说明，一般用来指导填写者输入。"
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

export const helpPropertiesSchema = {
  helperText: z.string().max(200).default(""),
};
