"use client";

import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
const type: ElementsType = "TextField";
const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>formComponent</div>,
  propertiesComponent: () => <div>propertiesComponent</div>,

  //   validate: (
  //     formElement: FormElementInstance,
  //     currentValue: string
  //   ): boolean => {
  //     const element = formElement as CustomInstance;
  //     if (element.extraAttributes.required) {
  //       return currentValue.length > 0;
  //     }

  //     return true;
  //   },
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
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

// function FormComponent({
//   // elementInstance,
//   submitValue,
//   isInvalid,
//   defaultValue,
// }: {
//   // elementInstance: FormElementInstance;
//   submitValue?: SubmitFunction;
//   isInvalid?: boolean;
//   defaultValue?: string;
// }) {
//   const element = elementInstance as CustomInstance;

//   const [value, setValue] = useState(defaultValue || "");
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     setError(isInvalid === true);
//   }, [isInvalid]);

//   const { label, required, placeHolder, helperText } = element.extraAttributes;
//   return (
//     <div className="flex flex-col gap-2 w-full">
//       <Label className={cn(error && "text-red-500")}>
//         {label}
//         {required && "*"}
//       </Label>
//       <Input
//         className={cn(error && "border-red-500")}
//         placeholder={placeHolder}
//         onChange={(e) => setValue(e.target.value)}
//         onBlur={(e) => {
//           if (!submitValue) return;
//           const valid = TextFieldFormElement.validate(element, e.target.value);
//           setError(!valid);
//           if (!valid) return;
//           submitValue(element.id, e.target.value);
//         }}
//         value={value}
//       />
//       {helperText && (
//         <p
//           className={cn(
//             "text-muted-foreground text-[0.8rem]",
//             error && "text-red-500"
//           )}
//         >
//           {helperText}
//         </p>
//       )}
//     </div>
//   );
// }
