const Button = ({
  title,
  onClick,
  className,
}: {
  title: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={` ${className} py-1 px-4 bg-primary text-white text-lg rounded-full`}
    >
      {title}
    </button>
  );
};

export default Button;
