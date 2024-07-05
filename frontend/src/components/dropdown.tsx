import * as React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "../lib/utils";

type DropdownMenuRadioGroupDemoProps = {
  option1: string;
  option2: string;
  selectedGender: string;
  onChangeGender: (gender: string) => void; // Adjusted onChangeGender prop type
};

export function DropdownMenuRadioGroupDemo({
  option1,
  option2,
  onChangeGender,
  selectedGender,
}: DropdownMenuRadioGroupDemoProps) {
  const handleGenderChange = (value: string) => {
    onChangeGender(value); // Invoke the parent component's onChangeGender function
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-[#18181b] disabled:hover:bg-accent"
          variant="outline"
        >
          Gender
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("flex flex-col space-y-2 w-full")}>
        <DropdownMenuLabel>Gender Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedGender} onValueChange={handleGenderChange}>
          <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={option1}>{option1.toUpperCase()}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={option2}>{option2.toLocaleUpperCase()}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
