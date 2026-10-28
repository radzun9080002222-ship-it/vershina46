import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { NAV, PHONE, PHONE_HREF } from "../data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-4 xl:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="whitespace-nowrap text-xs font-medium text-ink/70 transition hover:text-emerald">{n.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 xl:flex">
          <a href={PHONE_HREF} className="text-sm font-semibold text-graphite hover:text-emerald">{PHONE}</a>
          <a href="#calc" className="rounded-full bg-graphite px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-emerald">Рассчитать цену</a>
        </div>
        <button className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Меню">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="border-t border-black/5 bg-white px-5 pb-6 pt-2 xl:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium text-ink">{n.label}</a>
          ))}
          <a href={PHONE_HREF} className="mt-2 block py-2 font-semibold text-emerald">{PHONE}</a>
        </div>
      )}
    </header>
  );
}
