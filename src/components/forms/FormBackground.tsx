const FormBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute h-screen w-full bg-auth-background bg-no-repeat bg-cover flex items-center justify-center max-lg:p-2 lg:pl-20 overflow-hidden bg-[#7ca7d0] z-1000">
      <div className="bg-white w-[580px] p-8 rounded-lg flex flex-col gap-6 max-h-full overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default FormBackground;
