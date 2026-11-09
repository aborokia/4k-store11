/**
 * 4K STORE - Database & Google Authentication Service
 * 
 * This service manages user records, Google Sign-In authentication,
 * and data persistence. It supports both instant local database persistence
 * and can be seamlessly connected to Firebase / Supabase.
 */

const USERS_DB_KEY = '4k_store_users_database';
const CURRENT_USER_KEY = '4k_store_current_user';

// Initial preloaded registered users in the database
const INITIAL_USERS = [
  {
    id: "usr_google_10829148192837192",
    googleId: "10829148192837192",
    name: "سلطان الشمري",
    email: "sultan.gamer.99@gmail.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    role: "customer",
    joinedAt: "2026-10-15 14:20",
    ordersCount: 3,
    totalSpent: 175
  },
  {
    id: "usr_google_19847291048102948",
    googleId: "19847291048102948",
    name: "فيصل العتيبي",
    email: "faisal.alotaibi.dev@gmail.com",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    role: "customer",
    joinedAt: "2026-10-28 09:15",
    ordersCount: 2,
    totalSpent: 94
  },
  {
    id: "usr_google_admin_master_001",
    googleId: "11928471029384756",
    name: "أدمن 4K STORE الرئيسي",
    email: "admin@4kstore.me",
    avatar: "/logo.png",
    role: "admin",
    joinedAt: "2026-09-01 00:00",
    ordersCount: 12,
    totalSpent: 1250
  }
];

export const dbService = {
  // Get all registered users from database
  getUsers: () => {
    try {
      const data = localStorage.getItem(USERS_DB_KEY);
      return data ? JSON.parse(data) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  },

  // Save full users list
  saveUsers: (users) => {
    try {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    } catch (e) {
      console.error("Database save error:", e);
    }
  },

  // Find user by ID or Google ID
  getUserByGoogleId: (googleId) => {
    const users = dbService.getUsers();
    return users.find((u) => u.googleId === googleId);
  },

  // Register or update user via Google or Discord Sign-In
  upsertGoogleUser: (profile) => {
    const users = dbService.getUsers();
    const existingIndex = users.findIndex(
      (u) =>
        (profile.googleId && u.googleId === profile.googleId) ||
        (profile.discordId && u.discordId === profile.discordId) ||
        (profile.email && u.email.toLowerCase() === profile.email.toLowerCase())
    );

    const now = new Date();
    const formattedDate = now.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let updatedUser;

    if (existingIndex >= 0) {
      // Update existing user profile
      updatedUser = {
        ...users[existingIndex],
        name: profile.name || users[existingIndex].name,
        avatar: profile.avatar || users[existingIndex].avatar,
        provider: profile.provider || users[existingIndex].provider || 'google',
        discordId: profile.discordId || users[existingIndex].discordId,
        googleId: profile.googleId || users[existingIndex].googleId,
        lastLoginAt: formattedDate
      };
      users[existingIndex] = updatedUser;
    } else {
      // Create new user in the database
      const provider = profile.provider || (profile.discordId ? 'discord' : 'google');
      updatedUser = {
        id: `usr_${provider}_${Date.now()}`,
        googleId: profile.googleId || null,
        discordId: profile.discordId || null,
        provider: provider,
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${profile.email}`,
        role: "customer",
        joinedAt: formattedDate,
        lastLoginAt: formattedDate,
        ordersCount: 0,
        totalSpent: 0
      };
      users.unshift(updatedUser);
    }

    dbService.saveUsers(users);
    dbService.setCurrentUser(updatedUser);
    return updatedUser;
  },

  // Update stats when user places an order
  recordUserOrder: (userEmail, orderTotal) => {
    const users = dbService.getUsers();
    const updated = users.map((u) => {
      if (u.email === userEmail) {
        return {
          ...u,
          ordersCount: (u.ordersCount || 0) + 1,
          totalSpent: (u.totalSpent || 0) + Number(orderTotal)
        };
      }
      return u;
    });
    dbService.saveUsers(updated);

    // Update session current user if matching
    const current = dbService.getCurrentUser();
    if (current && current.email === userEmail) {
      dbService.setCurrentUser({
        ...current,
        ordersCount: (current.ordersCount || 0) + 1,
        totalSpent: (current.totalSpent || 0) + Number(orderTotal)
      });
    }
  },

  // Delete user from database
  deleteUser: (userId) => {
    const users = dbService.getUsers().filter((u) => u.id !== userId);
    dbService.saveUsers(users);
  },

  // Get current active logged-in user
  getCurrentUser: () => {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // Set current logged-in user
  setCurrentUser: (user) => {
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error("Session storage error:", e);
    }
  },

  // Sign out
  logout: () => {
    dbService.setCurrentUser(null);
  }
};
