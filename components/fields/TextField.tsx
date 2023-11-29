"use client";

import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDesigner from "../hooks/useDesigner";
import { Form } from "../ui/form";

import { LabelFormField, labelPropertiesSchema } from "./base/labelConfig";
import { HelpTextField, helpPropertiesSchema } from "./base/helperTextConfig";
import { RequiredField, requiredPropertiesSchema } from "./base/RequiredConfig";
import { DesignComponentCommonLabel } from "./base/DesignComponentCommonLabel";
const type: ElementsType = "TextField";
const extraAttributes = {
  label: "单行文字",
  helperText: "",
  required: false,
  placeHolder: "请输入内容",
};

const propertiesSchema = z.object({
  placeHolder: z.string().max(50),
  ...labelPropertiesSchema,
  ...helpPropertiesSchema,
  ...requiredPropertiesSchema,
});

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "单行文字",
    description: "单行文本输入框，需要填写者在输入框内根据标题填写相应的内容。",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
};
export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  console.log(helperText, "helperText");
  return (
    <div className="flex flex-col gap-2 w-full">
      <DesignComponentCommonLabel label={label} required={required} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
      <Input readOnly disabled placeholder={placeHolder} />
    </div>
  );
}

function FormComponent({
  elementInstance,
  defaultValue,
  submitValue,
  isInvalid,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  const { label, required, placeHolder, helperText } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <DesignComponentCommonLabel
        label={label}
        error={error}
        required={required}
      />
      <Input
        className={cn(error && "border-red-500")}
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextFieldFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        value={value}
      />
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

type PropertiesSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElement } = useDesigner();
  const element = elementInstance as CustomInstance;

  const { label, required, placeHolder, helperText, fieldName, ...rest } =
    element.extraAttributes;
  const form = useForm({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label,
      helperText,
      required,
      placeHolder,
      fieldName,
      ...rest,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesSchemaType) {
    console.log(values, "values values");
    const { label, required, placeHolder, helperText, ...rest } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: label,
        helperText: helperText,
        required: required,
        placeHolder: placeHolder,
        ...rest,
      },
    });
  }
  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        {/* <FieldNameFormField form={form} /> */}
        <LabelFormField form={form} />
        <HelpTextField form={form} />
        {/* <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PlaceHolder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The placeholder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <RequiredField form={form} />
      </form>
    </Form>
  );
}
