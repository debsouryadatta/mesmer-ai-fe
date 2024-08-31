import { SideBar } from "@/components/common/SideBar";

// const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SideBar>
        {children}
      </SideBar>
  );
}