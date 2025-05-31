'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint, Calendar, MapPin, Clock } from 'lucide-react';

export default function LaunchDayPage() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="primary-bg text-white p-2 rounded-full">
              <PawPrint className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-foreground font-display">
              Bonnies
            </span>
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
              Launch Day Celebration
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join us on July 5th, 2025 for our official launch! We're celebrating with special activities, treats, and exclusive offers.
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
                <p className="text-lg text-slate-700 font-medium">July 5th, 2025</p>
                <p className="text-slate-600">10:00 AM - 4:00 PM</p>
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
                <p className="text-lg text-slate-700 font-medium">Bonnies Main Field</p>
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
                <p className="text-lg text-slate-700 font-medium">Dog Play Sessions</p>
                <p className="text-slate-600">Demonstrations & Special Offers</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 font-display text-center">
              Launch Day Special Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="primary-bg p-2 rounded-full mr-4 mt-1">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">20% Off Play Mornings</h3>
                  <p className="text-slate-600">Book your dog's first play morning and receive 20% off.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="primary-bg p-2 rounded-full mr-4 mt-1">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Free Field Session</h3>
                  <p className="text-slate-600">Sign up for a membership and get a free field session.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="primary-bg p-2 rounded-full mr-4 mt-1">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Goodie Bags</h3>
                  <p className="text-slate-600">The first 50 visitors will receive a special dog goodie bag.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="primary-bg p-2 rounded-full mr-4 mt-1">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Professional Dog Photos</h3>
                  <p className="text-slate-600">Free professional photos of your dog during the event.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild className="primary-bg hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
              <Link href="/#contact">RSVP Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium mb-4">Bonnies Launch Day Celebration</p>
          <p className="text-sm text-slate-300">
            July 5th, 2025 | North London, Hertfordshire | 10:00 AM - 4:00 PM
          </p>
        </div>
      </footer>
    </div>
  );
}
