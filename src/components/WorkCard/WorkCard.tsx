import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useId } from "react";

export interface WorkCardProps {
  /** Обкладинка: імпортований файл з `src/assets`. Обрізається під `aspect-cover`. */
  cover: StaticImageData;
  /** Назва роботи. */
  title: string;
  /** Короткий опис: одне речення про роботу. */
  description: string;
  /** Адреса сторінки кейсу. */
  href: string;
}

/**
 * Картка роботи: обкладинка, назва, короткий опис. Уся картка є
 * одним посиланням; стани default, hover і focus.
 */
export function WorkCard({ cover, title, description, href }: WorkCardProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Link
      href={href}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={
        "group flex w-full flex-col rounded-card border border-line bg-surface " +
        "font-sans text-ink hover:border-accent " +
        "outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
      }
    >
      <div className="relative aspect-cover overflow-hidden rounded-card">
        {/* Обкладинка декоративна: зміст картки передають назва й опис. */}
        <Image
          src={cover}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 id={titleId} className="text-lead text-primary group-hover:underline">
          {title}
        </h3>
        <p id={descriptionId} className="text-caption text-ink-muted">
          {description}
        </p>
      </div>
    </Link>
  );
}
