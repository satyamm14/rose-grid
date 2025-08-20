"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Download } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const initialImageUrls = [
  { src: "https://placehold.co/600x600.png", hint: "rose pink" },
  { src: "https://placehold.co/600x600.png", hint: "petal blossom" },
  { src: "https://placehold.co/600x600.png", hint: "floral pattern" },
  { src: "https://placehold.co/600x600.png", hint: "garden flower" },
  { src: "https://placehold.co/600x600.png", hint: "soft texture" },
  { src: "https://placehold.co/600x600.png", hint: "pink aesthetic" },
  { src: "https://placehold.co/600x600.png", hint: "delicate bloom" },
  { src: "https://placehold.co/600x600.png", hint: "pastel color" },
  { src: "https://placehold.co/600x600.png", hint: "abstract petals" },
  { src: "https://placehold.co/600x600.png", hint: "light rose" },
  { src: "https://placehold.co/600x600.png", hint: "summer garden" },
  { src: "https://placehold.co/600x600.png", hint: "elegant flower" },
  { src: "https://placehold.co/600x600.png", hint: "macro photography" },
  { src: "https://placehold.co/600x600.png", hint: "botanical beauty" },
  { src: "https://placehold.co/600x600.png", hint: "dreamy floral" },
  { src: "https://placehold.co/600x600.png", hint: "rose petals" },
];

const Footer = ({ onDownloadAll }: { onDownloadAll: () => void }) => {
  const [year, setYear] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    await onDownloadAll();
    setIsDownloading(false);
  };

  return (
    <footer className="text-center mt-16 text-muted-foreground text-sm">
      <div className="mb-4">
        <Button onClick={handleDownloadClick} disabled={isDownloading}>
          <Download className="mr-2 h-4 w-4" />
          {isDownloading ? "Downloading..." : "Download All as ZIP"}
        </Button>
      </div>
      <p>
        {year && `© ${year} `}Rose Grid. Created for a beautiful web
        experience.
      </p>
    </footer>
  );
};

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = (checked: boolean) => {
    if (checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsDarkMode(checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5" />
      <Switch
        id="theme-toggle"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
      />
      <Moon className="h-5 w-5" />
    </div>
  );
};

export default function Home() {
  const [columns, setColumns] = useState(4);
  const [imageUrls, setImageUrls] = useState(initialImageUrls);
  const [urlsInput, setUrlsInput] = useState(
    initialImageUrls.map((img) => img.src).join(",\n")
  );

  const handleUpdateUrls = () => {
    const urls = urlsInput
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter((url) => url)
      .map((url) => ({ src: url, hint: "custom image" }));
    setImageUrls(urls);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const imagePromises = imageUrls.map(async (image, index) => {
      try {
        const response = await fetch(image.src);
        if (!response.ok) {
          console.error(`Failed to fetch ${image.src}: ${response.statusText}`);
          return;
        }
        const blob = await response.blob();
        let filename = image.src.substring(image.src.lastIndexOf('/') + 1);
        if (!filename.includes('.')) {
          filename = `${filename}.jpg`;
        }
        zip.file(filename, blob);
      } catch (error) {
        console.error(`Error downloading ${image.src}:`, error);
      }
    });

    await Promise.all(imagePromises);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "rose-grid-images.zip");
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10 relative">
          <h1 className="text-5xl font-headline font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl">
            Rose Grid
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A clean and minimalist viewer for your favorite images.
          </p>
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
        </header>

        <main>
          <Card className="max-w-xl mx-auto mb-10 p-6 shadow-md border-border/50">
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="columns-slider"
                  className="text-base font-medium"
                >
                  Grid Columns
                </Label>
                <span className="w-12 text-center text-lg font-bold text-primary tabular-nums bg-primary/10 rounded-md py-1">
                  {columns}
                </span>
              </div>
              <div className="[--primary:hsl(var(--accent))] [--ring:hsl(var(--accent))]">
                <Slider
                  id="columns-slider"
                  min={1}
                  max={8}
                  step={1}
                  value={[columns]}
                  onValueChange={(value) => setColumns(value[0])}
                  aria-label="Number of columns"
                />
              </div>

              <div className="grid gap-2 mt-4">
                <Label htmlFor="image-urls" className="text-base font-medium">
                  Image URLs ({imageUrls.length} images)
                </Label>
                <Textarea
                  id="image-urls"
                  placeholder="Enter image URLs, separated by commas or new lines"
                  value={urlsInput}
                  onChange={(e) => setUrlsInput(e.target.value)}
                  className="h-32"
                />
                <Button onClick={handleUpdateUrls} className="mt-2">
                  Update Grid
                </Button>
              </div>
            </div>
          </Card>

          <div
            className="grid gap-4 md:gap-6"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {imageUrls.map((image, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out border-border/30 group relative"
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.src}
                    alt={`Rose Grid Image ${index + 1}`}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={image.hint}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <a
                  href={image.src}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 bg-primary text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center"
                  aria-label="Download image"
                >
                  <Download className="h-5 w-5" />
                </a>
              </Card>
            ))}
          </div>
        </main>

        <Footer onDownloadAll={handleDownloadAll} />
      </div>
    </div>
  );
}
