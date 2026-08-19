import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Clock,
  Eye,
  History,
  ListTree,
  MessageSquare,
  PencilLine,
  Tag,
  UserRound,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { PixelField } from "@/components/PixelField";

export const Route = createFileRoute("/article/$slug")({
  head: ({ params }) => {
    const title = `Основание городов: Гайд — RepublicMC WIKI`;
    const description =
      "Полное руководство по основанию и развитию городов на сервере RepublicMC: заявка, границы, налоги и дипломатия.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "article:slug", content: params.slug },
      ],
    };
  },
  component: ArticlePage,
});

const SECTIONS = [
  { id: "intro", title: "Введение" },
  { id: "requirements", title: "Требования к основанию" },
  { id: "claim", title: "Заявка и границы" },
  { id: "economy", title: "Экономика и налоги" },
  { id: "diplomacy", title: "Дипломатия и войны" },
  { id: "faq", title: "Частые вопросы" },
];

const CATEGORIES = ["Города", "Гайды", "Экономика", "Политика"];

const CHANGES = [
  { date: "Сегодня, 18:20", author: "Gamer_Nomad", note: "Обновлён раздел о налогах" },
  { date: "Вчера, 09:41", author: "HistorianMC", note: "Добавлены скриншоты границ" },
  { date: "12 Октября", author: "EcoExpert", note: "Правки в разделе дипломатии" },
];

