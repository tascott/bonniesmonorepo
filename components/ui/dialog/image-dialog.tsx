import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface ImageDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	src: string;
	alt: string;
}

export default function ImageDialog({ isOpen, onOpenChange, src, alt }: ImageDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="w-screen h-auto sm:max-w-[800px] p-0">
				<DialogTitle className="sr-only">{alt}</DialogTitle>
				<Image
					src={src}
					alt={alt}
					width={1200}
					height={800}
					className="w-full"
				/>
			</DialogContent>
		</Dialog>
	);
}