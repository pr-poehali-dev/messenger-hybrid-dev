import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

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

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
  hasVoice?: boolean;
}

interface ChatWindowProps {
  currentChat: Chat | undefined;
  messages: Message[];
  messageInput: string;
  setMessageInput: (input: string) => void;
  handleSendMessage: () => void;
  handleCall: (type: 'voice' | 'video') => void;
  handleAttachment: () => void;
  handleVoiceRecord: () => void;
  setIsSearchDialogOpen: (open: boolean) => void;
}

const ChatWindow = ({
  currentChat,
  messages,
  messageInput,
  setMessageInput,
  handleSendMessage,
  handleCall,
  handleAttachment,
  handleVoiceRecord,
  setIsSearchDialogOpen,
}: ChatWindowProps) => {
  return (
    <div className="flex-1 flex flex-col bg-background">
      {currentChat && (
        <>
          <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  {currentChat.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{currentChat.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {currentChat.online ? '🟢 онлайн' : 'был(а) недавно'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full hover:bg-accent/10 hover:text-accent"
                onClick={() => setIsSearchDialogOpen(true)}
              >
                <Icon name="Search" size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full hover:bg-accent/10 hover:text-accent"
                onClick={() => handleCall('voice')}
              >
                <Icon name="Phone" size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full hover:bg-accent/10 hover:text-accent"
                onClick={() => handleCall('video')}
              >
                <Icon name="Video" size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-muted">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.isOwn
                          ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                          : 'bg-card border border-border'
                      }`}
                    >
                      {message.hasVoice ? (
                        <div className="flex items-center gap-3">
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/20">
                            <Icon name="Play" size={16} />
                          </Button>
                          <div className="flex-1 h-1 bg-white/30 rounded-full">
                            <div className="w-1/3 h-full bg-white rounded-full"></div>
                          </div>
                          <span className="text-xs">0:05</span>
                        </div>
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </div>
                    <span className={`text-xs text-muted-foreground mt-1 block ${message.isOwn ? 'text-right' : 'text-left'}`}>
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border bg-card/50 backdrop-blur">
            <div className="flex items-end gap-2 max-w-4xl mx-auto">
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full hover:bg-muted shrink-0"
                onClick={handleAttachment}
              >
                <Icon name="Paperclip" size={20} />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  placeholder="Введите сообщение..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="pr-20 rounded-2xl border-border min-h-[44px]"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-muted">
                    <Icon name="Smile" size={18} />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full hover:bg-muted"
                    onClick={handleVoiceRecord}
                  >
                    <Icon name="Mic" size={18} />
                  </Button>
                </div>
              </div>

              <Button 
                size="icon" 
                className="rounded-full h-11 w-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shrink-0"
                onClick={handleSendMessage}
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Lock" size={12} />
                <span>Шифрование включено</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Bot" size={12} />
                <span>Боты доступны</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
