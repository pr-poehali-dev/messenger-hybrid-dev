import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';

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

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const chats: Chat[] = [
    { id: 1, name: 'Анна Смирнова', avatar: '👩', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 3, online: true, type: 'chat' },
    { id: 2, name: 'Дизайн Команда', avatar: '🎨', lastMessage: 'Новый макет готов', time: '13:15', unread: 0, online: false, type: 'group' },
    { id: 3, name: 'Технологии 2024', avatar: '📱', lastMessage: 'Новый пост от admin', time: '12:00', unread: 5, online: false, type: 'channel' },
    { id: 4, name: 'Михаил Петров', avatar: '👨', lastMessage: 'Спасибо за помощь!', time: '11:45', unread: 0, online: true, type: 'chat' },
    { id: 5, name: 'Разработка', avatar: '💻', lastMessage: 'Созвон в 15:00', time: '10:30', unread: 1, online: false, type: 'group' },
  ];

  const contacts = [
    { id: 1, name: 'Анна Смирнова', avatar: '👩', status: 'онлайн', online: true },
    { id: 2, name: 'Михаил Петров', avatar: '👨', status: 'онлайн', online: true },
    { id: 3, name: 'Елена Козлова', avatar: '👩‍💼', status: 'была 2 часа назад', online: false },
    { id: 4, name: 'Дмитрий Иванов', avatar: '🧑‍💻', status: 'был вчера', online: false },
  ];

  const messages: Message[] = [
    { id: 1, sender: 'Анна', content: 'Привет! Как проект продвигается?', time: '14:30', isOwn: false },
    { id: 2, sender: 'Вы', content: 'Отлично! Уже почти закончил дизайн', time: '14:31', isOwn: true },
    { id: 3, sender: 'Анна', content: 'Голосовое сообщение', time: '14:32', isOwn: false, hasVoice: true },
    { id: 4, sender: 'Вы', content: 'Супер! Сейчас послушаю 🎧', time: '14:33', isOwn: true },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const currentChat = chats.find(chat => chat.id === selectedChat);

  return (
    <div className={`h-screen flex overflow-hidden ${darkMode ? 'dark' : ''}`}>
      <div className="w-20 bg-gradient-to-b from-primary to-secondary flex flex-col items-center py-6 gap-6">
        <div className="text-3xl mb-4 animate-scale-in">💬</div>
        
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-2xl">
          <Icon name="MessageSquare" size={24} />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/20 rounded-2xl">
          <Icon name="Radio" size={24} />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/20 rounded-2xl">
          <Icon name="Users" size={24} />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/20 rounded-2xl">
          <Icon name="Phone" size={24} />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/20 rounded-2xl">
          <Icon name="User" size={24} />
        </Button>

        <div className="mt-auto">
          <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/20 rounded-2xl" onClick={toggleDarkMode}>
            <Icon name={darkMode ? "Sun" : "Moon"} size={20} />
          </Button>
        </div>
      </div>

      <div className="w-96 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Чаты
            </h2>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10">
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
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-accent/10 hover:text-accent">
                  <Icon name="Search" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-accent/10 hover:text-accent">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-accent/10 hover:text-accent">
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
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-muted shrink-0">
                  <Icon name="Paperclip" size={20} />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Введите сообщение..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="pr-20 rounded-2xl border-border min-h-[44px]"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-muted">
                      <Icon name="Smile" size={18} />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-muted">
                      <Icon name="Mic" size={18} />
                    </Button>
                  </div>
                </div>

                <Button 
                  size="icon" 
                  className="rounded-full h-11 w-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shrink-0"
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
    </div>
  );
};

export default Index;
