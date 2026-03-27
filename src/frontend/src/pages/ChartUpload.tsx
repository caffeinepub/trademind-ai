import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, TrendingUp, Upload } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { SignalBadge } from "../components/SignalBadge";
import { generateChartAnalysis } from "../data/mockStocks";

const EXAMPLE_PATTERNS = [
  {
    name: "Bullish Engulfing",
    emoji: "🟢",
    desc: "Ek bearish candle ke baad ek badi bullish candle aati hai — reversal ka strong signal. Buyers ne sellers ko overpower kar diya.",
    signal: "Strong" as const,
  },
  {
    name: "Triangle Breakout",
    emoji: "📐",
    desc: "Price ek triangle shape mein consolidate hoti hai. Jab triangle toot ta hai, bohot bada move aata hai — upside ya downside dono possible.",
    signal: "Watchlist" as const,
  },
  {
    name: "Double Top",
    emoji: "🔴",
    desc: "Price do baar ek hi resistance level par aake girti hai — yeh bearish reversal ka classic pattern hai. Sell signal consider kar sakte ho.",
    signal: "Weak" as const,
  },
];

export default function ChartUpload() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReturnType<
    typeof generateChartAnalysis
  > | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Sirf image files allowed hain!");
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setResult(null);
    toast.success("Chart upload ho gaya! Ab analyze karo. 📊");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleAnalyze = async () => {
    if (!imageFile) {
      toast.error("Pehle chart upload karo!");
      return;
    }
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    const analysis = generateChartAnalysis(Math.random() * 3000 + 500);
    setResult(analysis);
    setLoading(false);
    toast.success("Chart analysis complete! 🎯");
  };

  return (
    <main className="gradient-hero min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-extrabold text-foreground mb-2">
            📊 AI Chart Analysis
          </h1>
          <p className="text-secondary mb-8">
            Apna stock chart upload karo — AI pattern detect karega aur simple
            language mein samjhayega
          </p>
        </motion.div>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card-surface rounded-xl border border-subtle shadow-card p-6 mb-6"
        >
          <label
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            htmlFor="chart-upload-input"
            className={`block border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
              dragging
                ? "border-accent-blue bg-accent/20"
                : imageUrl
                  ? "border-signal-green/50 bg-signal-green"
                  : "border-subtle hover:border-primary/50 bg-card-surface-2"
            }`}
            data-ocid="chart.dropzone"
          >
            <input
              ref={inputRef}
              id="chart-upload-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
              data-ocid="chart.upload_button"
            />

            {imageUrl ? (
              <div className="space-y-3">
                <img
                  src={imageUrl}
                  alt="Uploaded chart"
                  className="max-h-64 mx-auto rounded-lg object-contain border border-signal-green/30"
                />
                <p className="text-xs text-signal-green font-medium">
                  ✅ {imageFile?.name}
                </p>
                <p className="text-xs text-secondary">
                  Chart yahan hai — ab analyze karo ya naya upload karo
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {dragging ? (
                  <ImageIcon className="w-14 h-14 text-accent-blue mx-auto" />
                ) : (
                  <Upload className="w-14 h-14 text-secondary mx-auto" />
                )}
                <div>
                  <p className="text-base font-semibold text-foreground">
                    Apna chart yahan drop karo ya select karo
                  </p>
                  <p className="text-sm text-secondary mt-1">
                    PNG, JPG, WEBP supported · Max 10MB
                  </p>
                </div>
                <span className="inline-block border border-subtle text-secondary hover:text-foreground rounded px-3 py-1 text-sm">
                  File Choose Karo
                </span>
              </div>
            )}
          </label>

          <div className="mt-4 flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={!imageFile || loading}
              className="bg-primary text-primary-foreground font-bold px-10"
              data-ocid="chart.analyze.primary_button"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" /> Chart Analyze Karo
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card-surface rounded-xl border border-subtle p-8 text-center mb-6"
              data-ocid="chart.loading_state"
            >
              <Loader2 className="w-10 h-10 animate-spin text-accent-blue mx-auto mb-3" />
              <p className="text-secondary">
                AI chart patterns analyze kar raha hai... 🔍
              </p>
              <p className="text-xs text-secondary mt-1">
                Support, resistance, trend detect ho raha hai...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-card-surface rounded-xl border border-subtle shadow-card overflow-hidden mb-8"
              data-ocid="chart.result.card"
            >
              <div className="px-6 py-5 border-b border-subtle">
                <h2 className="text-lg font-bold text-foreground">
                  📈 Chart Analysis Result
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-card-surface-2 rounded-lg p-3 text-center">
                    <p className="text-xs text-secondary mb-2">Trend</p>
                    <SignalBadge value={result.trend} />
                  </div>
                  <div className="bg-card-surface-2 rounded-lg p-3 text-center">
                    <p className="text-xs text-secondary mb-2">Breakout</p>
                    <SignalBadge value={result.breakoutPossibility} />
                  </div>
                  <div className="bg-card-surface-2 rounded-lg p-3 text-center">
                    <p className="text-xs text-secondary mb-2">Risk Level</p>
                    <SignalBadge value={result.riskLevel} />
                  </div>
                  <div className="bg-card-surface-2 rounded-lg p-3 text-center">
                    <p className="text-xs text-secondary mb-2">Pattern</p>
                    <span className="text-xs font-semibold text-accent-blue">
                      Detected
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-card-surface-2 rounded-lg p-4">
                    <p className="text-xs font-semibold text-signal-green mb-1">
                      🟢 Support Level
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      ₹{result.supportLevel.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-secondary mt-1">
                      Yahan price bounce karne ka chance hai
                    </p>
                  </div>
                  <div className="bg-card-surface-2 rounded-lg p-4">
                    <p className="text-xs font-semibold text-signal-red mb-1">
                      🔴 Resistance Level
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      ₹{result.resistanceLevel.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-secondary mt-1">
                      Yahan price rukne ka chance hai
                    </p>
                  </div>
                </div>

                <div className="bg-card-surface-2 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    🧠 AI Explanation
                  </p>
                  <p className="text-sm text-secondary leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                <div className="bg-signal-yellow border border-signal-yellow rounded-lg p-4">
                  <p className="text-xs font-semibold text-signal-yellow mb-1">
                    💡 Suggested Action (Educational)
                  </p>
                  <p className="text-xs text-secondary">
                    {result.suggestedAction}
                  </p>
                </div>

                <p className="text-xs text-secondary text-center border-t border-subtle pt-4">
                  ⚠️ Yeh AI-based chart analysis hai — financial advice nahi hai.
                  / This is AI-based, not financial advice.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Example Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-foreground mb-4">
            📚 Common Chart Patterns Seekho
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {EXAMPLE_PATTERNS.map((p, i) => (
              <div
                key={p.name}
                className="bg-card-surface rounded-xl border border-subtle p-5"
                data-ocid={`patterns.item.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{p.emoji}</span>
                  <SignalBadge value={p.signal} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{p.name}</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
