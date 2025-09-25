'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar as AvatarType, User } from '@/lib/types';
import { CircleCheck, Lock } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type AvatarEvolutionProps = {
  currentUser: User;
  avatars: AvatarType[];
};

export default function AvatarEvolution({ currentUser, avatars }: AvatarEvolutionProps) {
  const currentAvatarFromUser = avatars.find(a => a.name === currentUser.avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatarFromUser || avatars[0]);

  const handleAvatarSelect = (avatar: AvatarType) => {
    setSelectedAvatar(avatar);
  };

  const allAvatars = [...avatars].sort((a, b) => a.level - b.level);
  
  const isSelectedAvatarUnlocked = selectedAvatar.level <= currentUser.level;

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6 h-full">
        <div className="flex-grow flex items-center justify-center h-96 w-full">
            {selectedAvatar && (
                <div className="flex items-center gap-8">
                  <div className="relative inline-block w-96 h-96">
                     <Image 
                        src={selectedAvatar.imageUrl} 
                        alt={selectedAvatar.name} 
                        fill 
                        quality={100}
                        className={cn(
                          "object-contain",
                          !isSelectedAvatarUnlocked && "grayscale"
                        )}
                      />
                  </div>
                  <div className={cn("w-64 text-left", !isSelectedAvatarUnlocked && 'opacity-50')}>
                      <h3 className="text-base font-semibold">{selectedAvatar.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{selectedAvatar.description}</p>
                  </div>
                </div>
            )}
        </div>
        
        <div className="flex items-end justify-center space-x-4 w-full">
          {allAvatars.map(avatar => {
            const isUnlocked = avatar.level <= currentUser.level;
            return (
              <button 
                key={avatar.id} 
                className="flex flex-col items-center text-center"
                onClick={() => handleAvatarSelect(avatar)}
                aria-label={`Seleccionar ${avatar.name}`}
              >
                  <div className="relative mb-2">
                     <div className={cn(
                       "w-28 h-28 bg-secondary rounded-lg flex items-center justify-center p-2 transition-all",
                       selectedAvatar.id === avatar.id && 'ring-2 ring-primary ring-offset-2',
                       !isUnlocked && 'opacity-60'
                      )}>
                       <Image 
                         src={avatar.imageUrl} 
                         alt={avatar.name} 
                         width={56} 
                         height={56} 
                         className={cn("object-contain", !isUnlocked && "grayscale")}
                       />
                     </div>
                  </div>
                  {isUnlocked ? (
                    <CircleCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted" />
                  )}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
