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
  const currentAvatarIndex = avatars.findIndex(a => a.level <= currentUser.level);
  const currentAvatar = avatars[currentAvatarIndex]
  const nextAvatar = avatars[currentAvatarIndex + 1];

  const allAvatars = [...avatars].sort((a, b) => a.level - b.level);

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6">
        {currentAvatar && (
            <div className="flex flex-col items-center">
              <div className="relative inline-block mb-4">
                  <div className="w-48 h-48 bg-secondary rounded-lg flex items-center justify-center">
                     <currentAvatar.Icon className="h-24 w-24 text-primary" />
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
                     <div className={`w-24 h-24 bg-secondary rounded-lg flex items-center justify-center ${!isUnlocked ? 'opacity-50' : ''}`}>
                       <avatar.Icon className={`h-12 w-12 ${isUnlocked ? 'text-primary' : 'text-muted'}`} />
                     </div>
                  </div>
                  {isUnlocked ? (
                    <CircleCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-3 w-3 text-muted" />
                  )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
