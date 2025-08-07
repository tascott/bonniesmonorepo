# Feature Specification: Puppy Mornings Booking & User Integration

This document outlines how the "Puppy Mornings" feature is built and how it can be integrated with a Supabase backend to handle bookings and new user registrations seamlessly. The goal is to allow a new customer to book a spot for a puppy morning and, in the process, create a client account that is usable across other applications connected to the same Supabase project.

---

### 1. Feature Overview

From a user's perspective, the "Puppy Mornings" page (`/puppy-mornings`) serves two main purposes:

-   **Information Hub:** It provides all the necessary details about the puppy socialization sessions: what they are, when and where they happen, and what the benefits ("perks") are.
-   **Booking Portal:** It allows users to sign up for a session directly on the page. This is the core interactive part of the feature.

The key user flow is:

1.  A user lands on the "Puppy Mornings" page.
2.  They read about the service and decide to book a spot.
3.  They interact with the booking form (the `<OpenDayBooking />` component).
4.  Upon submitting the form, two things happen in the background:
    -   A new user account is created for them in your system via Supabase Auth.
    -   Their spot for the selected Puppy Morning is reserved in the database.
5.  The user receives a confirmation (e.g., an email and a success message on the screen).

---

### 2. Frontend Implementation (Next.js & React)

The frontend is built with Next.js and React, using the App Router paradigm.

-   **File Structure:** The page resides at `app/puppy-mornings/page.tsx`. This file contains the main React component that renders the entire page.
-   **UI Components:** The page is built using `shadcn/ui`, which provides reusable components like `<Card>`, `<Button>`, and icons from `lucide-react`. This ensures a consistent and professional look.
-   **Client-Side Logic (`'use client';`):** The page is marked as a **Client Component**. This is crucial because booking a spot requires user interaction (filling out a form) and managing state (like loading status or error messages), which can only be done in the browser.

---

### 3. The Booking Component: `<OpenDayBooking />`

This component is the heart of the feature's interactivity. It contains the form and the logic to handle the booking process.

#### Component Logic

The `<OpenDayBooking />` component would contain a form with fields like:

-   Parent's Name
-   Email Address
-   Password (for the new account)
-   Puppy's Name
-   Puppy's Breed/Age
-   Desired Date (if multiple dates are available)

#### Data Flow on Form Submission

When the user clicks the "Book Now" button, the component executes the following steps:

1.  **Initiate Loading State:** The UI updates to show a loading spinner.
2.  **Call a Server Action:** The form data is sent to the backend using a Next.js **Server Action**. This is a secure function that runs only on the server, protecting sensitive logic and API keys.

*Example of the form submission handler inside the `<OpenDayBooking />` component:*
```typescript
// Example inside the OpenDayBooking component

const handleBookingSubmit = async (formData) => {
  setLoading(true);
  
  // 'createBookingAndUser' would be an imported Server Action
  const result = await createBookingAndUser(formData);

  setLoading(false);

  if (result.error) {
    // Show an error message to the user
    showToast('Error:', result.error);
  } else {
    // Show a success message and maybe redirect
    showToast('Success! Your spot is booked.');
  }
};
```

---

### 4. Supabase Integration (Backend Logic via Server Action)

The `createBookingAndUser` Server Action is where all the Supabase logic lives. It handles the creation of both the user and the booking record in a single, atomic operation.

**`actions/createBookingAndUser.ts` (New Server Action File):**

