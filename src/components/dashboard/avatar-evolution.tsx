
import { Card, CardContent } from '@/components/ui/card';
import { Avatar as AvatarType, User } from '@/lib/types';
import { CircleCheck, Lock } from 'lucide-react';

type AvatarEvolutionProps = {
  currentUser: User;
  avatars: AvatarType[];
};

export default function AvatarEvolution({ currentUser, avatars }: AvatarEvolutionProps) {
  const currentAvatar = avatars.find(a => a.level === currentUser.level);
  const allAvatars = [...avatars].sort((a, b) => a.level - b.level);

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6">
        {currentAvatar && (
            <div className="flex flex-col items-center">
              <div className="relative inline-block mb-4">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
        )}
        
        <div className="flex items-end justify-center space-x-4 w-full">
          {allAvatars.map(avatar => {
            const isUnlocked = avatar.level <= currentUser.level;
            return (
              <div key={avatar.id} className="flex flex-col items-center text-center">
                  <div className="relative mb-2">
                     <div className={`w-24 h-24 bg-gray-200 rounded-lg ${!isUnlocked ? 'opacity-50' : ''}`}></div>
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
