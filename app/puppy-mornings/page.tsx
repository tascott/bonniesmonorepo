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
