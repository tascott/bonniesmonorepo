'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import ImageDialog from '@/components/ui/dialog/image-dialog';

export default function LocationsSection() {
	const [isImageOpen, setIsImageOpen] = useState(false);

	return (
		<section id="locations" className="py-24 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<Badge className="bg-rose-100 primary mb-4 px-3 py-1 text-sm rounded-full">
						Our Locations
					</Badge>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-display">
						Serving Dog Owners Across Shenley, Radlett, Mill Hill & More
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-1 gap-8">
					<div className="group max-w-[500px] mx-auto">
						<div className="rounded-3xl overflow-hidden shadow-lg">
							<div className="relative">
								<Image
									src="/images/map.png?height=400&width=600"
									alt="Map showing Bonnie's dog care service areas including Shenley, Radlett, and Mill Hill"
									width={600}
									height={400}
									className="w-full h-64 object-contain"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
								<div className="absolute bottom-0 left-0 p-4 text-white">
									<h3 className="font-bold text-xl">
										Hertfordshire
									</h3>
									<p className="flex items-center mt-1 text-sm opacity-90">
										<MapPin className="h-4 w-4 mr-1" />
										Shenley, Radlett, Hertfordshire
									</p>
								</div>
							</div>
							<div className="p-4 bg-white">
								<div className="text-slate-600 mb-4">
                  <p className="mb-3">Bonnie's proudly offers premier dog walks, private field hire, and 1-on-1 training with convenient pick-up and drop-off services to the following key areas in Hertfordshire and North London:</p>
                  <ul className="list-disc list-inside grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mb-3">
                    <li>Barnet</li>
                    <li>Whetstone</li>
                    <li>Mill Hill</li>
                    <li>Edgware</li>
                    <li>Stanmore</li>
                    <li>Bushey</li>
                    <li>Aldenham</li>
                    <li>Radlett</li>
                    <li>Shenley</li>
                    <li>Napsbury Park</li>
                    <li>St Albans</li>
                    <li>London Colney</li>
                    <li>Borehamwood</li>
                    <li>Elstree</li>
                  </ul>
                  <p>If your specific location isn't listed, please don't hesitate to contact us. We always try to accommodate owners in nearby areas where possible.</p>
                </div>
								<Button
									variant="outline"
									className="w-full primary-bg text-white hover:muted-bg hover:primary cursor-pointer rounded-xl"
									onClick={() => setIsImageOpen(true)}
								>
									View Details
								</Button>
							</div>
						</div>

						<ImageDialog
							isOpen={isImageOpen}
							onOpenChange={setIsImageOpen}
							src="/images/map.png"
							alt="Detailed map of Bonnie's service locations in Hertfordshire"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}