# Rose Grid 

Rose Grid is a clean, minimalist, and highly customizable image grid viewer. It allows you to dynamically create beautiful image galleries from a list of URLs, with controls for layout, theming, and more.

## ✨ Features

- **Dynamic Grid Layout**: Easily adjust the number of columns in the grid with a simple slider.
- **Custom Image Sources**: Paste in a list of image URLs (separated by commas or newlines) to create your own custom grid.
- **Duplicate URL Detection**: The app automatically detects and removes duplicate image URLs, informing you of how many were found.
- **Dark & Light Themes**: Switch between a light and a sleek dark mode to suit your viewing preference.
- **Image Downloads**:
  - **Individual Downloads**: Hover over any image to reveal a download button.
  - **Bulk Downloads**: Download all images in the grid as a single ZIP file with the click of a button in the footer.
- **Image Count**: See a running total of how many unique images are currently displayed in the grid.
- **Responsive Design**: A clean and modern UI that looks great on all screen sizes.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (version 18.x or later) and npm installed on your machine.

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/your-username/rose-grid.git
   ```
2. Navigate to the project directory:
   ```sh
   cd rose-grid
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 💻 How to Use

- **Adjust Columns**: Use the "Grid Columns" slider to change the number of columns in the image grid.
- **Update Images**: Paste your desired image URLs into the text area. You can separate them with commas or new lines. Click the "Update Grid" button to refresh the gallery.
- **Toggle Theme**: Use the Sun/Moon switch in the top-right corner to toggle between light and dark modes.
- **Download Images**:
  - To download a single image, hover your mouse over it and click the download icon.
  - To download all images at once, click the "Download All as ZIP" button in the footer.

## 🛠️ Technologies Used

This project is built with a modern tech stack:

- [Next.js](https://nextjs.org/) – React Framework
- [React](https://reactjs.org/) – UI Library
- [TypeScript](https://www.typescriptlang.org/) –- Strongly Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) –- Utility-First CSS Framework
- [ShadCN UI](https://ui.shadcn.com/) –- Re-usable components built with Radix UI and Tailwind CSS.
- [Lucide React](https://lucide.dev/) –- Beautiful and consistent icons.
- [JSZip](https://stuk.github.io/jszip/) –- For creating ZIP files on the client-side.
- [File-saver](https://github.com/eligrey/FileSaver.js) –- For saving files on the client-side.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
