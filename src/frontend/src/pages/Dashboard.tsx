import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SignalBadge } from "../components/SignalBadge";
import {
  AI_SIGNALS,
  AVOID_TODAY,
  BEST_INTRADAY,
  MARKET_SUMMARY,
  type StockData,
  formatINR,
  getTopGainers,
  getTopLosers,
  refreshStocks,
} from "../data/mockStocks";

export default function Dashboard() {
  const [gainers, setGainers] = useState<StockData[]>(getTopGainers());
  const [losers, setLosers] = useState<StockData[]>(getTopLosers());
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 800));
    setGainers((prev) => refreshStocks(prev));
    setLosers((prev) => refreshStocks(prev));
    setRefreshing(false);
    toast.success("Market data refresh ho gaya! 📊");
  };

  return (
    <main className="gradient-hero min-h-screen">
      {/* Hero */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center"
        data-ocid="dashboard.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-foreground mb-4">
            Naye Traders ke liye India's
            <br />
            <span className="text-accent-blue">Smartest AI App:</span> TradeMind
            AI
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto mb-8">
            Stock Analysis & Signals simple banaye,{" "}
            <span className="text-foreground font-medium">Hindi + English</span>{" "}
            dono mein! 🇮🇳
          </p>
          <Link to="/analysis">
            <Button
              size="lg"
              className="bg-white text-gray-900 font-bold hover:bg-gray-100 px-8 py-4 text-base rounded-full shadow-glow"
              data-ocid="dashboard.explore.primary_button"
            >
              <Zap className="w-5 h-5 mr-2" />
              Markets Explore Karo
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          {/* Left: Market Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="bg-card-surface rounded-xl border border-subtle shadow-card overflow-hidden"
              data-ocid="market.card"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-subtle">
                <h2 className="text-base font-bold text-foreground">
                  📈 Aaj Ka Market: NSE/BSE
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  data-ocid="market.refresh.button"
                  className="text-secondary hover:text-foreground text-xs gap-1"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>

              {/* Gainers */}
              <div className="px-5 pt-4 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-signal-green" />
                  <span className="text-xs font-semibold text-signal-green">
                    Top Gainers (NSE)
                  </span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-secondary text-xs py-2 h-auto">
                        Symbol
                      </TableHead>
                      <TableHead className="text-secondary text-xs py-2 h-auto text-right">
                        Price
                      </TableHead>
                      <TableHead className="text-secondary text-xs py-2 h-auto text-right">
                        Change
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gainers.map((s, i) => (
                      <TableRow
                        key={s.symbol}
                        className="border-border hover:bg-card-surface-2"
                        data-ocid={`gainers.item.${i + 1}`}
                      >
                        <TableCell className="py-2">
                          <div>
                            <span className="text-xs font-semibold text-foreground">
                              {s.symbol}
                            </span>
                            <div className="text-xs text-secondary hidden sm:block truncate max-w-[120px]">
                              {s.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className="text-xs font-medium text-foreground">
                            {formatINR(s.price)}
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className="text-xs font-semibold text-signal-green">
                            +{s.changePercent.toFixed(2)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Losers */}
              <div className="px-5 pt-2 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-signal-red" />
                  <span className="text-xs font-semibold text-signal-red">
                    Top Losers (NSE)
                  </span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-secondary text-xs py-2 h-auto">
                        Symbol
                      </TableHead>
                      <TableHead className="text-secondary text-xs py-2 h-auto text-right">
                        Price
                      </TableHead>
                      <TableHead className="text-secondary text-xs py-2 h-auto text-right">
                        Change
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {losers.map((s, i) => (
                      <TableRow
                        key={s.symbol}
                        className="border-border hover:bg-card-surface-2"
                        data-ocid={`losers.item.${i + 1}`}
                      >
                        <TableCell className="py-2">
                          <div>
                            <span className="text-xs font-semibold text-foreground">
                              {s.symbol}
                            </span>
                            <div className="text-xs text-secondary hidden sm:block truncate max-w-[120px]">
                              {s.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className="text-xs font-medium text-foreground">
                            {formatINR(s.price)}
                          </span>
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <span className="text-xs font-semibold text-signal-red">
                            {s.changePercent.toFixed(2)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </motion.div>

          {/* Right: AI Signals + Chart Upload */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div
                className="bg-card-surface rounded-xl border border-subtle shadow-card"
                data-ocid="ai_signals.card"
              >
                <div className="px-5 py-4 border-b border-subtle">
                  <h2 className="text-base font-bold text-foreground">
                    🤖 AI Stock Signals
                  </h2>
                </div>
                <div className="p-4 space-y-2">
                  {AI_SIGNALS.map((sig, i) => (
                    <div
                      key={sig.symbol}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        sig.signal === "Strong"
                          ? "bg-signal-green border border-signal-green"
                          : sig.signal === "Weak"
                            ? "bg-signal-red border border-signal-red"
                            : "bg-signal-yellow border border-signal-yellow"
                      }`}
                      data-ocid={`ai_signals.item.${i + 1}`}
                    >
                      <div>
                        <span
                          className={`text-sm font-bold ${
                            sig.signal === "Strong"
                              ? "text-signal-green"
                              : sig.signal === "Weak"
                                ? "text-signal-red"
                                : "text-signal-yellow"
                          }`}
                        >
                          {sig.symbol}
                        </span>
                        <p className="text-xs text-secondary">{sig.desc}</p>
                      </div>
                      <SignalBadge value={sig.signal} />
                    </div>
                  ))}
                  <Link to="/analysis">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-accent-blue hover:text-accent-blue/80 mt-1 text-xs"
                      data-ocid="ai_signals.more.button"
                    >
                      Aur analysis dekhein →
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="bg-card-surface rounded-xl border border-subtle shadow-card"
                data-ocid="chart_upload.card"
              >
                <div className="px-5 py-4 border-b border-subtle">
                  <h2 className="text-base font-bold text-foreground">
                    📊 AI Chart Analysis
                  </h2>
                </div>
                <div className="p-5 text-center">
                  <div className="border-2 border-dashed border-subtle rounded-lg p-6 bg-card-surface-2">
                    <Upload className="w-10 h-10 text-secondary mx-auto mb-3" />
                    <p className="text-sm text-secondary mb-3">
                      Apna stock chart upload karo, AI analyze karega!
                    </p>
                    <Link to="/chart">
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground font-semibold"
                        data-ocid="chart_upload.open_modal_button"
                      >
                        Chart Upload Karo
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Intraday */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6"
        data-ocid="intraday.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-card-surface rounded-xl border border-signal-green/30 shadow-card overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-signal-green/20 flex items-center gap-2">
            <Zap className="w-5 h-5 text-signal-green" />
            <h2 className="text-base font-bold text-foreground">
              ⚡ Best Intraday Opportunity — Aaj Ka
            </h2>
          </div>
          <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl font-extrabold text-foreground">
                  {BEST_INTRADAY.symbol}
                </span>
                <span className="text-sm text-secondary">
                  {BEST_INTRADAY.name}
                </span>
                <SignalBadge value="Strong" />
              </div>
              <p className="text-sm text-secondary max-w-lg">
                {BEST_INTRADAY.reason}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-bold text-foreground">
                {formatINR(BEST_INTRADAY.price)}
              </div>
              <div className="text-xs text-secondary">
                Risk:{" "}
                <span className="text-signal-yellow">
                  {BEST_INTRADAY.riskLevel}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Avoid Today */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6"
        data-ocid="avoid.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-signal-red" />🚫 Aaj Avoid
            Karo
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {AVOID_TODAY.map((s, i) => (
              <div
                key={s.symbol}
                className="bg-signal-red border border-signal-red rounded-xl p-4"
                data-ocid={`avoid.item.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-signal-red">{s.symbol}</span>
                  <SignalBadge value="Weak" />
                </div>
                <p className="text-xs text-secondary">{s.reason}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Market Summary */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
        data-ocid="summary.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-card-surface rounded-xl border border-subtle shadow-card"
        >
          <div className="px-5 py-4 border-b border-subtle flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent-blue" />
            <h2 className="text-base font-bold text-foreground">
              🧠 Aaj Ka Market Summary — AI Generated
            </h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-secondary leading-relaxed">
              {MARKET_SUMMARY}
            </p>
            <p className="text-xs text-signal-yellow mt-3 border-t border-subtle pt-3">
              ⚠️ Yeh AI-generated summary hai, financial advice nahi. / This is
              AI-generated, not financial advice.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
