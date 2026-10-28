import { WaIcon, TgIcon, MaxIcon } from "../icons";
import { WHATSAPP, TG_LINK, MAX_LINK } from "../data";

const cls =
  "inline-flex items-center gap-2 rounded-full border border-graphite/15 bg-white px-4 py-2.5 text-sm font-semibold text-graphite transition hover:border-emerald hover:text-emerald";
const icon = "h-[18px] w-[18px] fill-current";

type Props = { className?: string; items?: ("wa" | "tg" | "max")[] };

export default function Messengers({ className = "", items = ["max", "tg", "wa"] }: Props) {
  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      {items.includes("max") && (
        <a href={MAX_LINK} target="_blank" rel="noreferrer" aria-label="MAX" className={cls}><MaxIcon className={icon} />MAX</a>
      )}
      {items.includes("tg") && (
        <a href={TG_LINK} target="_blank" rel="noreferrer" aria-label="Telegram" className={cls}><TgIcon className={icon} />Telegram</a>
      )}
      {items.includes("wa") && (
        <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className={cls}><WaIcon className={icon} />WhatsApp</a>
      )}
    </div>
  );
}
