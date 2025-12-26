export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {/* اینجا می‌توانید Navbar یا Sidebar ثابت خود را بگذارید */}
        {children}
      </body>
    </html>
  )
}