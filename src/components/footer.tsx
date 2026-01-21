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
              className="font-medium text-foreground hover:underline"
            >
              Groq AI
            </a>
            {" "}& Llama 3
          </p>
          <p className="text-xs">
            AI-genererade förslag. Verifiera alltid mot{" "}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              officiella WCAG-riktlinjer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
