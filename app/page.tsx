import SyncSpacesLogoDemo from '@/app/components/SyncSpacesLogo/Demo';
import NavBar from './components/NavBar/NavBar';
import BookingCalendar from '@/app/components/BookingCalendar/BookingCalendar';
import Link from 'next/link';


export default function Home() {

  return (
    <main className="container py-5">
      <div>
      <NavBar />
      <main className="container py-5">
        <p>Name</p>
        
      </main>
    </div>
      <BookingCalendar
        initialEvents={[]}
      />
    </main>
  );
    
  
}