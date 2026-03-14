import './globals.css'

export const metadata = {
  title: 'The 6-Figure Profit Engine — BrandsBro',
  description:
    'Turn your existing checkout into a high-yield revenue machine. The data-backed blueprint to scaling AOV without spending a cent more on ads.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
