type ButtonGeneralProps = React.ComponentProps<"button">;
type ButtonProps = ButtonGeneralProps & {
  text?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
};

export const Button = ({ text, className, type,variant = "primary", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      type={type || "button"}
      className={`${className} ${variants[variant]} ${baseStyles}`}
    >
      {text}
    </button>
  );
};

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseStyles =
  "inline-flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none";

const variants: Record<ButtonVariant, string> = {
  primary: `text-white border font-medium [background-image:var(--ring-gradient)] hover:[background-image:var(--ring-gradient-hover)] rounded-md border-input`,
  secondary: `border-input border font-medium text-slate-800 hover:bg-slate-100 rounded-md bg-white`,
  ghost: `bg-gray-800 hover:bg-gray-900 text-white rounded-md`,
};
