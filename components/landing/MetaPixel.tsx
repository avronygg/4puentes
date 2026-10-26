import Script from "next/script";
import ConConsentimiento from "@/components/ConConsentimiento";
import { meta } from "@/lib/site";

/**
 * Píxel de Meta de la landing de campaña. Es el código base que entrega el
 * Administrador de eventos, pasado a `next/script` para que cargue después de
 * que la página sea interactiva y no frene el primer pintado.
 *
 * Sólo en producción: en previsualización y en local las visitas no son de
 * nadie y ensuciarían los datos de la campaña. Y sólo si la persona aceptó las
 * cookies (ConConsentimiento): sin ese "Aceptar" el script no se pide a Meta.
 * El evento `Lead` lo dispara el formulario (FormularioContacto) cuando el
 * envío resulta bien y el píxel está cargado.
 *
 * Se omitió a propósito el <noscript><img> del código original de Meta: es un
 * rastreo que se dispara sin consentimiento y sin JavaScript para pedirlo.
 */
export default function MetaPixel() {
  if (process.env.VERCEL_ENV !== "production") return null;

  return (
    <ConConsentimiento>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${meta.pixel}');
fbq('track', 'PageView');`}
      </Script>
    </ConConsentimiento>
  );
}
