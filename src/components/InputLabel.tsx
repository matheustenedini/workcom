type TInputLabel = {
  children: React.ReactNode;
  name: string;
  showAsterisk?: boolean;
  className?: string;
};

const InputLabel = ({
  children,
  name,
  showAsterisk,
  className,
}: TInputLabel) => (
  <label
    htmlFor={name}
    className={`mb-2.5 flex items-center font-semibold text-gray-700 ${className}`}
  >
    {children}

    {showAsterisk && <div className="ml-1 font-logo text-red-400">*</div>}
  </label>
);

export default InputLabel;
