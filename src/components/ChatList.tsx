import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
}

interface ChatListProps {
  chats: Chat[];
  contacts: Contact[];
  selectedChat: number;
  setSelectedChat: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleAddContact: () => void;
}

const ChatList = ({
  chats,
  contacts,
  selectedChat,
  setSelectedChat,
  searchQuery,
  setSearchQuery,
  handleAddContact,
}: ChatListProps) => {
  return (
    <div className="w-96 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Чаты
          </h2>
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full hover:bg-primary/10"
            onClick={handleAddContact}
          >
            <Icon name="Plus" size={20} />
          </Button>
        </div>
        
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Поиск..." 
            className="pl-10 rounded-xl border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b px-4">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Все
          </TabsTrigger>
          <TabsTrigger value="channels" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Каналы
          </TabsTrigger>
          <TabsTrigger value="groups" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Группы
          </TabsTrigger>
          <TabsTrigger value="contacts" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Контакты
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all hover:bg-muted animate-fade-in ${
                    selectedChat === chat.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <Badge className="ml-2 bg-primary text-primary-foreground rounded-full h-5 min-w-[20px] px-1.5">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="channels" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-2">
              {chats.filter(c => c.type === 'channel').map((chat) => (
                <div key={chat.id} className="p-3 rounded-xl hover:bg-muted cursor-pointer animate-fade-in">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-accent/20 to-accent/40">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{chat.name}</h3>
                      <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="groups" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-2">
              {chats.filter(c => c.type === 'group').map((chat) => (
                <div key={chat.id} className="p-3 rounded-xl hover:bg-muted cursor-pointer animate-fade-in">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-secondary/20 to-secondary/40">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{chat.name}</h3>
                      <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="contacts" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-2">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-3 rounded-xl hover:bg-muted cursor-pointer animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                          {contact.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatList;
