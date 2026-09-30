import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duesy | 동아리 회비 관리",
  description: "대학 동아리의 회비 납부와 지출 내역을 한곳에서 관리하는 투명 회계 SaaS",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