function ArticlePage() {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PixelField />
      <SiteHeader />

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Left column */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <nav className="surface-card p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide text-cyan uppercase">
              <ListTree className="size-4 shrink-0" /> Оглавление
            </h2>
            <ol className="space-y-1 text-sm">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`flex gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-secondary hover:text-foreground ${
                      active === s.id
                        ? "bg-secondary text-foreground shadow-[inset_2px_0_0_0_var(--magenta)]"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="text-magenta">{i + 1}.</span>
                    <span className="min-w-0">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section className="surface-card p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide text-magenta uppercase">
              <Tag className="size-4 shrink-0" /> Категории
            </h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-cyan hover:text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </section>

          <section className="surface-card p-4">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide text-cyan uppercase">
              <Clock className="size-4 shrink-0" /> Последние изменения
            </h2>
            <ul className="space-y-3">
              {CHANGES.map((c) => (
                <li key={c.date} className="border-l border-border pl-3">
                  <p className="text-xs text-muted-foreground">{c.date}</p>
                  <p className="text-sm text-foreground">{c.note}</p>
                  <p className="text-xs text-magenta">{c.author}</p>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Right column */}
        <article className="surface-card min-w-0 p-5 sm:p-8">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">Гайды</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">
            <span className="text-brand-gradient">Основание городов</span>: полный гайд
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 shrink-0" /> Изменено 19 августа 2026, 14:02
            </span>
            <span className="flex items-center gap-1.5">
              <UserRound className="size-3.5 shrink-0" /> Gamer_Nomad
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="size-3.5 shrink-0" /> 2 431 просмотр
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-y border-border py-4">
            <button className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm transition-shadow hover:glow-cyan">
              <PencilLine className="size-4 shrink-0 text-cyan" /> Редактировать
            </button>
            <button className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm transition-shadow hover:glow-cyan">
              <History className="size-4 shrink-0 text-blue" /> История
            </button>
            <button className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-sm transition-shadow hover:glow-magenta">
              <MessageSquare className="size-4 shrink-0 text-magenta" /> Обсуждение
            </button>
          </div>

          <div className="mt-8 space-y-10 text-sm leading-7 text-muted-foreground sm:text-base">
            <section id="intro" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Введение</h2>
              <p className="mt-3">
                Города — основа политической и экономической жизни RepublicMC. Каждый город
                занимает территорию, платит налоги в казну Республики и участвует в выборах в
                Парламент. Эта статья описывает весь путь от заявки до полноценного мегаполиса.
              </p>
              <figure className="mt-5 overflow-hidden rounded-lg border border-border">
                <div
                  className="flex h-48 items-center justify-center text-xs tracking-widest text-muted-foreground uppercase sm:h-64"
                  style={{ backgroundImage: "var(--gradient-brand)", opacity: 0.18 }}
                >
                  Изображение города
                </div>
                <figcaption className="bg-secondary px-4 py-2 text-xs text-muted-foreground">
                  Панорама Нового Света — крупнейшего города Первой Республики.
                </figcaption>
              </figure>
            </section>

            <section id="requirements" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                Требования к основанию
              </h2>
              <ul className="mt-3 space-y-2">
                {[
                  "Не менее 48 часов игрового времени на сервере",
                  "Стартовый капитал: 5 000 монет в казне будущего города",
                  "Минимум 3 жителя, подтвердивших участие",
                  "Расстояние не менее 300 блоков от границ соседнего города",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 size-1.5 shrink-0 bg-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="claim" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Заявка и границы</h2>
              <p className="mt-3">
                Заявка подаётся командой <code className="rounded bg-secondary px-1.5 py-0.5 text-cyan">/town create «Название»</code>.
                После подтверждения администрацией территория закрепляется чанками, которые можно
                расширять по мере роста населения.
              </p>
              <blockquote className="mt-5 border-l-2 border-magenta bg-secondary/60 px-4 py-3 text-foreground italic">
                «Границы города — это не только защита от гриферов, но и обязательство перед
                соседями: любое расширение согласуется с Земельным комитетом».
                <footer className="mt-2 text-xs text-muted-foreground not-italic">
                  — Конституция RepublicMC, ст. 14
                </footer>
              </blockquote>
            </section>

            <section id="economy" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Экономика и налоги</h2>
              <p className="mt-3">
                Каждый чанк облагается ежедневным налогом. Если казна пуста, город теряет чанки
                автоматически.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs tracking-wide text-cyan uppercase">
                      <th className="py-2 pr-4 font-semibold">Размер города</th>
                      <th className="py-2 pr-4 font-semibold">Чанки</th>
                      <th className="py-2 font-semibold">Налог / день</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Поселение", "1–16", "40 монет"],
                      ["Город", "17–64", "180 монет"],
                      ["Мегаполис", "65+", "500 монет"],
                    ].map((row) => (
                      <tr key={row[0]} className="border-b border-border/60">
                        <td className="py-2 pr-4 text-foreground">{row[0]}</td>
                        <td className="py-2 pr-4">{row[1]}</td>
                        <td className="py-2 text-magenta">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="diplomacy" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Дипломатия и войны</h2>
              <p className="mt-3">
                Города объединяются в коалиции, заключают торговые договоры и объявляют эмбарго.
                Война возможна только после официального объявления в Парламенте и суточного
                периода ожидания.
              </p>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Частые вопросы</h2>
              <dl className="mt-3 space-y-4">
                <div>
                  <dt className="font-semibold text-foreground">Можно ли переименовать город?</dt>
                  <dd>Да, один раз в 30 дней за 2 000 монет.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Что будет при удалении мэра?</dt>
                  <dd>Права переходят старейшему жителю с ролью помощника.</dd>
                </div>
              </dl>
            </section>
          </div>

          <section className="mt-10 border-t border-border pt-6">
            <h2 className="text-lg font-bold text-foreground">См. также</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {[
                { slug: "istoriya-pervoy-respubliki", title: "История создания Первой Республики" },
                { slug: "torgovye-koalicii", title: "Торговые коалиции и эмбарго" },
                { slug: "zemelnyy-nalog", title: "Поправки к земельному налогу" },
                { slug: "pravila", title: "Правила сервера" },
              ].map((l) => (
                <li key={l.slug}>
                  <Link
                    to="/article/$slug"
                    params={{ slug: l.slug }}
                    className="block rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-cyan hover:text-foreground"
                  >
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6">
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              Категории:
            </span>
            {CATEGORIES.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </section>
        </article>
      </main>
    </div>
  );
}