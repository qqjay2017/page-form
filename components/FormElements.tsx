import { CheckboxFieldFormElement } from "./fields/CheckboxField";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";
export type SubmitFunction = (key: string, value: string) => void;

export type ElementsType =
  | "TextField"
  | "TitleField"
  //   | "SubTitleField"
  //   | "ParagraphField"
  //   | "SeparatorField"
  //   | "SpacerField"
  //   | "NumberField"
  //   | "TextAreaField"
  //   | "DateField"
  //   | "SelectField"
  | "CheckboxField";

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
  // 预览/真实用的元素
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    isInvalid?: boolean;
    defaultValue?: string;
    submitValue?: SubmitFunction;
  }>;
  // 右边的属性面板
  propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
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
  TitleField: TitleFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
