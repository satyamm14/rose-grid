"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const imageUrls = [
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

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="text-center mt-16 text-muted-foreground text-sm">
      <p>
        {year && `© ${year} `}Rose Grid. Created for a beautiful web
        experience.
      </p>
    </footer>
  );
};

export default function Home() {
  const [columns, setColumns] = useState(4);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-headline font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl">
            Rose Grid
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A clean and minimalist viewer for your favorite images.
          </p>
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
                className="overflow-hidden rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out border-border/30 group"
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.src}
                    alt={`Rose Grid Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={image.hint}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </Card>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
