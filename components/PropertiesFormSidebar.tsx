import React from "react";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { WeightEditTitle } from "./fields/base/WeightEditTitle";

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;
  const DesignerBtnElement =
    FormElements[selectedElement?.type].designerBtnElement;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">
          <WeightEditTitle
            icon={DesignerBtnElement.icon}
            titleClassName=" text-[16px]"
            title={DesignerBtnElement.label}
            tooltip={DesignerBtnElement.description}
            iconClassName="text-[16px] mr-2"
          />
        </p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesFormSidebar;
