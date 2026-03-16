import Link from "next/link";
import { Bot, Twitter, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "API Docs"],
  Services: ["Admin Support", "Project Management", "Email Handling", "Scheduling", "Research"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
};

export function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-900">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-white mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span>AssistAI</span>
            </Link>
            <p className="text-navy-400 text-sm leading-relaxed mb-4">
              AI-powered virtual assistants for modern businesses. 10 specialized agents, available 24/7.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center text-navy-400 hover:text-white hover:border-navy-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-white text-sm mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-navy-400 hover:text-white text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-500 text-sm">© 2024 AssistAI Inc. All rights reserved.</p>
          <p className="text-navy-500 text-sm">Made with ❤️ for entrepreneurs everywhere</p>
        </div>
      </div>
    </footer>
  );
}
