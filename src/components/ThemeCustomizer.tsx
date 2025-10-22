import { Paintbrush, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const accentColors = [
  { name: "Pink", value: "330 81% 67%" },
  { name: "Rose", value: "346 77% 65%" },
  { name: "Red", value: "0 72% 61%" },
  { name: "Orange", value: "25 95% 60%" },
  { name: "Yellow", value: "48 96% 53%" },
  { name: "Green", value: "142 71% 45%" },
  { name: "Teal", value: "173 58% 45%" },
  { name: "Blue", value: "217 91% 60%" },
  { name: "Purple", value: "262 83% 58%" },
];

const grayColors = [
  { name: "Slate", value: "215 20% 65%" },
  { name: "Gray", value: "220 9% 46%" },
  { name: "Zinc", value: "240 5% 65%" },
  { name: "Neutral", value: "0 0% 60%" },
];

const ThemeCustomizer = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOpen, setIsOpen] = useState(false);
  const [accentColor, setAccentColor] = useState("330 81% 67%");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const savedAccent = localStorage.getItem("accentColor");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    if (savedAccent) setAccentColor(savedAccent);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    if (savedAccent) {
      document.documentElement.style.setProperty("--primary", savedAccent);
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "H") {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const changeAccentColor = (color: string) => {
    setAccentColor(color);
    localStorage.setItem("accentColor", color);
    document.documentElement.style.setProperty("--primary", color);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 rounded-full bg-card/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 hover:bg-card hover-lift transition-all duration-300 group"
        aria-label="Toggle theme customizer"
        title="Press H to show/hide the Theme Panel"
      >
        {isOpen ? (
          <EyeOff className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-300" />
        ) : (
          <Eye className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-300" />
        )}
      </Button>

      <Card
        className={`fixed top-20 right-4 z-40 w-80 p-6 backdrop-blur-md bg-card/95 border-2 border-primary/30 shadow-2xl transition-all duration-500 ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[400px] pointer-events-none"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg">
              <Paintbrush className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Theme</h2>
          </div>

          {/* Accent Colors */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Accent color</h3>
            <div className="grid grid-cols-6 gap-2">
              {accentColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => changeAccentColor(color.value)}
                  className={`w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                    accentColor === color.value ? "ring-2 ring-offset-2 ring-foreground scale-110" : ""
                  }`}
                  style={{ backgroundColor: `hsl(${color.value})` }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Gray Colors */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Gray color</h3>
            <div className="grid grid-cols-6 gap-2">
              {grayColors.map((color) => (
                <button
                  key={color.name}
                  className="w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ backgroundColor: `hsl(${color.value})` }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Appearance</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => theme === "dark" && toggleTheme()}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  theme === "light"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="text-sm font-medium">☀️ Light</span>
              </button>
              <button
                onClick={() => theme === "light" && toggleTheme()}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="text-sm font-medium">🌙 Dark</span>
              </button>
            </div>
          </div>

          {/* Tip */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Press <kbd className="px-2 py-1 bg-secondary rounded text-xs font-mono">H</kbd> to toggle this panel
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ThemeCustomizer;
