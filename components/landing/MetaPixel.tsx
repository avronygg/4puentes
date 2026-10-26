import Script from "next/script";
import { meta } from "@/lib/site";

/**
 * Píxel de Meta de la landing de campaña. Es el código base que entrega el
 * Administrador de eventos, pasado a `next/script` para que cargue después de
 * que la página sea interactiva y no frene el primer pintado.
 *
 * Sólo en producción: en previsualización y en local las visitas no son de
 * nadie y ensuciarían los datos de la campaña. El evento `Lead` lo dispara el
 * formulario (FormularioContacto) cuando el envío resulta bien.
 */
export default function MetaPixel() {
  if (process.env.VERCEL_ENV !== "production") return null;

  return (
    <>
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
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${meta.pixel}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
