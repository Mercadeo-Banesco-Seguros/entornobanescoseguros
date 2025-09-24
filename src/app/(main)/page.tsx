import AvatarEvolution from '@/components/dashboard/avatar-evolution';
import CurrentWorld from '@/components/dashboard/current-world';
import ObjectivesSidebar from '@/components/dashboard/objectives-sidebar';
import { currentUser, levels, tasks, avatars } from '@/lib/data';

export default function DashboardPage() {
  const userLevel = levels.find(l => l.id === currentUser.level);
  if (!userLevel) {
    return <div>Error: Nivel de usuario no encontrado.</div>;
  }
  const levelTasks = tasks.filter(t => t.level === currentUser.level);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/3">
        <AvatarEvolution currentUser={currentUser} avatars={avatars} />
      </div>
      <div className="w-full lg:w-1/3">
        <CurrentWorld currentUser={currentUser} level={userLevel} />
      </div>
      <div className="w-full lg:w-1/3">
        <ObjectivesSidebar tasks={levelTasks} />
      </div>
    </div>
  );
}