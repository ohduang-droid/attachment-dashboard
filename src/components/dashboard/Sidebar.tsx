import { 
  LayoutDashboard,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-border px-5">
        <img
          src="/fridge-channel-icon.svg"
          alt="Fridge Channel Studio"
          className="h-8 w-8 text-foreground"
        />
        <span className="text-sm font-semibold text-foreground">Fridge Channel Studio</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 pt-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
              item.active 
                ? "bg-sidebar-accent text-foreground" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="text-xs text-muted-foreground">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
