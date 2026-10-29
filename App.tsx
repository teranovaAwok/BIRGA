import { useState, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  Users,
  Bell,
  Video,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Clock,
  Star,
  Menu,
  X,
  GraduationCap,
  MessageCircle,
  Award,
  ArrowRight,
  Play,
  Heart,
  User,
  LogOut,
  Settings,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Home,
  BookMarked,
  UserCircle,
  BarChart3,
  Trash2,
  Edit3,
  Save
} from 'lucide-react';

// Types
interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'parent' | 'teacher' | 'student';
  childClass?: string;
  childName?: string;
  avatar?: string;
  joinDate: string;
}

interface WebinarRegistration {
  webinarId: number;
  registeredAt: string;
}

// Helper functions for localStorage
const getStoredUsers = (): UserData[] => {
  const data = localStorage.getItem('birga_users');
  return data ? JSON.parse(data) : [];
};

const saveUsers = (users: UserData[]) => {
  localStorage.setItem('birga_users', JSON.stringify(users));
};

const getCurrentUser = (): UserData | null => {
  const data = localStorage.getItem('birga_current_user');
  return data ? JSON.parse(data) : null;
};

const saveCurrentUser = (user: UserData | null) => {
  if (user) {
    localStorage.setItem('birga_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('birga_current_user');
  }
};

const getRegistrations = (): WebinarRegistration[] => {
  const data = localStorage.getItem('birga_registrations');
  return data ? JSON.parse(data) : [];
};

const saveRegistrations = (regs: WebinarRegistration[]) => {
  localStorage.setItem('birga_registrations', JSON.stringify(regs));
};

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const icon = type === 'success' ? <CheckCircle className="w-5 h-5" /> : type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Bell className="w-5 h-5" />;

  return (
    <div className={`fixed top-20 right-4 z-[100] ${bgColor} text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in`}>
      {icon}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Navbar Component
function Navbar({ currentUser, onLogin, onLogout, onNavigate, currentPage }: {
  currentUser: UserData | null;
  onLogin: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BIRGA
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className={`font-medium transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Bosh sahifa</button>
            <button onClick={() => onNavigate('webinars')} className={`font-medium transition-colors ${currentPage === 'webinars' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Vebinarlar</button>
            <button onClick={() => onNavigate('announcements')} className={`font-medium transition-colors ${currentPage === 'announcements' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>E'lonlar</button>
            <button onClick={() => onNavigate('news')} className={`font-medium transition-colors ${currentPage === 'news' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Yangiliklar</button>
            <button onClick={() => onNavigate('contact')} className={`font-medium transition-colors ${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Aloqa</button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
                >
                  <UserCircle className="w-5 h-5" />
                  {currentUser.name.split(' ')[0]}
                </button>
                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-red-500 transition-colors p-2"
                  title="Chiqish"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
              >
                Kirish
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col gap-3 pt-4">
              <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 text-left">Bosh sahifa</button>
              <button onClick={() => { onNavigate('webinars'); setIsOpen(false); }} className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 text-left">Vebinarlar</button>
              <button onClick={() => { onNavigate('announcements'); setIsOpen(false); }} className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 text-left">E'lonlar</button>
              <button onClick={() => { onNavigate('news'); setIsOpen(false); }} className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 text-left">Yangiliklar</button>
              <button onClick={() => { onNavigate('contact'); setIsOpen(false); }} className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 text-left">Aloqa</button>
              {currentUser ? (
                <>
                  <button onClick={() => { onNavigate('dashboard'); setIsOpen(false); }} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium">
                    Dashboard
                  </button>
                  <button onClick={() => { onLogout(); setIsOpen(false); }} className="text-red-500 font-medium px-2 py-1 text-left">Chiqish</button>
                </>
              ) : (
                <button onClick={() => { onLogin(); setIsOpen(false); }} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium">
                  Kirish
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Login Page
function LoginPage({ onLogin, onSwitchToRegister, showToast }: {
  onLogin: (user: UserData) => void;
  onSwitchToRegister: () => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const users = getStoredUsers();
      const user = users.find(u => u.email === email);

      if (!user) {
        showToast('Bu email bilan ro\'yxatdan o\'tilmagan!', 'error');
        setLoading(false);
        return;
      }

      // Simple password check (in real app, use backend)
      const storedPassword = localStorage.getItem(`birga_pass_${user.id}`);
      if (storedPassword !== password) {
        showToast('Parol noto\'g\'ri!', 'error');
        setLoading(false);
        return;
      }

      showToast('Muvaffaqiyatli kirdingiz!', 'success');
      onLogin(user);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Xush kelibsiz!</h1>
          <p className="text-gray-600 mt-2">BIRGA platformasiga kiring</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email manzil</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Kirish <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Hisobingiz yo'qmi?{' '}
              <button onClick={onSwitchToRegister} className="text-blue-600 font-semibold hover:underline">
                Ro'yxatdan o'ting
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Lock icon (since lucide doesn't have it by default name)
function Lock({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}

// Register Page
function RegisterPage({ onRegister, onSwitchToLogin, showToast }: {
  onRegister: (user: UserData) => void;
  onSwitchToLogin: () => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'parent' | 'teacher' | 'student'>('parent');
  const [childName, setChildName] = useState('');
  const [childClass, setChildClass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (password !== confirmPassword) {
        showToast('Parollar mos kelmadi!', 'error');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        showToast('Parol kamida 6 ta belgidan iborat bo\'lishi kerak!', 'error');
        setLoading(false);
        return;
      }

      const users = getStoredUsers();
      if (users.find(u => u.email === email)) {
        showToast('Bu email allaqachon ro\'yxatdan o\'tgan!', 'error');
        setLoading(false);
        return;
      }

      const newUser: UserData = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        role,
        childName: role === 'parent' ? childName : undefined,
        childClass: role === 'parent' ? childClass : undefined,
        joinDate: new Date().toLocaleDateString('uz-UZ'),
      };

      users.push(newUser);
      saveUsers(users);
      localStorage.setItem(`birga_pass_${newUser.id}`, password);

      showToast('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!', 'success');
      onRegister(newUser);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Ro'yxatdan o'tish</h1>
          <p className="text-gray-600 mt-2">BIRGA oilasiga qo'shiling</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Siz kimsiz?</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'parent', label: 'Ota-ona', icon: '👨‍👩‍👧' },
                  { value: 'teacher', label: 'O\'qituvchi', icon: '👩‍🏫' },
                  { value: 'student', label: 'O\'quvchi', icon: '🎓' },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value as any)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      role === r.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{r.icon}</div>
                    <div className="text-xs font-medium">{r.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To'liq ism</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ismingiz va familiyangiz"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 __ ___ __ __"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            {role === 'parent' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farzandingizning ismi</label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Farzandingiz ismi"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farzandingizning sinfi</label>
                  <select
                    value={childClass}
                    onChange={(e) => setChildClass(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="">Sinfini tanlang</option>
                    {Array.from({ length: 11 }, (_, i) => (
                      <option key={i + 1} value={`${i + 1}-sinf`}>{i + 1}-sinf</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kamida 6 ta belgi"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parolni tasdiqlang</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Parolni qaytaring"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Ro'yxatdan o'tish <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Hisobingiz bormi?{' '}
              <button onClick={onSwitchToLogin} className="text-blue-600 font-semibold hover:underline">
                Kiring
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ user, onNavigate, showToast }: {
  user: UserData;
  onNavigate: (page: string) => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [registrations, setRegistrations] = useState<WebinarRegistration[]>(getRegistrations());
  const [editingProfile, setEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);

  const webinars = [
    { id: 1, title: "Farzandingizning darslarga motivatsiyasini qanday oshirish mumkin?", speaker: "Dilnoza Karimova", date: "2026-yil 15-yanvar", time: "18:00", category: "Psixologiya", color: "blue" },
    { id: 2, title: "Onlayn ta'lim: foydali tomonlari va xavflari", speaker: "Akmal Raximov", date: "2026-yil 20-yanvar", time: "19:00", category: "Ta'lim", color: "purple" },
    { id: 3, title: "Bolalar sog'lom ovqatlanishi haqida", speaker: "Nodira Usmonova", date: "2026-yil 25-yanvar", time: "17:00", category: "Salomatlik", color: "green" },
    { id: 4, title: "Imtihonlarga tayyorgarlik: ota-ona yordami", speaker: "Sherzod Toshmatov", date: "2026-yil 28-yanvar", time: "18:30", category: "Ta'lim", color: "orange" },
    { id: 5, title: "Bolalar xavfsizligi internetda", speaker: "Malika Abdullayeva", date: "2026-yil 2-fevral", time: "19:00", category: "Xavfsizlik", color: "red" },
    { id: 6, title: "Oilaviy tarbiya: zamonaviy yondashuvlar", speaker: "Gulnora Mirzo", date: "2026-yil 5-fevral", time: "18:00", category: "Psixologiya", color: "teal" },
  ];

  const myWebinars = webinars.filter(w => registrations.some(r => r.webinarId === w.id));

  const handleSaveProfile = () => {
    const users = getStoredUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx].name = editName;
      users[idx].phone = editPhone;
      saveUsers(users);
      saveCurrentUser(users[idx]);
      setEditingProfile(false);
      showToast('Profil muvaffaqiyatli yangilandi!', 'success');
    }
  };

  const handleCancelRegistration = (webinarId: number) => {
    const updated = registrations.filter(r => r.webinarId !== webinarId);
    setRegistrations(updated);
    saveRegistrations(updated);
    showToast('Vebinardan bekor qilindi', 'info');
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'parent': return 'Ota-ona';
      case 'teacher': return 'O\'qituvchi';
      case 'student': return 'O\'quvchi';
      default: return role;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Umumiy', icon: <Home className="w-4 h-4" /> },
    { id: 'webinars', label: 'Vebinarlarim', icon: <Video className="w-4 h-4" /> },
    { id: 'announcements', label: 'E\'lonlar', icon: <Bell className="w-4 h-4" /> },
    { id: 'profile', label: 'Profil', icon: <UserCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Salom, {user.name.split(' ')[0]}!</h1>
                <p className="text-blue-100 mt-1">{getRoleLabel(user.role)} • BIRGA a'zosi</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                <div className="text-2xl font-bold">{myWebinars.length}</div>
                <div className="text-xs text-blue-100">Vebinarlar</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                <div className="text-2xl font-bold">{registrations.length}</div>
                <div className="text-xs text-blue-100">Yozilgan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Video className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">Vebinarlar</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">{webinars.length}</p>
              <p className="text-sm text-gray-500 mt-1">Mavjud vebinarlar</p>
              <button
                onClick={() => { setActiveTab('webinars'); }}
                className="mt-4 text-blue-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Ko'rish <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900">E'lonlar</h3>
              </div>
              <p className="text-3xl font-bold text-purple-600">5</p>
              <p className="text-sm text-gray-500 mt-1">Yangi e'lonlar</p>
              <button
                onClick={() => { setActiveTab('announcements'); }}
                className="mt-4 text-purple-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Ko'rish <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900">Yozilganlar</h3>
              </div>
              <p className="text-3xl font-bold text-green-600">{registrations.length}</p>
              <p className="text-sm text-gray-500 mt-1">Vebinarlarga yozilgan</p>
              <button
                onClick={() => { setActiveTab('webinars'); }}
                className="mt-4 text-green-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Boshqarish <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Recent Activity */}
            <div className="md:col-span-2 lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg mb-4">So'nggi faoliyat</h3>
              {registrations.length === 0 ? (
                <div className="text-center py-8">
                  <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Hali vebinarlarga yozilmagansiz</p>
                  <button
                    onClick={() => onNavigate('webinars')}
                    className="mt-3 text-blue-600 font-medium hover:underline"
                  >
                    Vebinarlarni ko'rish →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {registrations.slice(0, 3).map((reg) => {
                    const webinar = webinars.find(w => w.id === reg.webinarId);
                    if (!webinar) return null;
                    return (
                      <div key={reg.webinarId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{webinar.title}</p>
                          <p className="text-xs text-gray-500">{webinar.date} • {webinar.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'webinars' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mening vebinarlarim</h2>
            {myWebinars.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hali vebinarlarga yozilmagansiz</h3>
                <p className="text-gray-500 mb-4">Vebinarlar sahifasiga o'ting va qiziqarli vebinarlarga yoziling</p>
                <button
                  onClick={() => onNavigate('webinars')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Vebinarlarni ko'rish
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {myWebinars.map((webinar) => (
                  <div key={webinar.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {webinar.category}
                      </span>
                      <button
                        onClick={() => handleCancelRegistration(webinar.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                        title="Bekor qilish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{webinar.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">👤 {webinar.speaker}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{webinar.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{webinar.time}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Ro'yxatdan o'tgan
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Available webinars */}
            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-10">Barcha vebinarlar</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {webinars.filter(w => !registrations.some(r => r.webinarId === w.id)).map((webinar) => (
                <div key={webinar.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {webinar.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-3 mb-2 text-sm">{webinar.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">👤 {webinar.speaker}</p>
                  <p className="text-xs text-gray-500 mb-3">📅 {webinar.date} • ⏰ {webinar.time}</p>
                  <button
                    onClick={() => {
                      const newReg = { webinarId: webinar.id, registeredAt: new Date().toISOString() };
                      const updated = [...registrations, newReg];
                      setRegistrations(updated);
                      saveRegistrations(updated);
                      showToast('Vebinarga muvaffaqiyatli yozildingiz!', 'success');
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl font-medium text-sm hover:shadow-lg transition-all"
                  >
                    Yozilish
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">E'lonlar</h2>
            <div className="space-y-4">
              {[
                { id: 1, title: "Ota-onalar yig'ilishi", description: "Hurmatli ota-onalar! 20-yanvar kuni soat 17:00 da maktabimizda ota-onalar yig'ilishi bo'lib o'tadi.", date: "2026-yil 10-yanvar", priority: "muhim" },
                { id: 2, title: "Qishki ta'til jadvali", description: "Qishki ta'til 25-dekabr dan 10-yanvargacha davom etadi.", date: "2026-yil 8-yanvar", priority: "oddiy" },
                { id: 3, title: "Matematika olimpiadasi", description: "Maktablararo matematika olimpiadasi 5-fevral kuni bo'lib o'tadi.", date: "2026-yil 5-yanvar", priority: "muhim" },
                { id: 4, title: "Yangi kutubxona ochilishi", description: "Maktabimizda zamonaviy kutubxona ochildi. 5000 dan ortiq kitob mavjud.", date: "2026-yil 3-yanvar", priority: "yangilik" },
                { id: 5, title: "Sport musobaqalari", description: "Maktab ichki sport musobaqalari boshlandi.", date: "2026-yil 1-yanvar", priority: "oddiy" },
              ].map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        item.priority === 'muhim' ? 'bg-red-100 text-red-700' :
                        item.priority === 'yangilik' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {item.priority === 'muhim' ? '🔴 Muhim' : item.priority === 'yangilik' ? '🟢 Yangilik' : '🔵 Oddiy'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profil ma'lumotlari</h2>
                {!editingProfile ? (
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
                  >
                    <Edit3 className="w-4 h-4" /> Tahrirlash
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProfile(false)}
                      className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      Bekor qilish
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Save className="w-3.5 h-3.5" /> Saqlash
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                  <p className="text-gray-500">{getRoleLabel(user.role)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">To'liq ism</label>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Telefon</label>
                  {editingProfile ? (
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Rol</label>
                  <p className="text-gray-900 font-medium">{getRoleLabel(user.role)}</p>
                </div>
                {user.childName && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Farzand</label>
                    <p className="text-gray-900 font-medium">{user.childName} • {user.childClass}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">A'zo bo'lgan sana</label>
                  <p className="text-gray-900 font-medium">{user.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hero Section
function HeroSection({ onNavigate, currentUser }: { onNavigate: (page: string) => void; currentUser: UserData | null }) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">O'zbekiston maktablari uchun yagona platforma</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BIRGA</span> — Ta'limda birlik
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Ota-onalar, o'qituvchilar va o'quvchilar uchun yagona platforma. Vebinarlar, e'lonlar, yangiliklar va ko'proq imkoniyatlar bir joyda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('webinars')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Video className="w-5 h-5" />
              Vebinarlarni ko'rish
            </button>
            {!currentUser && (
              <button
                onClick={() => onNavigate('register')}
                className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all inline-flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                Ro'yxatdan o'tish
              </button>
            )}
            {currentUser && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all inline-flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600 text-sm mt-1">Ota-onalar</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600 text-sm mt-1">Vebinarlar</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-pink-600">100+</div>
              <div className="text-gray-600 text-sm mt-1">O'qituvchilar</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600">1000+</div>
              <div className="text-gray-600 text-sm mt-1">O'quvchilar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Webinars Page (standalone)
function WebinarsPage({ currentUser, onNavigate, showToast }: {
  currentUser: UserData | null;
  onNavigate: (page: string) => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}) {
  const [registrations, setRegistrations] = useState<WebinarRegistration[]>(getRegistrations());

  const webinars = [
    { id: 1, title: "Farzandingizning darslarga motivatsiyasini qanday oshirish mumkin?", speaker: "Dilnoza Karimova", role: "Psixolog", date: "2026-yil 15-yanvar", time: "18:00", duration: "60 daqiqa", category: "Psixologiya", color: "blue", registered: 156, isLive: false },
    { id: 2, title: "Onlayn ta'lim: foydali tomonlari va xavflari", speaker: "Akmal Raximov", role: "Ta'lim mutaxassisi", date: "2026-yil 20-yanvar", time: "19:00", duration: "90 daqiqa", category: "Ta'lim", color: "purple", registered: 203, isLive: true },
    { id: 3, title: "Bolalar sog'lom ovqatlanishi haqida", speaker: "Nodira Usmonova", role: "Dietolog", date: "2026-yil 25-yanvar", time: "17:00", duration: "45 daqiqa", category: "Salomatlik", color: "green", registered: 89, isLive: false },
    { id: 4, title: "Imtihonlarga tayyorgarlik: ota-ona yordami", speaker: "Sherzod Toshmatov", role: "O'qituvchi", date: "2026-yil 28-yanvar", time: "18:30", duration: "75 daqiqa", category: "Ta'lim", color: "orange", registered: 134, isLive: false },
    { id: 5, title: "Bolalar xavfsizligi internetda", speaker: "Malika Abdullayeva", role: "IT xavfsizlik mutaxassisi", date: "2026-yil 2-fevral", time: "19:00", duration: "60 daqiqa", category: "Xavfsizlik", color: "red", registered: 178, isLive: false },
    { id: 6, title: "Oilaviy tarbiya: zamonaviy yondashuvlar", speaker: "Gulnora Mirzo", role: "Oilaviy psixolog", date: "2026-yil 5-fevral", time: "18:00", duration: "60 daqiqa", category: "Psixologiya", color: "teal", registered: 221, isLive: false },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
      green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
      red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200' },
    };
    return colors[color] || colors.blue;
  };

  const handleRegister = (webinarId: number) => {
    if (!currentUser) {
      showToast('Avval ro\'yxatdan o\'ting!', 'error');
      onNavigate('register');
      return;
    }
    const newReg = { webinarId, registeredAt: new Date().toISOString() };
    const updated = [...registrations, newReg];
    setRegistrations(updated);
    saveRegistrations(updated);
    showToast('Vebinarga muvaffaqiyatli yozildingiz!', 'success');
  };

  const handleCancel = (webinarId: number) => {
    const updated = registrations.filter(r => r.webinarId !== webinarId);
    setRegistrations(updated);
    saveRegistrations(updated);
    showToast('Vebinardan bekor qilindi', 'info');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Video className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Vebinarlar</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ota-onalar uchun vebinarlar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Farzandingizning ta'limi va tarbiyasi haqida mutaxassislardan bilib oling
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinars.map((webinar) => {
            const colorClasses = getColorClasses(webinar.color);
            const isRegistered = registrations.some(r => r.webinarId === webinar.id);
            return (
              <div key={webinar.id} className={`bg-white rounded-2xl border-2 ${colorClasses.border} p-6 hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden`}>
                {webinar.isLive && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    JONLI
                  </div>
                )}
                <div className={`inline-flex items-center gap-1 ${colorClasses.bg} ${colorClasses.text} text-xs font-semibold px-3 py-1 rounded-full mb-4`}>
                  {webinar.category}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {webinar.title}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{webinar.speaker}</p>
                    <p className="text-xs text-gray-500">{webinar.role}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {webinar.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {webinar.time} • {webinar.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    {webinar.registered} kishi ro'yxatdan o'tgan
                  </div>
                </div>
                {isRegistered ? (
                  <div className="space-y-2">
                    <div className="w-full bg-green-100 text-green-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Yozilgan
                    </div>
                    <button
                      onClick={() => handleCancel(webinar.id)}
                      className="w-full text-red-500 py-2 rounded-xl font-medium text-sm hover:bg-red-50 transition-all"
                    >
                      Bekor qilish
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRegister(webinar.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {webinar.isLive ? (
                      <><Play className="w-4 h-4" /> Hozir qo'shilish</>
                    ) : (
                      <>Ro'yxatdan o'tish <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Announcements Page
function AnnouncementsPage() {
  const announcements = [
    { id: 1, title: "Ota-onalar yig'ilishi", description: "Hurmatli ota-onalar! 20-yanvar kuni soat 17:00 da maktabimizda ota-onalar yig'ilishi bo'lib o'tadi. Barchangizni taklif etamiz.", date: "2026-yil 10-yanvar", priority: "muhim", icon: "users" },
    { id: 2, title: "Qishki ta'til jadvali", description: "Qishki ta'til 25-dekabr dan 10-yanvargacha davom etadi. Darslar 11-yanvardan boshlanadi.", date: "2026-yil 8-yanvar", priority: "oddiy", icon: "calendar" },
    { id: 3, title: "Matematika olimpiadasi", description: "Maktablararo matematika olimpiadasi 5-fevral kuni bo'lib o'tadi. Ro'yxatdan o'tish 25-yanvargacha.", date: "2026-yil 5-yanvar", priority: "muhim", icon: "award" },
    { id: 4, title: "Yangi kutubxona ochilishi", description: "Maktabimizda zamonaviy kutubxona ochildi. 5000 dan ortiq kitob mavjud. O'quvchilar har kuni foydalanishi mumkin.", date: "2026-yil 3-yanvar", priority: "yangilik", icon: "book" },
    { id: 5, title: "Sport musobaqalari", description: "Maktab ichki sport musobaqalari boshlandi. Futbol, voleybol va basketbol bo'yicha ishtirok etishingiz mumkin.", date: "2026-yil 1-yanvar", priority: "oddiy", icon: "star" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'muhim': return 'bg-red-100 text-red-700 border-red-200';
      case 'yangilik': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'users': return <Users className="w-5 h-5" />;
      case 'calendar': return <Calendar className="w-5 h-5" />;
      case 'award': return <Award className="w-5 h-5" />;
      case 'book': return <BookOpen className="w-5 h-5" />;
      case 'star': return <Star className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
            <Bell className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">E'lonlar</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">So'nggi e'lonlar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Maktab hayotidagi muhim yangiliklar va e'lonlar</p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {announcements.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                  {getIcon(item.icon)}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getPriorityColor(item.priority)}`}>
                    {item.priority === 'muhim' ? '🔴 Muhim' : item.priority === 'yangilik' ? '🟢 Yangilik' : '🔵 Oddiy'}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// News Page
function NewsPage() {
  const news = [
    { id: 1, title: "Maktabimiz respublika olimpiadasida 1-o'rinni egalladi!", excerpt: "Matematika fanidan respublika olimpiadasida o'quvchilarimiz a'lo natija ko'rsatdi...", date: "2026-yil 12-yanvar", image: "🏆" },
    { id: 2, title: "Yangi kompyuter sinfi ochildi", excerpt: "Zamonaviy kompyuterlar va texnologiyalar bilan jihozlangan yangi sinf o'quvchilar xizmatida...", date: "2026-yil 9-yanvar", image: "💻" },
    { id: 3, title: "Ekologiya haftaligi muvaffaqiyatli o'tdi", excerpt: "Bir hafta davomida o'tkazilgan tadbirlar o'quvchilarda ekologik madaniyatni shakllantirdi...", date: "2026-yil 6-yanvar", image: "🌿" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Yangiliklar</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Maktab yangiliklari</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Maktabimizdagi so'nggi voqealar va yutuqlar</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex items-center justify-center">
                <span className="text-6xl">{item.image}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
                <a href="#" className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Batafsil o'qish <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Page
function ContactPage({ showToast }: { showToast: (msg: string, type: 'success' | 'error' | 'info') => void }) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Barcha maydonlarni to\'ldiring!', 'error');
      return;
    }
    showToast('Xabaringiz muvaffaqiyatli yuborildi!', 'success');
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
            <Phone className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Aloqa</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Biz bilan bog'laning</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Savollaringiz bo'lsa, biz bilan bog'laning</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Telefon</h3>
                <p className="text-gray-600">+998 71 123 45 67</p>
                <p className="text-gray-600">+998 90 987 65 43</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">info@birga.uz</p>
                <p className="text-gray-600">support@birga.uz</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Manzil</h3>
                <p className="text-gray-600">Toshkent shahri, Chilonzor tumani</p>
                <p className="text-gray-600">12-maktab binosi, 3-qavat</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Ish vaqti</h3>
                <p className="text-gray-600">Dushanba - Juma: 08:00 - 18:00</p>
                <p className="text-gray-600">Shanba: 09:00 - 14:00</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Xabar yuborish</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ismingiz</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ismingizni kiriting"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqamingiz</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+998 __ ___ __ __"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xabaringiz</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Xabaringizni yozing..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Yuborish
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">BIRGA</span>
            </div>
            <p className="text-gray-400 max-w-md mb-4">
              Maktab, ota-onalar va o'quvchilar uchun yagona raqamli platforma. Ta'limda birlik va hamkorlik uchun BIRGA!
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Sahifalar</h3>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white transition-colors">Bosh sahifa</button></li>
              <li><button onClick={() => onNavigate('webinars')} className="text-gray-400 hover:text-white transition-colors">Vebinarlar</button></li>
              <li><button onClick={() => onNavigate('announcements')} className="text-gray-400 hover:text-white transition-colors">E'lonlar</button></li>
              <li><button onClick={() => onNavigate('news')} className="text-gray-400 hover:text-white transition-colors">Yangiliklar</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Qo'shimcha</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Biz haqimizda</a></li>
              <li><button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition-colors">Aloqa</button></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Yordam</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Maxfiylik siyosati</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 BIRGA. Barcha huquqlar himoyalangan.</p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> in O'zbekiston
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState<UserData | null>(getCurrentUser());
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: UserData) => {
    setCurrentUser(user);
    saveCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleRegister = (user: UserData) => {
    setCurrentUser(user);
    saveCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveCurrentUser(null);
    setCurrentPage('home');
    showToast('Tizimdan chiqdingiz', 'info');
  };

  // If on login/register page, show only that
  if (currentPage === 'login') {
    return (
      <>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <LoginPage
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentPage('register')}
          showToast={showToast}
        />
      </>
    );
  }

  if (currentPage === 'register') {
    return (
      <>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <RegisterPage
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentPage('login')}
          showToast={showToast}
        />
      </>
    );
  }

  // Dashboard page
  if (currentPage === 'dashboard') {
    if (!currentUser) {
      setCurrentPage('login');
      return null;
    }
    return (
      <>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <Navbar
          currentUser={currentUser}
          onLogin={() => setCurrentPage('login')}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
        <Dashboard user={currentUser} onNavigate={handleNavigate} showToast={showToast} />
        <Footer onNavigate={handleNavigate} />
      </>
    );
  }

  // Regular pages
  return (
    <div className="min-h-screen bg-white font-sans">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Navbar
        currentUser={currentUser}
        onLogin={() => setCurrentPage('login')}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {currentPage === 'home' && <HeroSection onNavigate={handleNavigate} currentUser={currentUser} />}
      {currentPage === 'webinars' && <WebinarsPage currentUser={currentUser} onNavigate={handleNavigate} showToast={showToast} />}
      {currentPage === 'announcements' && <AnnouncementsPage />}
      {currentPage === 'news' && <NewsPage />}
      {currentPage === 'contact' && <ContactPage showToast={showToast} />}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
