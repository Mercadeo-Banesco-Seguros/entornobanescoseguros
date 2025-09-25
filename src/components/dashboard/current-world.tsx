import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { User, Level } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';

type CurrentWorldProps = {
  currentUser: User;
  level: Level;
};

export default function CurrentWorld({ currentUser, level }: CurrentWorldProps) {
  const worldImage = PlaceHolderImages.find(p => p.id === level.worldImageId);

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center">
        <div className="aspect-square w-full max-w-lg relative rounded-lg mb-4">
            {worldImage ? (
                <Image
                    src={worldImage.imageUrl}
                    alt={level.worldName}
                    fill
                    className="object-contain"
                    data-ai-hint={worldImage.imageHint}
                />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg" />
            )}
        </div>
        <Button size="lg" className="font-bold text-lg">{level.worldName}</Button>
      </CardContent>
    </Card>
  );
}