```typescript
'use server'; // Marks the file as containing Server Actions

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function createBookingAndUser(formData) {
  // 1. Create a Supabase client that can run on the server
  const supabase = createServerActionClient({ cookies });

  // 2. Sign up the new user using Supabase Auth
  const { data: { user }, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      // You can add additional user metadata here, which will be stored
      // in the 'raw_user_meta_data' column of the auth.users table.
      data: {
        full_name: formData.parentName,
      }
    }
  });

  if (authError) {
    // If user already exists, handle that gracefully
    if (authError.message.includes('already registered')) {
        return { error: 'This email is already registered. Please try logging in.' };
    }
    return { error: `Authentication error: ${authError.message}` };
  }

  if (!user) {
    return { error: 'User could not be created. Please try again.' };
  }

  // 3. Insert the booking record into your 'bookings' table
  const { error: dbError } = await supabase
    .from('bookings')
    .insert({
      user_id: user.id, // Link the booking to the newly created user
      event_type: 'puppy_morning',
      event_date: formData.date, // The selected date
      puppy_name: formData.puppyName,
      puppy_details: formData.puppyDetails,
    });

  if (dbError) {
    // This is a critical failure. In a production app, you might want to
    // add logic here to delete the user that was just created to avoid orphans.
    return { error: `Database error: ${dbError.message}` };
  }

  // 4. If everything is successful, return a success status
  return { success: true, user };
}
```

### 5. Required Supabase Tables

To support this feature, you would need the following tables in your Supabase database:

1.  **`profiles` table:**
    - This table is commonly used to store public-facing user information and is linked to `auth.users` via a foreign key relationship on the `id` column.

2.  **`bookings` table:**
    - `id` (Primary Key, `bigint` or `uuid`)
    - `created_at` (Timestamp, defaults to `now()`)
    - `user_id` (UUID, Foreign Key to `auth.users.id`)
    - `event_type` (Text, e.g., 'puppy_morning')
    - `event_date` (Date or Timestamp)
    - `puppy_name` (Text)
    - `puppy_details` (Text)

By using this structure, any user who signs up through the "Puppy Mornings" page creates a standard user account in your Supabase project. This same account can then be used to log in to any other application connected to the same Supabase project, achieving the desired cross-platform user integration.


The tsx file is below: 

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint, Calendar, MapPin, Clock } from 'lucide-react';
import OpenDayBooking from '@/components/open-day-booking';

export default function PuppyMorningsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-final-01.png"
              alt="Bonnies Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
          <Button asChild variant="outline" className="primary hover:bg-orange-100">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 font-display">
              Puppy Mornings
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The perfect way to socialise your new puppy in a safe and fun environment. Join our supervised play sessions!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <div className="h-3 primary-bg"></div>
              <CardHeader className="text-center">
                <div className="w-16 h-16 primary-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-display text-slate-800">
                  When
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-slate-700 font-medium">Every Saturday</p>
                <p className="text-slate-600">9:00 AM - 11:00 AM</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <div className="h-3 primary-bg"></div>
              <CardHeader className="text-center">
                <div className="w-16 h-16 primary-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-display text-slate-800">
                  Where
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-slate-700 font-medium">Bonnies Puppy Zone</p>
                <p className="text-slate-600">North London, Hertfordshire</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <div className="h-3 primary-bg"></div>
              <CardHeader className="text-center">
                <div className="w-16 h-16 primary-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-display text-slate-800">
                  Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-slate-700 font-medium">Supervised Play</p>
                <p className="text-slate-600">Basic Training & Socialisation</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 font-display text-center">
              Puppy Morning Perks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="primary-bg p-2 rounded-full mr-4 mt-1">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">First Session Free</h3>
                  <p className="text-slate-600">Your puppy's first morning with us is completely free.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="primary-bg p-2 rounded-full mr-4 mt-1">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Multi-buy Discount</h3>
                  <p className="text-slate-600">Book 5 sessions and get the 6th one free.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="primary-bg p-2 rounded-full mr-4 mt-1">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Expert Supervision</h3>
                  <p className="text-slate-600">Our team are experts in puppy behaviour and training.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="primary-bg p-2 rounded-full mr-4 mt-1">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Puppy Photo Updates</h3>
                  <p className="text-slate-600">Receive photos of your puppy playing during the session.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <OpenDayBooking />

          <div className="text-center">
            <Button asChild className="primary-bg hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
              <Link href="/booking">Book a Spot</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium mb-4">Bonnies Puppy Mornings</p>
          <p className="text-sm text-slate-300">
            Every Saturday | North London, Hertfordshire | 9:00 AM - 11:00 AM
          </p>
        </div>
      </footer>
    </div>
  );
}
