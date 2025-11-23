import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  type: 'chat' | 'channel' | 'group';
}

interface DialogsProps {
  isCallDialogOpen: boolean;
  setIsCallDialogOpen: (open: boolean) => void;
  callType: 'voice' | 'video';
  currentChat: Chat | undefined;
  isSearchDialogOpen: boolean;
  setIsSearchDialogOpen: (open: boolean) => void;
}

const Dialogs = ({
  isCallDialogOpen,
  setIsCallDialogOpen,
  callType,
  currentChat,
  isSearchDialogOpen,
  setIsSearchDialogOpen,
}: DialogsProps) => {
  return (
    <>
      <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {callType === 'video' ? '📹 Видеозвонок' : '📞 Голосовой звонок'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-4xl bg-gradient-to-br from-primary/20 to-secondary/20">
                {currentChat?.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-1">{currentChat?.name}</h3>
              <p className="text-sm text-muted-foreground">Звоним...</p>
            </div>
            <div className="flex gap-4">
              <Button 
                size="icon" 
                variant="destructive" 
                className="rounded-full h-14 w-14"
                onClick={() => {
                  setIsCallDialogOpen(false);
                  toast({ title: 'Звонок завершен' });
                }}
              >
                <Icon name="PhoneOff" size={24} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>🔍 Поиск в чате</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Поиск сообщений..." className="rounded-xl" />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Результаты:</p>
              <div className="text-center py-8 text-muted-foreground">
                Введите запрос для поиска
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dialogs;
