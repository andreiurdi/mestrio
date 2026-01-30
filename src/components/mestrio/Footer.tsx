export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <div className="text-2xl font-bold text-foreground">Mestrio</div>
          <p className="text-sm text-muted-foreground max-w-md">Connecting homeowners with trusted construction professionals. Build your dream project with confidence.</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <p className="text-sm text-muted-foreground">© {currentYear} Mestrio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
