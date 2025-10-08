function ModuleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-2 w-full rounded-2xl border border-neutral-300">
      {children}
    </div>
  );
}

export default ModuleLayout;
