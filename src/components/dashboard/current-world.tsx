import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { User, Level } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type CurrentWorldProps = {
  currentUser: User;
  level: Level;
};

export default function CurrentWorld({ currentUser, level }: CurrentWorldProps) {
  const progress = (currentUser.xp / level.xpThreshold) * 100;
  const worldImage = PlaceHolderImages.find(p => p.id === level.worldImageId);

  return (
    <Card className="h-full border-0 shadow-none">
      <CardHeader>
        <CardTitle className="font-bold text-2xl text-foreground">Mundo Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full relative rounded-lg overflow-hidden shadow-lg mb-4">
            {worldImage && (
                <Image
                    src={worldImage.imageUrl}
                    alt={level.worldName}
                    fill
                    className="object-cover"
                    data-ai-hint={worldImage.imageHint}
                />
            )}
        </div>
        <h3 className="text-xl font-semibold text-foreground">{level.worldName}</h3>
        <p className="text-muted-foreground text-sm">Nivel {level.id}</p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2">
        <div className="w-full flex justify-between text-sm font-semibold">
          <span className="text-muted">Progreso del Nivel</span>
          <span className="text-foreground">{currentUser.xp} / {level.xpThreshold} XP</span>
        </div>
        <Progress value={progress} className="w-full h-3" />
      </CardFooter>
    </Card>
  );
}
