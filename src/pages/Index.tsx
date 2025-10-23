import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface Note {
  id: string;
  title: string;
  content: string;
}

interface KanbanTask {
  id: string;
  title: string;
  column: 'todo' | 'in-progress' | 'done';
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Review project requirements', completed: false, priority: 'high' },
    { id: '2', text: 'Update documentation', completed: true, priority: 'medium' },
    { id: '3', text: 'Schedule team meeting', completed: false, priority: 'low' },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Quick Ideas', content: 'Implement dark mode toggle\nAdd export functionality' },
    { id: '2', title: 'Meeting Notes', content: 'Discuss Q4 goals with team' },
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);

  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>([
    { id: '1', title: 'Design new feature', column: 'todo' },
    { id: '2', title: 'Code review', column: 'in-progress' },
    { id: '3', title: 'Deploy to staging', column: 'done' },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Привет! Я ваш AI-ассистент. Чем могу помочь?', sender: 'ai' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { 
        id: Date.now().toString(), 
        text: newTodo, 
        completed: false, 
        priority: 'medium' 
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMsg: Message = { id: Date.now().toString(), text: newMessage, sender: 'user' };
      setMessages([...messages, userMsg]);
      
      setTimeout(() => {
        const aiMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          text: 'Я обработал ваш запрос. Могу помочь с организацией задач и заметок!', 
          sender: 'ai' 
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1000);
      
      setNewMessage('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex h-screen">
        <aside className="w-16 bg-card/50 backdrop-blur-xl border-r flex flex-col items-center py-6 gap-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Icon name="Layout" size={20} className="text-white" />
          </div>
          <nav className="flex flex-col gap-4">
            <button className="w-10 h-10 rounded-lg hover:bg-primary/10 flex items-center justify-center transition-colors text-primary">
              <Icon name="CheckSquare" size={20} />
            </button>
            <button className="w-10 h-10 rounded-lg hover:bg-primary/10 flex items-center justify-center transition-colors">
              <Icon name="StickyNote" size={20} />
            </button>
            <button className="w-10 h-10 rounded-lg hover:bg-primary/10 flex items-center justify-center transition-colors">
              <Icon name="Calendar" size={20} />
            </button>
            <button className="w-10 h-10 rounded-lg hover:bg-primary/10 flex items-center justify-center transition-colors">
              <Icon name="Kanban" size={20} />
            </button>
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <button className="w-10 h-10 rounded-lg hover:bg-primary/10 flex items-center justify-center transition-colors">
              <Icon name="Settings" size={20} />
            </button>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-card/50 backdrop-blur-xl border-b flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Productivity Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">Управляйте своими задачами эффективно</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input 
                  placeholder="Поиск..." 
                  className="pl-10 w-64 bg-background/50 backdrop-blur-sm"
                />
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
              <div className="col-span-12 lg:col-span-4">
                <Card className="p-6 bg-card/50 backdrop-blur-xl border-primary/10 shadow-xl shadow-primary/5 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Icon name="CheckSquare" size={16} className="text-white" />
                      </div>
                      <h2 className="text-xl font-semibold">Задачи</h2>
                    </div>
                    <Badge variant="secondary" className="rounded-full">
                      {todos.filter(t => !t.completed).length}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <Input 
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                      placeholder="Новая задача..."
                      className="flex-1"
                    />
                    <Button onClick={addTodo} size="icon" className="bg-gradient-to-r from-primary to-accent">
                      <Icon name="Plus" size={18} />
                    </Button>
                  </div>

                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {todos.map(todo => (
                        <div 
                          key={todo.id}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                        >
                          <Checkbox 
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodo(todo.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <p className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {todo.text}
                            </p>
                            <Badge className={`mt-1 text-xs ${getPriorityColor(todo.priority)}`}>
                              {todo.priority}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>

              <div className="col-span-12 lg:col-span-4">
                <Card className="p-6 bg-card/50 backdrop-blur-xl border-secondary/10 shadow-xl shadow-secondary/5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                        <Icon name="StickyNote" size={16} className="text-white" />
                      </div>
                      <h2 className="text-xl font-semibold">Заметки</h2>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icon name="Plus" size={18} />
                    </Button>
                  </div>

                  <Tabs defaultValue="0" className="w-full">
                    <TabsList className="w-full mb-4">
                      {notes.map((note, idx) => (
                        <TabsTrigger 
                          key={note.id} 
                          value={idx.toString()}
                          onClick={() => setSelectedNote(note)}
                          className="flex-1"
                        >
                          {note.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {notes.map((note, idx) => (
                      <TabsContent key={note.id} value={idx.toString()}>
                        <Textarea 
                          value={note.content}
                          onChange={(e) => {
                            const updated = notes.map(n => 
                              n.id === note.id ? { ...n, content: e.target.value } : n
                            );
                            setNotes(updated);
                          }}
                          className="min-h-[400px] font-mono text-sm"
                          placeholder="Начните писать..."
                        />
                      </TabsContent>
                    ))}
                  </Tabs>
                </Card>
              </div>

              <div className="col-span-12 lg:col-span-4">
                <Card className="p-6 bg-card/50 backdrop-blur-xl border-accent/10 shadow-xl shadow-accent/5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                        <Icon name="Kanban" size={16} className="text-white" />
                      </div>
                      <h2 className="text-xl font-semibold">Канбан</h2>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {(['todo', 'in-progress', 'done'] as const).map(column => (
                      <div key={column} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {column === 'todo' ? 'К выполнению' : column === 'in-progress' ? 'В работе' : 'Готово'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {kanbanTasks.filter(t => t.column === column).length}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {kanbanTasks.filter(t => t.column === column).map(task => (
                            <div 
                              key={task.id}
                              className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-move border border-border/50"
                            >
                              <p className="text-sm">{task.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>

        <div 
          className={`fixed bottom-6 right-6 transition-all duration-300 ${
            isChatOpen ? 'w-96 h-[600px]' : 'w-14 h-14'
          }`}
        >
          {!isChatOpen ? (
            <Button 
              onClick={() => setIsChatOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-accent to-secondary shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-110"
            >
              <Icon name="MessageCircle" size={24} />
            </Button>
          ) : (
            <Card className="w-full h-full bg-card/95 backdrop-blur-xl border-primary/20 shadow-2xl flex flex-col animate-scale-in">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Icon name="Bot" size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Ассистент</h3>
                    <p className="text-xs text-muted-foreground">Онлайн</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsChatOpen(false)}
                >
                  <Icon name="X" size={18} />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map(msg => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          msg.sender === 'user' 
                            ? 'bg-gradient-to-br from-primary to-accent text-white' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Сообщение..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-primary to-accent"
                  >
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
