export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24 lg:pt-0">
      {children}
    </div>
  );
}
