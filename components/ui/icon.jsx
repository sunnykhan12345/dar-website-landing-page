const paths = {
  Home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V21h14V9.5', 'M9 21v-6h6v6'],
  ShoppingBag: ['M6 8h12l-1 13H7L6 8Z', 'M9 8a3 3 0 0 1 6 0'],
  ShoppingCart: ['M4 5h2l2 10h10l2-7H8', 'M9 20h.01', 'M18 20h.01'],
  UserRound: ['M18 20a6 6 0 0 0-12 0', 'M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
  Sparkles: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z', 'M5 3v4', 'M3 5h4', 'M19 17v4', 'M17 19h4'],
  MonitorSmartphone: ['M4 5h13v10H4V5Z', 'M8 19h5', 'M10.5 15v4', 'M18 9h2v10h-2V9Z'],
  Palette: ['M12 4a8 8 0 0 0 0 16h1.5a2 2 0 0 0 0-4H12a4 4 0 0 1 0-8h1a3 3 0 0 0 0-6h-1Z', 'M7.5 11h.01', 'M10 8h.01', 'M14 8h.01'],
  Mic: ['M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z', 'M19 11a7 7 0 0 1-14 0', 'M12 18v4'],
  TicketPercent: ['M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z', 'M9 15l6-6', 'M9 9h.01', 'M15 15h.01'],
  Store: ['M4 10h16l-1-5H5l-1 5Z', 'M6 10v10h12V10', 'M9 20v-6h6v6'],
  Presentation: ['M4 5h16v11H4V5Z', 'M12 16v5', 'M8 21h8'],
  Gift: ['M4 10h16v10H4V10Z', 'M3 10h18', 'M12 10v10', 'M8 10a2 2 0 1 1 4 0', 'M16 10a2 2 0 1 0-4 0'],
  ImageIcon: ['M5 5h14v14H5V5Z', 'M8 14l2-2 3 3 2-2 3 3', 'M9 9h.01'],
  Bot: ['M8 8h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z', 'M12 4v4', 'M9 13h.01', 'M15 13h.01'],
  Clock3: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
  Headphones: ['M4 13a8 8 0 0 1 16 0', 'M5 13h3v6H5v-6Z', 'M16 13h3v6h-3v-6Z'],
  ReceiptText: ['M6 3h12v18l-3-2-3 2-3-2-3 2V3Z', 'M9 8h6', 'M9 12h6', 'M9 16h4'],
  Crown: ['M4 8l4 4 4-7 4 7 4-4-2 11H6L4 8Z'],
  ArrowRight: ['M5 12h14', 'M13 6l6 6-6 6'],
  Facebook: ['M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z'],
  Instagram: ['M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z', 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M17.5 6.5h.01'],
  Linkedin: ['M6 9v10', 'M6 5h.01', 'M10 19v-6a4 4 0 0 1 8 0v6', 'M10 13v6'],
  Music2: ['M9 18V5l10-2v13', 'M9 18a3 3 0 1 1-3-3', 'M19 16a3 3 0 1 1-3-3'],
  Globe2: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20', 'M12 2a15 15 0 0 0 0 20'],
};

export function Icon({ name, size = 22, strokeWidth = 1.8, className = '' }) {
  const iconPaths = paths[name] || paths.Sparkles;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {iconPaths.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
