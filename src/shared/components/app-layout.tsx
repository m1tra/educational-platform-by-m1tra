import { Footer } from "./footer";
import { Header, HeaderVariant } from "./header/app-header";


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