type ButtonGeneralProps = React.ComponentProps<"button">;
type ButtonProps = ButtonGeneralProps & {
  text?: string;
  className?: string;
    type?: "button" | "submit" | "reset";
};

export const Button = ({ text, className,type, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      type={type || "button"}
      className={`${className} border cursor-pointer`}
    >
      {text}
    </button>
  );
};
