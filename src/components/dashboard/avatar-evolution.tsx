import { Card, CardContent } from '@/components/ui/card';
import { Avatar as AvatarType, User } from '@/lib/types';
import { CheckCircle2 } from 'lucide-react';

type AvatarEvolutionProps = {
  currentUser: User;
  avatars: AvatarType[];
};

export default function AvatarEvolution({ currentUser, avatars }: AvatarEvolutionProps) {
  const currentAvatar = avatars.find(a => a.level === currentUser.level);
  const nextAvatar = avatars.find(a => a.level === currentUser.level + 1);
  const previousAvatars = avatars.filter(a => a.level < currentUser.level).slice(-2);

  const unlockedAvatars = [...previousAvatars, currentAvatar].filter(Boolean) as AvatarType[];

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
          {unlockedAvatars.map(avatar => (
            <div key={avatar.id} className="flex flex-col items-center text-center">
                <div className="relative mb-2">
                   <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          ))}
          {nextAvatar && (
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-2">
                   <div className="w-24 h-24 bg-gray-200 rounded-lg opacity-50"></div>
                </div>
                 <div className="h-8 w-8"></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}