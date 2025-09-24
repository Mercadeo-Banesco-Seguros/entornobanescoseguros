import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar as AvatarType, User } from '@/lib/types';
import { Check, Lock } from 'lucide-react';

type AvatarEvolutionProps = {
  currentUser: User;
  avatars: AvatarType[];
};

export default function AvatarEvolution({ currentUser, avatars }: AvatarEvolutionProps) {
  const currentAvatar = avatars.find(a => a.level === currentUser.level);
  const nextAvatar = avatars.find(a => a.level === currentUser.level + 1);
  const previousAvatars = avatars.filter(a => a.level < currentUser.level);

  return (
    <Card className="h-full border-0 shadow-none">
      <CardHeader>
        <CardTitle className="font-bold text-2xl text-foreground">Tu Avatar</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6">
        {currentAvatar && (
          <div className="flex flex-col items-center">
            <div className="relative inline-block bg-secondary p-8 rounded-full mb-4 shadow-inner">
                <currentAvatar.Icon className="h-24 w-24 text-primary" />
            </div>
            <p className="font-semibold text-xl text-foreground">{currentAvatar.name}</p>
            <p className="text-sm text-muted">Nivel {currentAvatar.level}</p>
          </div>
        )}
        
        <div className="flex items-start justify-center space-x-6 w-full">
          {previousAvatars.map(avatar => (
            <div key={avatar.id} className="flex flex-col items-center text-center w-24">
                <div className="relative bg-secondary/50 p-3 rounded-full mb-2">
                    <avatar.Icon className="h-8 w-8 text-primary/70" />
                    <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 flex items-center justify-center">
                        <Check className="h-3 w-3" />
                    </div>
                </div>
                <p className="text-xs font-semibold text-muted-foreground">{avatar.name}</p>
            </div>
          ))}
          {nextAvatar && (
            <div className="flex flex-col items-center text-center w-24">
                <div className="relative bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-2">
                    <nextAvatar.Icon className="h-8 w-8 text-gray-400" />
                    <div className="absolute -top-1 -right-1 bg-gray-400 text-white rounded-full p-0.5 flex items-center justify-center">
                        <Lock className="h-3 w-3" />
                    </div>
                </div>
                <p className="text-xs font-semibold text-gray-400">{nextAvatar.name}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
