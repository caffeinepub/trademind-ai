export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  sector: string;
}

export interface AnalysisResult {
  signal: "Strong" | "Weak" | "Risky" | "Watchlist";
  trend: "Uptrend" | "Downtrend" | "Sideways";
  riskLevel: "Low" | "Medium" | "High";
  reason: string;
  shortTermView: string;
  suggestion: string;
}

export interface ChartAnalysisResult {
  trend: "Uptrend" | "Downtrend" | "Sideways";
  supportLevel: number;
  resistanceLevel: number;
  breakoutPossibility: "High" | "Medium" | "Low";
  riskLevel: "Low" | "Medium" | "High";
  explanation: string;
  suggestedAction: string;
}

export const ALL_STOCKS: StockData[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 2834,
    change: 45.2,
    changePercent: 1.62,
    volume: "12.4M",
    sector: "Energy",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3420,
    change: -28.5,
    changePercent: -0.83,
    volume: "3.2M",
    sector: "IT",
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    price: 1678,
    change: 22.3,
    changePercent: 1.35,
    volume: "8.1M",
    sector: "IT",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    price: 1542,
    change: -15.7,
    changePercent: -1.01,
    volume: "6.7M",
    sector: "Banking",
  },
  {
    symbol: "WIPRO",
    name: "Wipro Limited",
    price: 478,
    change: 8.4,
    changePercent: 1.79,
    volume: "5.3M",
    sector: "IT",
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    price: 1089,
    change: 18.6,
    changePercent: 1.74,
    volume: "9.2M",
    sector: "Banking",
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    price: 756,
    change: -9.2,
    changePercent: -1.21,
    volume: "11.8M",
    sector: "Banking",
  },
  {
    symbol: "BAJFINANCE",
    name: "Bajaj Finance",
    price: 7234,
    change: 134.5,
    changePercent: 1.89,
    volume: "1.8M",
    sector: "Finance",
  },
  {
    symbol: "KOTAKBANK",
    name: "Kotak Mahindra Bank",
    price: 1823,
    change: -22.4,
    changePercent: -1.22,
    volume: "2.9M",
    sector: "Banking",
  },
  {
    symbol: "AXISBANK",
    name: "Axis Bank",
    price: 1134,
    change: 16.8,
    changePercent: 1.5,
    volume: "7.4M",
    sector: "Banking",
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro",
    price: 3456,
    change: 67.8,
    changePercent: 2.0,
    volume: "2.1M",
    sector: "Infrastructure",
  },
  {
    symbol: "NESTLEIND",
    name: "Nestle India",
    price: 2278,
    change: -18.9,
    changePercent: -0.82,
    volume: "0.8M",
    sector: "FMCG",
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki",
    price: 12450,
    change: 234.6,
    changePercent: 1.92,
    volume: "0.6M",
    sector: "Auto",
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors",
    price: 834,
    change: -14.2,
    changePercent: -1.67,
    volume: "14.2M",
    sector: "Auto",
  },
  {
    symbol: "TATASTEEL",
    name: "Tata Steel",
    price: 142,
    change: 4.8,
    changePercent: 3.5,
    volume: "22.6M",
    sector: "Metal",
  },
  {
    symbol: "ONGC",
    name: "Oil & Natural Gas Corp",
    price: 278,
    change: -3.4,
    changePercent: -1.21,
    volume: "13.4M",
    sector: "Energy",
  },
  {
    symbol: "POWERGRID",
    name: "Power Grid Corporation",
    price: 312,
    change: 5.6,
    changePercent: 1.83,
    volume: "8.9M",
    sector: "Power",
  },
  {
    symbol: "NTPC",
    name: "NTPC Limited",
    price: 356,
    change: 7.2,
    changePercent: 2.06,
    volume: "10.2M",
    sector: "Power",
  },
  {
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical",
    price: 1678,
    change: 28.4,
    changePercent: 1.72,
    volume: "3.6M",
    sector: "Pharma",
  },
  {
    symbol: "DRREDDY",
    name: "Dr. Reddy's Laboratories",
    price: 5890,
    change: -45.2,
    changePercent: -0.76,
    volume: "0.9M",
    sector: "Pharma",
  },
  {
    symbol: "DIVISLAB",
    name: "Divi's Laboratories",
    price: 4234,
    change: 89.6,
    changePercent: 2.16,
    volume: "0.7M",
    sector: "Pharma",
  },
  {
    symbol: "CIPLA",
    name: "Cipla Limited",
    price: 1423,
    change: -12.8,
    changePercent: -0.89,
    volume: "2.4M",
    sector: "Pharma",
  },
  {
    symbol: "EICHERMOT",
    name: "Eicher Motors",
    price: 4567,
    change: 78.3,
    changePercent: 1.74,
    volume: "0.5M",
    sector: "Auto",
  },
  {
    symbol: "HEROMOTOCO",
    name: "Hero MotoCorp",
    price: 4890,
    change: -56.7,
    changePercent: -1.15,
    volume: "0.8M",
    sector: "Auto",
  },
  {
    symbol: "TITAN",
    name: "Titan Company",
    price: 3456,
    change: 56.8,
    changePercent: 1.67,
    volume: "1.4M",
    sector: "Consumer",
  },
  {
    symbol: "ULTRACEMCO",
    name: "UltraTech Cement",
    price: 10234,
    change: 178.4,
    changePercent: 1.77,
    volume: "0.3M",
    sector: "Cement",
  },
  {
    symbol: "BAJAJFINSV",
    name: "Bajaj Finserv",
    price: 1678,
    change: 23.4,
    changePercent: 1.41,
    volume: "2.8M",
    sector: "Finance",
  },
  {
    symbol: "BRITANNIA",
    name: "Britannia Industries",
    price: 5234,
    change: -34.5,
    changePercent: -0.66,
    volume: "0.4M",
    sector: "FMCG",
  },
  {
    symbol: "HINDALCO",
    name: "Hindalco Industries",
    price: 678,
    change: 12.4,
    changePercent: 1.86,
    volume: "7.2M",
    sector: "Metal",
  },
  {
    symbol: "MM",
    name: "Mahindra & Mahindra",
    price: 2134,
    change: 34.6,
    changePercent: 1.65,
    volume: "3.4M",
    sector: "Auto",
  },
];

