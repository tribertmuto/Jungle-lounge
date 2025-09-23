import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { apiClient, User, Post } from "../lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [authForm, setAuthForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Test API health
      await apiClient.healthCheck();
      
      // Load posts
      const postsData = await apiClient.getPosts();
      setPosts(postsData.posts);
      
      // Try to load user profile (will fail if not authenticated)
      try {
        const profile = await apiClient.getProfile();
        setUser(profile.user);
      } catch (err) {
        // User not authenticated, that's okay
        setUser(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (isRegister: boolean) => {
    try {
      setError(null);
      
      if (isRegister) {
        await apiClient.register(authForm.username, authForm.email, authForm.password);
      } else {
        await apiClient.login(authForm.username, authForm.password);
      }
      
      // Reload data after successful auth
      await loadData();
      setShowLogin(false);
      setShowRegister(false);
      setAuthForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
  };

  const handleLogout = () => {
    apiClient.logout();
    setUser(null);
    loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
        <Image
          className="dark:invert"
          src="/next.svg"
                alt="Jungle Light"
                width={120}
                height={25}
          priority
        />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Jungle Light
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Welcome, {user.username}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
        </div>
        )}

        {/* Auth Modals */}
        {(showLogin || showRegister) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                {showLogin ? "Login" : "Register"}
              </h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={authForm.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthForm({ ...authForm, username: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
                
                {showRegister && (
                  <input
                    type="email"
                    placeholder="Email"
                    value={authForm.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthForm({ ...authForm, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                )}
                
                <input
                  type="password"
                  placeholder="Password"
                  value={authForm.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAuth(showRegister)}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {showLogin ? "Login" : "Register"}
                  </button>
                  <button
                    onClick={() => {
                      setShowLogin(false);
                      setShowRegister(false);
                      setAuthForm({ username: "", email: "", password: "" });
                    }}
                    className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* API Status */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  🚀 Backend Status
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                    <h3 className="font-semibold text-green-800 dark:text-green-200">API Server</h3>
                    <p className="text-green-600 dark:text-green-300">✅ Running</p>
                  </div>
                  <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200">Database</h3>
                    <p className="text-blue-600 dark:text-blue-300">✅ SQLite Connected</p>
                  </div>
                  <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <h3 className="font-semibold text-purple-800 dark:text-purple-200">Authentication</h3>
                    <p className="text-purple-600 dark:text-purple-300">
                      {user ? "✅ Authenticated" : "🔒 Not Authenticated"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Posts Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    📝 Posts ({posts.length})
                  </h2>
                  {user && (
                    <button
                      onClick={() => {
                        // In a real app, you'd open a create post modal
                        alert("Create post functionality would go here!");
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Create Post
                    </button>
                  )}
                </div>
                
                {posts.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-300 text-center py-8">
                    No posts yet. {user ? "Create the first post!" : "Login to create posts."}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post: Post) => (
                      <div key={post.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {post.content}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>By {post.author_name}</span>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* API Endpoints Info */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  🔗 Available API Endpoints
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Authentication</h3>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                      <li>POST /api/auth/register</li>
                      <li>POST /api/auth/login</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Posts</h3>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                      <li>GET /api/posts</li>
                      <li>POST /api/posts</li>
                      <li>GET /api/posts/[id]</li>
                      <li>PUT /api/posts/[id]</li>
                      <li>DELETE /api/posts/[id]</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Comments</h3>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                      <li>POST /api/comments</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Users</h3>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                      <li>GET /api/users/profile</li>
                      <li>PUT /api/users/profile</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
