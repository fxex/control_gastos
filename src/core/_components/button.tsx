import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl border border-transparent px-5 text-sm font-semibold whitespace-nowrap transition-colors outline-none focus-visible:ring-4 focus-visible:ring-[#d9f1e4] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-[#143d2b] text-white hover:bg-[#1c553b]",
        secondary: "bg-[#d9f1e4] text-[#143d2b] hover:bg-[#c7e8d6]",
        ghost: "text-[#527267] hover:bg-[#edf4ef] hover:text-[#143d2b]",
        outline: "border-[#dbe6df] bg-white text-[#28463a] hover:bg-[#edf4ef]",
      },
      size: {
        default: "",
        sm: "min-h-9 rounded-lg px-3 text-xs",
        lg: "min-h-14 rounded-2xl px-6",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({ className, variant, size, ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
