import SyncSpacesLogoDemo from '@/app/components/SyncSpacesLogo/Demo';
import NavBar from '../components/NavBar/NavBar';
import BookingCalendar from '@/app/components/BookingCalendar/BookingCalendar';
import Link from 'next/link';


export default function Profile() {
  return (
    <div>
      <NavBar />
      <main className="container py-5">
        <p>Profile here!</p>
      </main>
    </div>
  );
}