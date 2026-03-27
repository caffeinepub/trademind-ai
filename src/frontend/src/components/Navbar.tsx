import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, TrendingUp, X } from "lucide-react";
import { useState } from "react";
import { UserRole } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useUserRole } from "../hooks/useQueries";
import AuthModal from "./AuthModal";

const NAV_LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/analysis", label: "AI Analysis" },
  { to: "/chart", label: "Chart Upload" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const { identity, clear } = useInternetIdentity();
  const { data: role } = useUserRole();
  const isLoggedIn = !!identity;
  const isPremium =
    role === UserRole.admin || (isLoggedIn && role === UserRole.user);
  const principalShort = `${identity?.getPrincipal().toString().slice(0, 8)}...`;

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-subtle bg-navy-mid backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-card-surface-2 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent-blue" />
              </div>
              <span className="font-bold text-lg text-foreground">
                Trade<span className="text-accent-blue">Mind</span> AI
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
                  className={`text-sm font-medium transition-colors hover:text-accent-blue ${
                    location.pathname === link.to
                      ? "text-accent-blue"
                      : "text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 bg-card-surface px-3 py-1.5 rounded-full border border-subtle">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-accent-blue/20 text-accent-blue">
                        {principalShort?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-foreground">
                        {isPremium ? "Premium" : "Free"}
                      </span>
                      <span className="text-xs text-secondary">
                        {principalShort}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clear}
                    data-ocid="nav.logout.button"
                    className="text-secondary hover:text-foreground text-xs"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setAuthOpen(true)}
                  data-ocid="nav.login.button"
                  className="bg-primary text-primary-foreground hover:opacity-90 text-sm font-semibold"
                >
                  Login / Signup
                </Button>
              )}
              {/* Mobile hamburger */}
              <button
                type="button"
                className="md:hidden p-2 text-secondary hover:text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                data-ocid="nav.menu.toggle"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-subtle bg-navy-mid px-4 pb-4 pt-2 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors hover:text-accent-blue ${
                  location.pathname === link.to
                    ? "text-accent-blue"
                    : "text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
