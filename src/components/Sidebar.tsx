import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  currentView: 'chats' | 'channels' | 'groups' | 'calls' | 'profile';
  setCurrentView: (view: 'chats' | 'channels' | 'groups' | 'calls' | 'profile') => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar = ({ currentView, setCurrentView, darkMode, toggleDarkMode }: SidebarProps) => {
  return (
    <div className="w-20 bg-gradient-to-b from-primary to-secondary flex flex-col items-center py-6 gap-6">
      <div className="text-3xl mb-4 animate-scale-in">💬</div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={`rounded-2xl ${currentView === 'chats' ? 'text-white bg-white/20' : 'text-white/70 hover:bg-white/20'}`}
        onClick={() => setCurrentView('chats')}
      >
        <Icon name="MessageSquare" size={24} />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={`rounded-2xl ${currentView === 'channels' ? 'text-white bg-white/20' : 'text-white/70 hover:bg-white/20'}`}
        onClick={() => setCurrentView('channels')}
      >
        <Icon name="Radio" size={24} />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={`rounded-2xl ${currentView === 'groups' ? 'text-white bg-white/20' : 'text-white/70 hover:bg-white/20'}`}
        onClick={() => setCurrentView('groups')}
      >
        <Icon name="Users" size={24} />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={`rounded-2xl ${currentView === 'calls' ? 'text-white bg-white/20' : 'text-white/70 hover:bg-white/20'}`}
        onClick={() => setCurrentView('calls')}
      >
        <Icon name="Phone" size={24} />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={`rounded-2xl ${currentView === 'profile' ? 'text-white bg-white/20' : 'text-white/70 hover:bg-white/20'}`}
        onClick={() => setCurrentView('profile')}
      >
        <Icon name="User" size={24} />
      </Button>

      <div className="mt-auto">
        <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/20 rounded-2xl" onClick={toggleDarkMode}>
          <Icon name={darkMode ? "Sun" : "Moon"} size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
