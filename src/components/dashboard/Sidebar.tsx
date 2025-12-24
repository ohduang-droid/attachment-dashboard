import { 
  LayoutDashboard,
  Menu,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
];

function SidebarContent() {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-border px-5">
        <img
          src="/fridge-channel-icon.svg"
          alt="Fridge Channel Studio"
          className="h-8 w-8 text-foreground"
        />
        <span className="min-w-0 truncate text-sm font-semibold text-foreground">
          Fridge Channel Studio
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 pt-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              item.active
                ? "bg-sidebar-accent text-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="min-w-0 truncate">{item.label}</span>
            </div>
            {item.badge && (
              <span className="shrink-0 text-xs text-muted-foreground">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-60 flex-col border-r border-border bg-sidebar md:flex">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <div className="h-full border-r border-border">
          <SidebarContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}
