"use client";

import { Fragment, useState } from "react";
import { Separator } from "@ui/components/ui/separator";
import { Toggle } from "@ui/components/ui/toggle";
import {
  BookImage,
  CaseSensitive,
  Circle,
  Diamond,
  Eraser,
  Hand,
  LockKeyhole,
  Minus,
  MousePointer,
  MoveRight,
  Pencil,
  Square,
} from "lucide-react";

export function TopBar() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleToolToggle = (toolName: string) => {
    setActiveTool(activeTool === toolName ? null : toolName);
  };

  const tools = [
    { icon: LockKeyhole, name: "lock" },
    { icon: Hand, name: "hand" },
    { icon: MousePointer, name: "pointer" },
    { icon: Square, name: "square" },
    { icon: Diamond, name: "diamond" },
    { icon: Circle, name: "circle" },
    { icon: MoveRight, name: "move" },
    { icon: Minus, name: "minus" },
    { icon: Pencil, name: "pencil" },
    { icon: CaseSensitive, name: "case" },
    { icon: BookImage, name: "book" },
    { icon: Eraser, name: "eraser" },
  ];

  return (
    <div className="flex h-12 items-center space-x-1 rounded-md  border bg-background p-1">
      {tools.map((tool, index) => (
        <Fragment key={tool.name}>
          {index === 1 && (
            <Separator orientation="vertical" className="mx-1 h-9" />
          )}
          <Toggle
            size="sm"
            pressed={activeTool === tool.name}
            onPressedChange={() => handleToolToggle(tool.name)}
            aria-label={`Toggle ${tool.name} tool`}
          >
            <tool.icon className="h-4 w-4" />
          </Toggle>
        </Fragment>
      ))}
    </div>
  );
}
