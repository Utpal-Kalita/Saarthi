'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BotMessageSquare, NotebookText, HeartPulse, Library, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/chat', icon: BotMessageSquare, label: 'AI Assistant' },
  { href: '/journal', icon: NotebookText, label: 'Mood Journal' },
  { href: '/assessments', icon: HeartPulse, label: 'Self-Assessments' },
  { href: '/resources', icon: Library, label: 'Resources' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            (pathname === href || (href !== '/dashboard' && pathname.startsWith(href))) && 'bg-muted text-primary'
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
