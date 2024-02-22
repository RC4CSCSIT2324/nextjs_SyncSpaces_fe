import '@/styles/globals.css'

export const metadata = {
  title: 'SyncSpaces',
  description: 'you book, we sync',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col bg-[#f8f1ef]'>
        { children }
        <footer className='mt-auto p-8'>
          <span className='font-semibold mr-2'>SyncSpaces</span><span>you book, we sync</span>
        </footer>
      </body>
    </html>
  )
}
