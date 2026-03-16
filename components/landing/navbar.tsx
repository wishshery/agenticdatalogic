"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/docs", label: "Docs" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-navy-900/95 backdrop-blur-sm border-b border-navy-800 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-white">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-glow-blue">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl">Assist<span className="text-gradient">AI</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === href ? "text-white bg-navy-800" : "text-navy-400 hover:text-white hover:bg-navy-800/50"}`}>
              {label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" className="btn btn-ghost btn-sm">Sign In</Link>
          <Link href="/auth/signup" className="btn btn-primary btn-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden btn btn-icon text-navy-400 hover:text-white">
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-navy-900 border-b border-navy-800 px-6 py-4 flex flex-col gap-3">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setIsMobileOpen(false)} className="text-navy-300 hover:text-white py-2 text-sm font-medium">
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 border-t border-navy-800">
            <Link href="/auth/login" className="btn btn-ghost btn-sm flex-1 justify-center">Sign In</Link>
            <Link href="/auth/signup" className="btn btn-primary btn-sm flex-1 justify-center">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
