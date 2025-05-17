import { MemberHeader } from "@/components/member-header";

export default function MemberLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <MemberHeader />
      {children}
    </div>
  );
}