// Seeded random for consistent analysis per stock
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return () => {
    hash = (hash << 5) - hash + 1;
    hash |= 0;
    return Math.abs(hash) / 2147483647;
  };
}

const REASONS: Record<string, string[]> = {
  Strong: [
    "Stock ne strong support pakad liya hai. Volume bhi badh raha hai — good sign! Investors buy kar rahe hain.",
    "Price ek important resistance level tod ke upar gaya hai. Momentum strong hai, trend bullish dikh raha hai.",
    "Institutional buying detect hui hai. FII/DII data positive hai, stock uptrend mein hai.",
  ],
  Weak: [
    "Stock apne key support level ke neeche gaya hai. Selling pressure badh rahi hai — risky time hai.",
    "Volume ke saath price neeche ja raha hai — bearish signal. Short term mein aur gira sakta hai.",
    "Market mein overall weakness hai aur yeh stock bhi ussi direction mein chal raha hai. Caution zaroori hai.",
  ],
  Risky: [
    "Stock bohot volatile hai. Ek direction mein clear trend nahi hai — high risk, high reward situation.",
    "News-driven movement ho raha hai. Bina confirmation ke entry lena risky ho sakta hai.",
    "Earnings announcement aane wala hai jis se bada movement ho sakta hai. Risk manage karo.",
  ],
  Watchlist: [
    "Stock consolidation mein hai. Breakout hone ka wait karo — abhi entry ki sahi timing nahi hai.",
    "Mixed signals hain. Technically neutral zone mein hai, clear direction ke liye thoda wait karo.",
    "Stock interesting level par hai. Thodi aur confirmation chahiye phir strong signal milega.",
  ],
};

const SHORT_TERM_VIEWS: string[] = [
  "Agli 1-3 din mein ₹ mein modest movement expected hai. Stop loss zaroor lagao.",
  "Short term mein stock flat reh sakta hai ya slight upward movement ho sakta hai.",
  "1-2 din risky lag rahe hain. Weekly candle close dekhke decide karo.",
  "Intraday traders ke liye achha opportunity ho sakta hai, par swing traders thoda wait karen.",
];

const SUGGESTIONS: string[] = [
  "⚠️ Yeh sirf educational analysis hai. Koi bhi investment decision apne financial advisor se milke karo.",
  "📚 Yeh information sirf learning purpose ke liye hai. Apna research khud karo before investing.",
  "🎓 Remember: Stock market mein risk hota hai. Sirf woh paisa lagao jo aap afford kar sako lose karne ke liye.",
];

export function generateAnalysis(symbol: string): AnalysisResult {
  const rand = seededRandom(symbol + new Date().toDateString());
  const signals: AnalysisResult["signal"][] = [
    "Strong",
    "Weak",
    "Risky",
    "Watchlist",
  ];
  const trends: AnalysisResult["trend"][] = [
    "Uptrend",
    "Downtrend",
    "Sideways",
  ];
  const risks: AnalysisResult["riskLevel"][] = ["Low", "Medium", "High"];

  const signalIdx = Math.floor(rand() * 4);
  const signal = signals[signalIdx];
  const trend = trends[Math.floor(rand() * 3)];
  const riskLevel = risks[Math.floor(rand() * 3)];
  const reasons = REASONS[signal];
  const reason = reasons[Math.floor(rand() * reasons.length)];
  const shortTermView =
    SHORT_TERM_VIEWS[Math.floor(rand() * SHORT_TERM_VIEWS.length)];
  const suggestion = SUGGESTIONS[Math.floor(rand() * SUGGESTIONS.length)];

  return { signal, trend, riskLevel, reason, shortTermView, suggestion };
}

