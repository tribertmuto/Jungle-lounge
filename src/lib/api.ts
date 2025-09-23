// API client for interacting with the backend

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  posts_count?: number;
  comments_count?: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author_name: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  author_name: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface PostsResponse {
  posts: Post[];
  count: number;
}

export interface PostResponse {
  post: Post;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error((error as { error?: string }).error || 'Request failed');
    }

    return response.json();
  }

  // Auth methods
  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    
    this.setToken(response.token);
    return response;
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    this.setToken(response.token);
    return response;
  }

  logout(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  // Posts methods
  async getPosts(): Promise<PostsResponse> {
    return this.request<PostsResponse>('/posts');
  }

  async getPost(id: number): Promise<PostResponse> {
    return this.request<PostResponse>(`/posts/${id}`);
  }

  async createPost(title: string, content: string): Promise<{ message: string; post: Post }> {
    return this.request<{ message: string; post: Post }>('/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
  }

  async updatePost(id: number, title: string, content: string): Promise<{ message: string; post: Post }> {
    return this.request<{ message: string; post: Post }>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
    });
  }

  async deletePost(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Comments methods
  async createComment(postId: number, content: string): Promise<{ message: string; comment: Comment }> {
    return this.request<{ message: string; comment: Comment }>('/comments', {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, content }),
    });
  }

  // User methods
  async getProfile(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/users/profile');
  }

  async updateProfile(username: string, email: string): Promise<{ message: string; user: User }> {
    return this.request<{ message: string; user: User }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify({ username, email }),
    });
  }

  // Health check
  async healthCheck(): Promise<{ message: string; timestamp: string; environment: string }> {
    return this.request<{ message: string; timestamp: string; environment: string }>('/hello');
  }
}

export const apiClient = new ApiClient();
