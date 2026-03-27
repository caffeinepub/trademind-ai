# TradeMind AI

## Current State
New project. Empty Motoko backend and no frontend pages.

## Requested Changes (Diff)

### Add
- Dashboard page: Top Gainers and Top Losers tables with simulated NSE/BSE Indian stock data (real Yahoo Finance API via HTTP outcalls when possible, otherwise simulated data refreshed daily)
- AI Stock Analysis: user selects a stock symbol, backend fetches stock data and calls OpenAI GPT-4o via HTTP outcalls. Returns Signal (Strong/Weak/Risky/Watchlist), Reason in Hinglish, Trend, Risk Level, Suggestion
- Chart Image Upload: user uploads chart image, stored via blob-storage, backend sends image to OpenAI vision API via HTTP outcalls. Returns trend detection, support/resistance, breakout possibility, risk level, suggested action
- User authentication (login/signup) with role-based access: free users limited to 5 AI analyses/day, premium users unlimited
- Stripe payment integration for premium upgrade
- Extra Smart Features: "Best Intraday Opportunity" (AI-generated), "Avoid Today" stocks list, AI-generated daily market summary
- Legal disclaimer: "This is for educational purposes only. Not financial advice."
- Manual refresh button for stock data
- Hinglish UI (Hindi + English mix)

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan

### Backend (Motoko)
- User profile store: userId -> { role: #free | #premium, analysisCountToday: Nat, lastResetDate: Text }
- Stock data store: cached top gainers/losers (simulated + refreshable), lastUpdated timestamp
- Analysis history store: userId -> [AnalysisRecord]
- HTTP outcall functions:
  - fetchStockData(symbol: Text): calls Yahoo Finance or returns simulated data
  - analyzeStock(symbol: Text, apiKey: Text): calls OpenAI GPT-4o API, returns structured analysis
  - analyzeChartImage(imageBlob: Blob, apiKey: Text): calls OpenAI vision API with base64 image
  - generateDailySummary(): AI-generated market summary
- Rate limiting: check analysisCountToday before allowing AI calls for free users
- Admin endpoint to manually refresh stock data
- OpenAI API key stored in backend config (set by admin)

### Frontend (React)
- Pages: Dashboard, AI Analysis, Chart Upload, Settings/Profile, Login/Signup
- Dashboard: hero section with Hinglish tagline, Top Gainers/Losers tables, Best Intraday section, Avoid Today list, Daily Market Summary card, manual refresh button
- AI Analysis: stock search/select dropdown (NSE/BSE stocks), analysis trigger button, results card with Signal badge (green/red/yellow), Reason text, Trend, Risk Level, Suggestion
- Chart Upload: drag-and-drop image upload zone, analysis results panel with pattern detection output
- Auth: login/signup modal or page, usage counter for free users
- Premium: upgrade button linking to Stripe checkout
- Color system: green=#22C55E (Strong/Buy), red=#EF4444 (Weak/Sell), yellow=#FBBF24 (Watchlist/Hold)
- Dark navy theme matching design preview
- Footer with disclaimer
- Mobile responsive
