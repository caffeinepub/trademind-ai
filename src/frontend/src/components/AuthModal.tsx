import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Shield, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { login, isLoggingIn, isLoginSuccess, loginStatus } =
    useInternetIdentity();

  useEffect(() => {
    if (isLoginSuccess && open) {
      onClose();
    }
  }, [isLoginSuccess, open, onClose]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="bg-card-surface border-subtle max-w-md"
        data-ocid="auth.dialog"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="w-5 h-5 text-accent-blue" />
            TradeMind AI mein Welcome!
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login">
          <TabsList className="w-full bg-card-surface-2">
            <TabsTrigger
              value="login"
              className="flex-1"
              data-ocid="auth.login.tab"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="flex-1"
              data-ocid="auth.signup.tab"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="pt-4 space-y-4">
            <div className="text-center space-y-2">
              <Shield className="w-12 h-12 text-accent-blue mx-auto" />
              <p className="text-sm text-secondary">
                Apna Internet Identity use karke securely login karo
              </p>
              <p className="text-xs text-secondary">
                Internet Identity ek secure, password-free login system hai jo
                ICP blockchain pe kaam karta hai.
              </p>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground font-semibold"
              onClick={login}
              disabled={isLoggingIn}
              data-ocid="auth.login.button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
                  in...
                </>
              ) : (
                "Internet Identity se Login Karo"
              )}
            </Button>
            {loginStatus === "loginError" && (
              <p
                className="text-xs text-signal-red text-center"
                data-ocid="auth.login.error_state"
              >
                Login mein problem aayi. Phir se try karo.
              </p>
            )}
          </TabsContent>

          <TabsContent value="signup" className="pt-4 space-y-4">
            <div className="text-center space-y-2">
              <Shield className="w-12 h-12 text-accent-blue mx-auto" />
              <p className="text-sm text-secondary">
                New account banao — bilkul free!
              </p>
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-card-surface-2 rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground">
                    Free Plan
                  </p>
                  <p className="text-xs text-secondary mt-1">5 analysis/day</p>
                  <p className="text-xs text-secondary">Basic signals</p>
                  <p className="text-xs text-secondary">Chart upload</p>
                </div>
                <div className="bg-card-surface-2 rounded-lg p-3 border border-accent-blue/30">
                  <p className="text-xs font-semibold text-accent-blue">
                    Premium ₹999/mo
                  </p>
                  <p className="text-xs text-secondary mt-1">
                    Unlimited analysis
                  </p>
                  <p className="text-xs text-secondary">Priority insights</p>
                  <p className="text-xs text-secondary">Advanced signals</p>
                </div>
              </div>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground font-semibold"
              onClick={login}
              disabled={isLoggingIn}
              data-ocid="auth.signup.button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                  account...
                </>
              ) : (
                "Free Account Banao"
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
