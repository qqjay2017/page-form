import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";
//   | "TitleField"
//   | "SubTitleField"
//   | "ParagraphField"
//   | "SeparatorField"
//   | "SpacerField"
//   | "NumberField"
//   | "TextAreaField"
//   | "DateField"
//   | "SelectField"
//   | "CheckboxField";

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  //  编辑器视图左边区域展示的元素
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  // 右边的属性面板
  propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};
type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
