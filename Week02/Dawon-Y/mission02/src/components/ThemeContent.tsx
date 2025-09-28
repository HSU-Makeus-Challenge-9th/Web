import clsx from 'clsx';

function ThemeContent() {

  return (
    <div
      className={clsx(
        'p-4 h-full w-full flex flex-col items-center justify-center' // padding: 1rem (16px), full height and width, center content
      )}
    >
      <h1 className="text-2xl font-bold mb-4">Theme Content</h1> {/* text size: 2xl (24px), bold font, margin-bottom: 1rem (16px) */}
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
}

export default ThemeContent;