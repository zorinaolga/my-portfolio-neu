"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/Button/Button";

export interface NavigationItem {
  /** Напис пункту. */
  label: string;
  /** Адреса, куди веде пункт. */
  href: string;
}

export const defaultNavigationItems: NavigationItem[] = [
  { label: "UX/UI Дизайн", href: "/design" },
  { label: "ШІ Контент", href: "/ai-content" },
  { label: "Контакти", href: "/#contacts" },
];

export interface NavigationProps {
  /** Пункти меню. */
  items?: NavigationItem[];
  /** `href` пункту поточної сторінки; він отримує `aria-current="page"`. */
  activeHref?: string;
  /** Напис кнопки, що відкриває меню на вузькому екрані. */
  menuLabel?: string;
  /** Назва меню для скрінрідера. */
  ariaLabel?: string;
}

const itemBase =
  "block border-b-2 px-4 py-3 font-sans text-caption rounded-control " +
  "hover:bg-line outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink";

const itemDefault = "border-transparent text-ink";
const itemActive = "border-accent text-primary";

/**
 * Меню сайту. На широкому екрані пункти стоять у ряд, на вузькому
 * ховаються під кнопку й відкриваються поверх контенту.
 */
export function Navigation({
  items = defaultNavigationItems,
  activeHref,
  menuLabel = "Меню",
  ariaLabel = "Головне меню",
}: NavigationProps) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Фокус повертається на кнопку, щоб не загубитись у схованому меню.
      navRef.current?.querySelector("button")?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <nav ref={navRef} aria-label={ariaLabel} className="relative flex justify-end">
      <div className="md:hidden">
        <Button
          variant="secondary"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((value) => !value)}
        >
          {menuLabel}
        </Button>
      </div>
      <ul
        id={listId}
        className={[
          open ? "flex" : "hidden",
          "flex-col gap-2 md:flex md:flex-row",
          // Панель на вузькому екрані: absolute, тому не зсуває сторінку.
          "max-md:absolute max-md:top-full max-md:right-0 max-md:z-10 max-md:mt-2",
          "max-md:w-max max-md:rounded-card max-md:border max-md:border-line",
          "max-md:bg-surface max-md:p-2",
        ].join(" ")}
      >
        {items.map((item) => {
          const active = item.href === activeHref;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`${itemBase} ${active ? itemActive : itemDefault}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
