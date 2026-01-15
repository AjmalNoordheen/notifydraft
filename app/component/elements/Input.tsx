import * as React from "react";

interface InputPros extends React.ComponentProps<"input"> {
    className?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export const Input = ({ type, className, ref, ...props }: InputPros) => {
    return (
         <input
        type={type}
        className=
          "flex h-10 w-full rounded-md border text-black border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        ref={ref}
        {...props}
      />
    )
}

export const Label = ({ className, ...props }: React.HTMLAttributes<HTMLLabelElement>) => {
    return (
        <label className={`block text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props} />
    )
}