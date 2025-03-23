import { Footer } from "@/components/footer";
import { Header, HeaderVariant } from "@/components/header/app-header";


export default function AppLayout({
  variant,
  children,
}: {
  children: React.ReactNode;
  variant:HeaderVariant
}) {
  return (
    <div className="min-h-screen flex flex-col">
        <Header variant={variant}/>
        <main className="flex-1">{children}</main>
        <Footer/>    
    </div>
  );
}