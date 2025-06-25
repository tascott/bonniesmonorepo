'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Check } from 'lucide-react';

interface Slot {
  id: number;
  start_time: string;
  end_time: string;
  places_left: number;
}

export default function OpenDayBooking() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState<{ time: string; name: string } | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Check for a confirmed booking in localStorage first
    const savedBooking = localStorage.getItem('bonniesOpenDayBooking');
    if (savedBooking) {
      setBookingConfirmed(true);
      setConfirmedBookingDetails(JSON.parse(savedBooking));
      setIsLoading(false);
      return; // Don't fetch slots if already booked
    }

    const fetchSlots = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('open_day_slot_availability')
        .select('*');

      if (error) {
        toast.error('Could not fetch time slots. Please try refreshing the page.');
      } else {
        setSlots(data || []);
      }
      setIsLoading(false);
    };

    fetchSlots();
  }, [supabase]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !fullName || !email) {
      toast.error('Please fill in all fields and select a time slot.');
      return;
    }

    setIsSubmitting(true);

    const response = await fetch('/api/open-day-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot_id: selectedSlot, full_name: fullName, email }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success('Your spot is booked! We look forward to seeing you.');
      
      const bookedSlot = slots.find(slot => slot.id === selectedSlot);
      if (bookedSlot) {
        const bookingDetails = {
          time: `${formatTime(bookedSlot.start_time)} - ${formatTime(bookedSlot.end_time)}`,
          name: fullName,
        };
        localStorage.setItem('bonniesOpenDayBooking', JSON.stringify(bookingDetails));
        setBookingConfirmed(true);
        setConfirmedBookingDetails(bookingDetails);
      }
      setSlots(slots.map(slot => 
        slot.id === selectedSlot ? { ...slot, places_left: slot.places_left - 1 } : slot
      ));
      setSelectedSlot(null);
      setFullName('');
      setEmail('');
    } else {
      toast.error(result.error || 'An unexpected error occurred.');
    }

    setIsSubmitting(false);
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <p>Loading booking slots...</p>
      </div>
    );
  }

  if (bookingConfirmed && confirmedBookingDetails) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-green-50 border-green-200 shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="bg-green-100 rounded-full p-3 inline-block">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-800 pt-4">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <p className="text-lg text-slate-700">
            Thank you, <strong>{confirmedBookingDetails.name}</strong>. Your spot is reserved.
          </p>
          <p className="text-xl font-semibold text-slate-800 bg-green-100 rounded-md py-2 px-4 inline-block">
            Slot: {confirmedBookingDetails.time}
          </p>
          <p className="pt-4 text-slate-600">
            A confirmation email is on its way to you. We can't wait to see you on launch day!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-16">
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-slate-800 font-display">
          Book Your Launch Day Slot
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {slots.map(slot => (
            <Button
              key={slot.id}
              variant="outline"
              className={`flex flex-col h-auto py-3 transition-all duration-150 ease-in-out border-2 ${                selectedSlot === slot.id
                  ? 'primary-bg text-white border-orange-600 ring-2 ring-orange-600 ring-offset-2'
                  : 'border-slate-200 bg-white'
              } ${
                slot.places_left <= 0
                  ? 'cursor-not-allowed opacity-60'
                  : 'hover:bg-orange-50 hover:border-orange-300'
              }`}
              onClick={() => setSelectedSlot(slot.id)}
              disabled={slot.places_left <= 0}
            >
              <span className="font-bold text-lg">{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</span>
              <span className={`text-sm ${
                  selectedSlot === slot.id
                    ? 'text-white/90'
                    : slot.places_left <= 0
                    ? 'text-red-500'
                    : 'text-slate-500'
                }`}>
                {slot.places_left > 0 ? `${slot.places_left} places left` : 'Fully Booked'}
              </span>
            </Button>
          ))}
        </div>

        {selectedSlot && (
          <form onSubmit={handleBooking} className="space-y-6 bg-slate-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="Enter your full name" 
                  value={fullName} 
                  onChange={e => setFullName(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>
            <Button type="submit" className="w-full primary-bg hover:bg-orange-600 text-white" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isSubmitting ? 'Booking...' : 'Book My Spot'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
