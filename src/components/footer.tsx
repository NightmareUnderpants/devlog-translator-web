export default function Footer() {
  return (
    <footer className="mt-8 w-full rounded-lg bg-black/70 p-4 text-sm text-gray-300 shadow-md backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        <p>
          Devlog Translator помогает быстро переводить дневники разработки и
          следить за прогрессом проектов команды.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href="https://github.com/NightmareUnderpants/devlog-translator-web"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-white transition-colors hover:text-gray-300"
          >
            GitHub
          </a>
          <a
            href="https://t.me/nightmareunderpantsarts"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-white transition-colors hover:text-gray-300"
          >
            TG Channel
          </a>
        </div>
        <p>Команда разработки: UnderAlyx, Aleshka228PRO и papaChill.</p>
        <p className="text-xs text-gray-500">
          © 2026 Nightmare Underpants. Made for game devlogs, translations, and
          small production notes.
        </p>
      </div>
    </footer>
  );
}
