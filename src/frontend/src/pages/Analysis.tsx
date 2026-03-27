import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Lock, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "../backend.d";
import AuthModal from "../components/AuthModal";
import { SignalBadge } from "../components/SignalBadge";
import { ALL_STOCKS, formatINR, generateAnalysis } from "../data/mockStocks";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useUserRole } from "../hooks/useQueries";
import { useCreateCheckoutSession } from "../hooks/useQueries";
import {
  FREE_LIMIT,
  getTodayUsage,
  hasReachedLimit,
  incrementUsage,
} from "../utils/analysisUsage";

export default function Analysis() {
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReturnType<
    typeof generateAnalysis
  > | null>(null);
  const [usageCount, setUsageCount] = useState(getTodayUsage());
  const [authOpen, setAuthOpen] = useState(false);

  const { identity } = useInternetIdentity();
  const { data: role } = useUserRole();
  const isPremium = identity && role === UserRole.admin;
  const isLoggedIn = !!identity;
  const limitReached = hasReachedLimit(!!isPremium);
  const checkoutMutation = useCreateCheckoutSession();

  const stock = ALL_STOCKS.find((s) => s.symbol === selectedSymbol);

  const handleAnalyze = async () => {
    if (!selectedSymbol) {
      toast.error("Pehle ek stock select karo!");
      return;
    }
    if (!isLoggedIn) {
      setAuthOpen(true);
      return;
    }
    if (limitReached) {
      toast.error("Aaj ki limit khatam ho gayi! Premium upgrade karo.");
      return;
    }
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1500));
    const analysis = generateAnalysis(selectedSymbol);
    const newCount = incrementUsage();
    setUsageCount(newCount);
    setResult(analysis);
    setLoading(false);
    toast.success(`${selectedSymbol} ki analysis ready hai! 🎯`);
  };

  const handleUpgrade = async () => {
    try {
      const url = await checkoutMutation.mutateAsync();
      window.location.href = url;
    } catch {
      toast.error("Abhi upgrade available nahi hai. Baad mein try karo.");
    }
  };

  const remaining = isPremium ? "∞" : Math.max(0, FREE_LIMIT - usageCount);

  return (
    <main className="gradient-hero min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-extrabold text-foreground mb-2">
            🤖 AI Stock Analysis
          </h1>
          <p className="text-secondary mb-8">
            Koi bhi NSE/BSE stock select karo — AI simple Hindi+English mein
            explain karega
          </p>
        </motion.div>

        {/* Search + Analyze */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card-surface rounded-xl border border-subtle shadow-card p-6 mb-6"
          data-ocid="analysis.card"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Select onValueChange={setSelectedSymbol} value={selectedSymbol}>
              <SelectTrigger
                className="flex-1 bg-card-surface-2 border-subtle text-foreground"
                data-ocid="analysis.stock.select"
              >
                <SelectValue placeholder="Stock select karo (NSE/BSE)" />
              </SelectTrigger>
              <SelectContent className="bg-card-surface border-subtle max-h-64 overflow-y-auto">
                {ALL_STOCKS.map((s) => (
                  <SelectItem
                    key={s.symbol}
                    value={s.symbol}
                    className="text-foreground hover:bg-card-surface-2 focus:bg-card-surface-2"
                  >
                    <span className="font-semibold">{s.symbol}</span>
                    <span className="text-secondary ml-2 text-xs">
                      {s.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleAnalyze}
              disabled={loading || (limitReached && !isPremium)}
              className="bg-primary text-primary-foreground font-bold px-8 whitespace-nowrap"
              data-ocid="analysis.analyze.primary_button"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" /> Analysis Shuru Karo
                </>
              )}
            </Button>
          </div>

          {/* Stock preview */}
          {stock && (
            <div className="mt-4 flex items-center gap-4 p-3 bg-card-surface-2 rounded-lg">
              <div>
                <span className="font-bold text-foreground">
                  {stock.symbol}
                </span>
                <span className="text-secondary text-sm ml-2">
                  {stock.name}
                </span>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <span className="font-semibold text-foreground">
                  {formatINR(stock.price)}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    stock.changePercent >= 0
                      ? "text-signal-green"
                      : "text-signal-red"
                  }`}
                >
                  {stock.changePercent >= 0 ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          )}

          {/* Usage counter */}
          {isLoggedIn && (
            <div className="mt-3 flex items-center justify-between">
              <p
                className="text-xs text-secondary"
                data-ocid="analysis.usage.panel"
              >
                Aaj ke{" "}
                <span className="text-foreground font-semibold">
                  {remaining}/{isPremium ? "∞" : FREE_LIMIT}
                </span>{" "}
                analysis baaki hain
              </p>
              {!isPremium && (
                <span className="text-xs text-secondary">Free Plan</span>
              )}
            </div>
          )}
        </motion.div>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card-surface rounded-xl border border-subtle p-8 text-center mb-6"
              data-ocid="analysis.loading_state"
            >
              <Loader2 className="w-10 h-10 animate-spin text-accent-blue mx-auto mb-3" />
              <p className="text-secondary">
                AI analyze kar raha hai... thodi der mein result milega 🔍
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Limit Reached */}
        {limitReached && !isPremium && isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-signal-yellow border border-signal-yellow rounded-xl p-6 mb-6 text-center"
            data-ocid="analysis.limit.panel"
          >
            <Lock className="w-8 h-8 text-signal-yellow mx-auto mb-2" />
            <p className="font-bold text-signal-yellow mb-1">
              Aaj ki free limit khatam ho gayi!
            </p>
            <p className="text-xs text-secondary mb-4">
              Unlimited analysis ke liye Premium upgrade karo
            </p>
            <Button
              onClick={handleUpgrade}
              disabled={checkoutMutation.isPending}
              className="bg-primary text-primary-foreground font-bold"
              data-ocid="analysis.upgrade.primary_button"
            >
              {checkoutMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                "Premium Upgrade Karo — ₹999/mo"
              )}
            </Button>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-card-surface rounded-xl border border-subtle shadow-card overflow-hidden"
              data-ocid="analysis.result.card"
            >
              <div className="px-6 py-5 border-b border-subtle flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">
                  {selectedSymbol} — AI Analysis Result
                </h2>
                <SignalBadge value={result.signal} size="lg" />
              </div>

              <div className="p-6 space-y-5">
                {/* Signal highlight */}
                <div
                  className={`p-4 rounded-lg ${
                    result.signal === "Strong"
                      ? "bg-signal-green border border-signal-green"
                      : result.signal === "Weak"
                        ? "bg-signal-red border border-signal-red"
                        : result.signal === "Risky"
                          ? "bg-signal-red border border-signal-red"
                          : "bg-signal-yellow border border-signal-yellow"
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground mb-1">
                    📋 Reason / Kyu?
                  </p>
                  <p className="text-sm text-secondary leading-relaxed">
                    {result.reason}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-card-surface-2 rounded-lg p-3 text-center">
                    <p className="text-xs text-secondary mb-2">Trend</p>
                    <SignalBadge value={result.trend} />
                  </div>
                  <div className="bg-card-surface-2 rounded-lg p-3 text-center">
                    <p className="text-xs text-secondary mb-2">Risk Level</p>
                    <SignalBadge value={result.riskLevel} />
                  </div>
                  <div className="bg-card-surface-2 rounded-lg p-3 text-center">
                    <p className="text-xs text-secondary mb-2">Signal</p>
                    <SignalBadge value={result.signal} />
                  </div>
                </div>

                <div className="bg-card-surface-2 rounded-lg p-4">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    📅 Short-Term View (1-3 Din)
                  </p>
                  <p className="text-sm text-secondary">
                    {result.shortTermView}
                  </p>
                </div>

                <div className="bg-signal-yellow border border-signal-yellow rounded-lg p-4">
                  <p className="text-xs font-semibold text-signal-yellow mb-1">
                    💡 Suggestion (Educational Only)
                  </p>
                  <p className="text-xs text-secondary">{result.suggestion}</p>
                </div>

                <p className="text-xs text-secondary text-center border-t border-subtle pt-4">
                  ⚠️ Yeh sirf educational analysis hai. Koi bhi investment
                  decision apne financial advisor se milke karo. / This is
                  educational only, not financial advice.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  );
}
