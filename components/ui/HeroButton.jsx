import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export function HeroButton({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "HeroButton";
  return (
    <Comp
      className={cn(
        "inline-flex items-center cursor-pointer text-base! xl:text-lg! whitespace-nowrap justify-center rounded-[50px]! font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-[#EB6223] text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/20",
        variant === "outline" &&
          "border border-[#EB6223] rounded-[50px]!  bg-white text-[#EB6223] hover:bg-[#fff0e8]",
        variant === "white" &&
          "bg-white text-black hover:-translate-y-0.5 hover:shadow-lg",
        size === "default" && "h-14 max-w-[220px] w-full px-8 text-sm",
        size === "sm" && "h-14 px-5 text-xs",
        className,
      )}
      {...props}
    />
  );
}
