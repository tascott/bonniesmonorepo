import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { slot_id, full_name, email } = await request.json();

  if (!slot_id || !full_name || !email) {
    return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cookieStore = request.cookies;
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  try {
    // First, check if the slot is already full
    const { data: slotAvailability, error: availabilityError } = await supabase
      .from('open_day_slot_availability')
      .select('places_left')
      .eq('id', slot_id)
      .single();

    if (availabilityError || !slotAvailability) {
      return new NextResponse(JSON.stringify({ error: 'Could not verify slot availability.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (slotAvailability.places_left <= 0) {
      return new NextResponse(JSON.stringify({ error: 'This time slot is now full.' }), {
        status: 409, // Conflict
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If there's space, attempt to insert the new booking
    const { data, error } = await supabase
      .from('open_day_bookings')
      .insert([{ slot_id, full_name, email }])
      .select()
      .single();

    if (error) {
      // Handle potential unique constraint violation (user already booked)
      if (error.code === '23505') { // unique_violation
        return new NextResponse(JSON.stringify({ error: 'You have already booked a spot in this time slot.' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Booking successful!', booking: data });

  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred.', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
