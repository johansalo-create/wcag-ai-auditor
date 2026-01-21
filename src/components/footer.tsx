export function Footer() {
  return (
    <footer className="border-t border-border py-6 mt-auto">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            Drivs av{" "}
            <a
              href="https://groq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            >
              Groq AI
              <span className="sr-only"> (öppnas i nytt fönster)</span>
            </a>
            {" "}& Llama 3
          </p>
          <p className="text-xs">
            AI-genererade förslag. Verifiera alltid mot{" "}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            >
              officiella WCAG-riktlinjer
              <span className="sr-only"> (öppnas i nytt fönster)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
