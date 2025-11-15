function ModuleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-2 my-2 flex max-h-[94vh] w-full flex-col rounded-2xl border">
      {children}
    </div>
  );
}

export default ModuleLayout;
