import { Badge } from "@/components/ui/badge";

type Signal = "Strong" | "Weak" | "Risky" | "Watchlist";
type Trend = "Uptrend" | "Downtrend" | "Sideways";
type Risk = "Low" | "Medium" | "High";
type Breakout = "High" | "Medium" | "Low";

type BadgeValue = Signal | Trend | Risk | Breakout;

function getBadgeStyle(value: BadgeValue): string {
  switch (value) {
    case "Strong":
    case "Uptrend":
    case "Low":
      return "signal-green border border-signal-green text-signal-green font-semibold";
    case "Weak":
    case "Downtrend":
    case "High":
      return "signal-red border border-signal-red text-signal-red font-semibold";
    case "Risky":
      return "signal-red border border-signal-red text-signal-red font-semibold";
    case "Watchlist":
    case "Sideways":
    case "Medium":
      return "signal-yellow border border-signal-yellow text-signal-yellow font-semibold";
    default:
      return "bg-muted text-foreground";
  }
}

export function SignalBadge({
  value,
  size = "sm",
}: { value: BadgeValue; size?: "sm" | "lg" }) {
  return (
    <Badge
      className={`${getBadgeStyle(value)} ${
        size === "lg" ? "text-base px-4 py-1.5" : "text-xs px-2 py-0.5"
      }`}
      variant="outline"
    >
      {value}
    </Badge>
  );
}
