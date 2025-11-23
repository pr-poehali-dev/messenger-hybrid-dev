import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import Sidebar from '@/components/Sidebar';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import Dialogs from '@/components/Dialogs';

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
  const [currentView, setCurrentView] = useState<'chats' | 'channels' | 'groups' | 'calls' | 'profile'>('chats');
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [callType, setCallType] = useState<'voice' | 'video'>('voice');
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Анна', content: 'Привет! Как проект продвигается?', time: '14:30', isOwn: false },
    { id: 2, sender: 'Вы', content: 'Отлично! Уже почти закончил дизайн', time: '14:31', isOwn: true },
    { id: 3, sender: 'Анна', content: 'Голосовое сообщение', time: '14:32', isOwn: false, hasVoice: true },
    { id: 4, sender: 'Вы', content: 'Супер! Сейчас послушаю 🎧', time: '14:33', isOwn: true },
  ]);

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

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'Вы',
        content: messageInput,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
      toast({ title: 'Сообщение отправлено' });
    }
  };

  const handleCall = (type: 'voice' | 'video') => {
    setCallType(type);
    setIsCallDialogOpen(true);
  };

  const handleAddContact = () => {
    toast({ title: 'Добавление контакта', description: 'Функция в разработке' });
  };

  const handleAttachment = () => {
    toast({ title: 'Прикрепить файл', description: 'Выберите файл для отправки' });
  };

  const handleVoiceRecord = () => {
    toast({ title: '🎤 Запись голосового', description: 'Удерживайте для записи' });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const currentChat = chats.find(chat => chat.id === selectedChat);

  return (
    <div className={`h-screen flex overflow-hidden ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <ChatList
        chats={chats}
        contacts={contacts}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleAddContact={handleAddContact}
      />

      <ChatWindow
        currentChat={currentChat}
        messages={messages}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        handleSendMessage={handleSendMessage}
        handleCall={handleCall}
        handleAttachment={handleAttachment}
        handleVoiceRecord={handleVoiceRecord}
        setIsSearchDialogOpen={setIsSearchDialogOpen}
      />

      <Dialogs
        isCallDialogOpen={isCallDialogOpen}
        setIsCallDialogOpen={setIsCallDialogOpen}
        callType={callType}
        currentChat={currentChat}
        isSearchDialogOpen={isSearchDialogOpen}
        setIsSearchDialogOpen={setIsSearchDialogOpen}
      />
    </div>
  );
};

export default Index;
