export const metadata = {
  title: 'Fermah Quiz',
  description: 'Test your Fermah ecosystem knowledge.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#001A2C' }}>
        {children}
      </body>
    </html>
  );
}
