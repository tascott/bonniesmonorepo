import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reset Password - Bonnie's",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        margin: 0,
        backgroundColor: '#f3f4f6',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        {children}
      </body>
    </html>
  );
}
