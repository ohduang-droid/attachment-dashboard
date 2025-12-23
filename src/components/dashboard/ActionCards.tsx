const recentChanges = [
  { date: "Dec 20", change: "Updated CTA text", impact: "+8%" },
  { date: "Dec 18", change: "Added 10s video preview", impact: "+23%" },
  { date: "Dec 15", change: "Reduced preview length", impact: "-5%" },
];

export function ActionCards() {
  return (
    <div className="space-y-4 animate-fade-in" style={{ animationDelay: "500ms" }}>
      {/* Recent Changes */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Recent Changes</h4>
        <div className="space-y-3">
          {recentChanges.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground w-14">{item.date}</span>
                <span className="text-foreground">{item.change}</span>
              </div>
              <span className={item.impact.startsWith("+") ? "text-success font-medium" : "text-destructive font-medium"}>
                {item.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
