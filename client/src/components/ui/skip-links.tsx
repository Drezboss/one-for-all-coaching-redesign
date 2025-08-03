export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a 
        href="#main-content" 
        className="absolute top-0 left-0 bg-lfc-red text-white px-4 py-2 m-2 rounded focus:outline-none focus:ring-2 focus:ring-white z-50"
      >
        Skip to main content
      </a>
      <a 
        href="#main-navigation" 
        className="absolute top-0 left-32 bg-lfc-red text-white px-4 py-2 m-2 rounded focus:outline-none focus:ring-2 focus:ring-white z-50"
      >
        Skip to navigation
      </a>
    </div>
  );
}