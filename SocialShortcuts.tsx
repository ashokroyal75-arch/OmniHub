import { Instagram, Facebook, Mail } from "lucide-react";

const LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Gmail", href: "https://mail.google.com", icon: Mail },
];

export function SocialShortcuts() {
  return (
    <div className="flex gap-3">
      {LINKS.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex flex-1 flex-col items-center gap-1 rounded-md border border-cloud py-3 text-xs text-slate hover:bg-cloud/50"
        >
          <Icon className="h-5 w-5" />
          {label}
        </a>
      ))}
    </div>
  );
}
