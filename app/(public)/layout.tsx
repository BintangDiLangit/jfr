import { getSettings } from "@/lib/data";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { WhatsAppFloat } from "@/components/common/whatsapp-float";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Header brandName={settings.brandName} whatsappNumber={settings.whatsappNumber} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat number={settings.whatsappNumber} />
    </>
  );
}
