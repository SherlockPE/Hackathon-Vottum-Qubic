import * as React from "react";
import { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "pink";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [selectedItem, setSelectedItem] = useState("Select Crypto");

    const variantClasses = {
      default: "bg-blue-500 text-black hover:bg-blue-600",
      secondary: "bg-gray-100 text-black hover:bg-gray-200",
      outline: "border border-gray-300 text-black bg-transparent hover:bg-gray-100",
      ghost: "bg-transparent text-black hover:bg-gray-100",
      link: "text-black underline-offset-4 hover:underline",
      pink: "bg-pink-500 text-black hover:bg-pink-600"
    };

    const sizeClasses = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 rounded-lg px-8",
      icon: "h-9 w-9"
    };

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Comp
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              variantClasses[variant],
              sizeClasses[size],
              className
            )}
            ref={ref}
            {...props}
          >
            {selectedItem}
          </Comp>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white rounded shadow-md p-2">
          <DropdownMenu.Item className="p-2 text-black hover:bg-gray-100 cursor-pointer" onSelect={() => setSelectedItem("Blockchain")}>Blockchain</DropdownMenu.Item>
          <DropdownMenu.Item className="p-2 text-black hover:bg-gray-100 cursor-pointer" onSelect={() => setSelectedItem("Ethereum")}>Ethereum</DropdownMenu.Item>
          <DropdownMenu.Item className="p-2 text-black hover:bg-gray-100 cursor-pointer" onSelect={() => setSelectedItem("Bitcoin")}>Bitcoin</DropdownMenu.Item>
          <DropdownMenu.Item className="p-2 text-black hover:bg-gray-100 cursor-pointer" onSelect={() => setSelectedItem("Litecoin")}>Litecoin</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  }
);
Button.displayName = "Button";

export { Button };