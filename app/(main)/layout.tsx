import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-black font-sans flex flex-col justify-between">
      <Header />
      <div className="flex-1 w-full flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
