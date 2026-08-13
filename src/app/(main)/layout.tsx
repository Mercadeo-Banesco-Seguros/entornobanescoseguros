export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 container mx-auto">
      {children}
    </div>
  );
}
