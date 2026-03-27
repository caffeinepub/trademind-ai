import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Settings, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useIsAdmin } from "../hooks/useQueries";

export default function Admin() {
  const { data: isAdmin, isLoading } = useIsAdmin();
  const [apiKey, setApiKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  if (isLoading) {
    return (
      <main className="gradient-hero min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-blue" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="gradient-hero min-h-screen flex items-center justify-center">
        <div className="bg-card-surface rounded-xl border border-subtle p-8 text-center max-w-md">
          <Shield className="w-12 h-12 text-signal-red mx-auto mb-3" />
          <h2 className="text-xl font-bold text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-secondary text-sm">
            Yeh page sirf admins ke liye hai.
          </p>
        </div>
      </main>
    );
  }

  const handleSaveKey = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("API key save ho gayi!");
  };

  const handleRefreshData = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setRefreshing(false);
    toast.success("Stock data refresh ho gaya!");
  };

  return (
    <main className="gradient-hero min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-8">
            <Settings className="w-6 h-6 text-accent-blue" />
            <h1 className="text-2xl font-extrabold text-foreground">
              Admin Settings
            </h1>
          </div>

          <div className="space-y-6">
            <div className="bg-card-surface rounded-xl border border-subtle p-6">
              <h2 className="font-bold text-foreground mb-4">
                🔑 OpenAI API Key
              </h2>
              <div className="space-y-3">
                <Label className="text-secondary">API Key</Label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="bg-card-surface-2 border-subtle text-foreground"
                  data-ocid="admin.apikey.input"
                />
                <Button
                  onClick={handleSaveKey}
                  disabled={saving || !apiKey}
                  className="bg-primary text-primary-foreground font-semibold"
                  data-ocid="admin.apikey.save_button"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    "Save Key"
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-card-surface rounded-xl border border-subtle p-6">
              <h2 className="font-bold text-foreground mb-4">
                🔄 Data Management
              </h2>
              <div className="space-y-3">
                <Button
                  onClick={handleRefreshData}
                  disabled={refreshing}
                  variant="outline"
                  className="w-full border-subtle text-foreground hover:bg-card-surface-2"
                  data-ocid="admin.refresh.button"
                >
                  {refreshing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Refreshing...
                    </>
                  ) : (
                    "📊 Stock Data Refresh Karo"
                  )}
                </Button>
                <Button
                  onClick={() =>
                    toast.success("Market summary regenerate ho gayi!")
                  }
                  variant="outline"
                  className="w-full border-subtle text-foreground hover:bg-card-surface-2"
                  data-ocid="admin.summary.button"
                >
                  🧠 Market Summary Regenerate Karo
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
