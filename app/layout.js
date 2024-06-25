import './globals.css'
import { Inter } from 'next/font/google'
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

const startBackgroundProcess = () => {
  // Send a GET request to the backend endpoint every 5 minutes (adjust the interval as needed)
  setInterval(() => {
    axios.get('https://socialbenefitssamir.onrender.com/background')
      .then(() => {
        /*console.log('Background process triggered');*/
      })
      .catch((error) => {
        console.error('Error triggering background process:', error);
      });
  }, 60 * 1000); // 5 minutes interval (in milliseconds)
};
export const metadata = {
  title: 'Esi Sba.',
  description: 'A comprehensive web platform that simplifies the management of social benefits for ESI SBA university employees, offering easy access to benefit information, request processing, and detailed reporting capabilities.',
}

export default function RootLayout({ children }) {
  startBackgroundProcess();
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}</body>
    </html>
  )
}
