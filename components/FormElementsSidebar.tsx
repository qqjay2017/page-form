import React from "react";
import { Separator } from "./ui/separator";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";

function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground/70">元素列表</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          布局元素
        </p>
        <SidebarBtnElement formElement={FormElements.TitleField} />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          表单元素
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
}

export default FormElementsSidebar;
