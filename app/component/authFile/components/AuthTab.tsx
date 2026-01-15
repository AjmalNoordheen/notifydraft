export const AuthTab = ({
  showSignIn,
  setShowSignIn,
}: {
  showSignIn: boolean;
  setShowSignIn: (show: boolean) => void;
}) => {
  return (
    <div className="relative w-full bg-slate-100 p-1 rounded flex">
      <div
        className={`absolute  h-[calc(100%-8px)] w-1/2 bg-white rounded
          transition-transform duration-300 ease-in-out
          ${showSignIn ? "translate-x-0" : "translate-x-[96%]"}`}
      />
      <button
        onClick={() => setShowSignIn(true)}
        className="relative z-10 w-1/2 p-1.5 cursor-pointer text-sm font-semibold"
      >
        Sign In
      </button>

      <button
        onClick={() => setShowSignIn(false)}
        className="relative z-10 w-1/2 p-1.5 text-sm cursor-pointer font-semibold"
      >
        Create Account
      </button>
    </div>
  );
};
