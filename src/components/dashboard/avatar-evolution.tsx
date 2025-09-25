
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar as AvatarType, User } from '@/lib/types';
import { CircleCheck, Lock } from 'lucide-react';
import Image from 'next/image';

type AvatarEvolutionProps = {
  currentUser: User;
  avatars: AvatarType[];
};

export default function AvatarEvolution({ currentUser, avatars }: AvatarEvolutionProps) {
  const currentAvatarIndex = avatars.findIndex(a => a.name === currentUser.avatar);
  const currentAvatar = avatars[currentAvatarIndex]

  const allAvatars = [...avatars].sort((a, b) => a.level - b.level);

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6">
        {currentAvatar && (
            <div className="flex flex-col items-center">
              <div className="relative inline-block mb-4">
                  <div className="relative w-96 h-96 rounded-lg flex items-center justify-center">
                     <Image 
                        src={currentAvatar.imageUrl} 
                        alt={currentAvatar.name} 
                        fill 
                        quality={100}
                        className="object-contain" 
                      />
                  </div>
              </div>
            </div>
        )}
        
        <div className="flex items-end justify-center space-x-4 w-full">
          {allAvatars.map(avatar => {
            const isUnlocked = avatar.level <= currentUser.level;
            return (
              <div key={avatar.id} className="flex flex-col items-center text-center">
                  <div className="relative mb-2">
                     <div className={`w-24 h-24 bg-secondary rounded-lg flex items-center justify-center p-2 ${!isUnlocked ? 'opacity-50' : ''}`}>
                       <Image src={avatar.imageUrl} alt={avatar.name} width={80} height={80} className="object-contain" />
                     </div>
                  </div>
                  {isUnlocked ? (
                    <CircleCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted" />
                  )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
