'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BotMessageSquare, NotebookText, HeartPulse, Library, LayoutDashboard, Users, UserCog, Building, Trophy, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

const mainNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/chat', icon: BotMessageSquare, label: 'AI Assistant' },
  { href: '/journal', icon: NotebookText, label: 'Mood Journal' },
  { href: '/assessments', icon: HeartPulse, label: 'Self-Assessments' },
  { href: '/support-circles', icon: Users, label: 'Support Circles' },
  { href: '/therapists', icon: Stethoscope, label: 'Find a Therapist' },
  { href: '/resources', icon: Library, label: 'Resources' },
  { href: '/challenges', icon: Trophy, label: 'Challenges' },
];

const secondaryNavItems = [
    { href: '/portal', icon: Building, label: 'Teacher & Parent Portal' },
    { href: '/settings', icon: UserCog, label: 'Settings' },
]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
      {mainNavItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
            (pathname === href || (href !== '/dashboard' && pathname.startsWith(href))) && 'bg-primary/10 text-primary font-semibold'
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
      <Separator className="my-4" />
       {secondaryNavItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
            (pathname === href || (href !== '/dashboard' && pathname.startsWith(href))) && 'bg-primary/10 text-primary font-semibold'
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
