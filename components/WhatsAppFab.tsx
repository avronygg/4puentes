import { whatsappUrl } from "@/lib/site";
import { WhatsApp } from "./Icons";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl("Hola 4 Puentes, quiero cotizar una importación.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-s5 bottom-s5 z-90 grid h-[54px] w-[54px] place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_22px_-8px_rgba(37,211,102,.7)] transition-transform hover:scale-105"
    >
      <WhatsApp />
    </a>
  );
}