export function generateChartAnalysis(basePrice = 2500): ChartAnalysisResult {
  const rand = seededRandom(String(basePrice) + new Date().toDateString());
  const trends: ChartAnalysisResult["trend"][] = [
    "Uptrend",
    "Downtrend",
    "Sideways",
  ];
  const breakouts: ChartAnalysisResult["breakoutPossibility"][] = [
    "High",
    "Medium",
    "Low",
  ];
  const risks: ChartAnalysisResult["riskLevel"][] = ["Low", "Medium", "High"];

  const support = Math.round(basePrice * (0.92 + rand() * 0.04));
  const resistance = Math.round(basePrice * (1.04 + rand() * 0.04));

  const explanations = [
    `Chart mein ek clear ${trends[Math.floor(rand() * 3)]} pattern dikh raha hai. Support level ₹${support.toLocaleString("en-IN")} ke aas paas strong lag raha hai. Resistance ₹${resistance.toLocaleString("en-IN")} par hai. Agar yeh level toot gaya toh bada move ho sakta hai.`,
    "Candlestick pattern se pata chalta hai ki buyers aur sellers ke beech tug-of-war chal raha hai. Volume analysis se lagta hai ki ek side ka momentum banne wala hai.",
    "Chart mein triangle formation bana raha hai 2014 yeh consolidation phase hai. Breakout hone par momentum bahut strong ho sakta hai. Wait for confirmation.",
  ];

  const actions = [
    "Agar breakout confirm ho toh position le sakte ho, par tight stop loss zaroor rakho. Yeh sirf educational information hai.",
    "Abhi wait karo aur ek clear signal ka intezaar karo. Jaldi karne ki zarurat nahi. Yeh financial advice nahi hai.",
    "Risk management sabse pehle — apna capital protect karo. Sirf 1-2% capital per trade mein risk lo. Educational purpose only.",
  ];

  const idx = Math.floor(rand() * 3);
  return {
    trend: trends[Math.floor(rand() * 3)],
    supportLevel: support,
    resistanceLevel: resistance,
    breakoutPossibility: breakouts[Math.floor(rand() * 3)],
    riskLevel: risks[Math.floor(rand() * 3)],
    explanation: explanations[idx],
    suggestedAction: actions[idx],
  };
}

export function getTopGainers(): StockData[] {
  return ALL_STOCKS.filter((s) => s.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5);
}

export function getTopLosers(): StockData[] {
  return ALL_STOCKS.filter((s) => s.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5);
}

export function refreshStocks(stocks: StockData[]): StockData[] {
  return stocks.map((s) => {
    const delta = (Math.random() - 0.5) * 20;
    const newPrice = Math.max(10, s.price + delta);
    const newChange = s.change + (Math.random() - 0.5) * 5;
    const newChangePercent = (newChange / newPrice) * 100;
    return {
      ...s,
      price: Math.round(newPrice * 100) / 100,
      change: Math.round(newChange * 100) / 100,
      changePercent: Math.round(newChangePercent * 100) / 100,
    };
  });
}

export const MARKET_SUMMARY =
  "Aaj NSE/BSE mixed sentiment ke saath khula. IT sector mein buying interest dikh rahi hai, jabki banking stocks thodi pressure mein hain. FII ne light buying ki hai. Overall market cautiously bullish hai — bade moves ke liye koi badi trigger abhi nahi hai. Intraday traders ke liye selective stocks mein opportunity ho sakti hai. Remember: Market mein hamesha apna risk manage karo! D83dDcca";

export const BEST_INTRADAY = {
  symbol: "TATASTEEL",
  name: "Tata Steel",
  price: 142,
  reason:
    "High volume ke saath strong breakout pattern ban raha hai. Metal sector mein buying interest badh rahi hai. Support ₹138 par, resistance ₹148 par. Risk-reward ratio accha lag raha hai.",
  riskLevel: "Medium" as const,
};

export const AVOID_TODAY = [
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    reason: "High selling pressure, key support tod diya",
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors",
    reason: "Weak trend, volume ke saath decline",
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    reason: "Consolidation phase, direction unclear",
  },
];

export const AI_SIGNALS = [
  {
    symbol: "RELIANCE",
    signal: "Strong" as const,
    desc: "Strong momentum, breakout imminent",
  },
  {
    symbol: "BAJFINANCE",
    signal: "Watchlist" as const,
    desc: "Wait for better entry point",
  },
  {
    symbol: "TATASTEEL",
    signal: "Weak" as const,
    desc: "Selling pressure increasing",
  },
];

export function formatINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
