import { TrendingUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="border-t border-subtle bg-navy-mid mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-blue" />
            <span className="font-bold text-foreground">
              Trade<span className="text-accent-blue">Mind</span> AI
            </span>
          </div>

          <div className="text-center">
            <p className="text-xs text-signal-yellow bg-signal-yellow px-4 py-2 rounded-lg border border-signal-yellow font-medium">
              ⚠️ Yeh sirf educational purpose ke liye hai. Financial advice nahi
              hai. / This is for educational purposes only. Not financial
              advice.
            </p>
          </div>

          <div className="text-xs text-secondary text-center">
            <p>
              © {year}. Built with ❤️ using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
