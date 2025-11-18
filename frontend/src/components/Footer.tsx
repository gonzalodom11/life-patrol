import { Leaf } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-gray-900 dark:bg-gray-950 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg">
              <img
                src="/life-patrol-logo.png"
                alt="LifePatrol logo"
                className="h-10 w-10 object-contain rounded-md"
              />
            </div>
            <span className="text-sm text-muted-foreground dark:text-foreground/70">
              © 2025 Wildlife Monitor. Supporting UN SDG 15 - Life on Land.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground dark:text-foreground/70">
            <a href="#" className="hover:text-foreground dark:hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="hover:text-foreground dark:hover:text-primary transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-foreground dark:hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};