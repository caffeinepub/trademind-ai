import { Shield, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  return (
    <main className="gradient-hero min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-foreground mb-4">
            <span className="text-accent-blue">TradeMind AI</span> ke baare mein
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            India ke naye traders ke liye ek simple aur powerful AI stock
            analysis platform
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            {
              icon: TrendingUp,
              title: "Smart Signals",
              desc: "AI analyze karta hai NSE/BSE stocks ko aur simple Buy/Sell/Hold signals deta hai — bilkul beginners ke liye",
            },
            {
              icon: Shield,
              title: "Safe & Educational",
              desc: "Hum sirf educational information dete hain. Koi bhi financial advice nahi. Aapka paisa aapki zimmedari.",
            },
            {
              icon: Zap,
              title: "Real-Time Updates",
              desc: "Roz subah market data update hota hai. Top gainers, losers, aur AI market summary milti hai.",
            },
            {
              icon: Users,
              title: "Beginners ke liye",
              desc: "Hindi + English mein simple language. Koi technical jargon nahi. Charts samajhne ki zarurat nahi.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card-surface rounded-xl border border-subtle p-6"
            >
              <item.icon className="w-8 h-8 text-accent-blue mb-3" />
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-signal-yellow border border-signal-yellow rounded-xl p-6 text-center">
          <p className="font-bold text-signal-yellow text-lg mb-2">
            ⚠️ Important Disclaimer
          </p>
          <p className="text-sm text-secondary">
            TradeMind AI sirf educational purpose ke liye hai. Yahan di gayi koi
            bhi information financial advice nahi hai. Stock market mein
            investment mein risk hota hai. Koi bhi investment decision lene se
            pehle apne SEBI-registered financial advisor se consult karo.
          </p>
          <p className="text-xs text-secondary mt-3">
            This platform is for educational purposes only. Not financial
            advice. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </main>
  );
}
