function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return '/api';
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    const url = process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, '');
    return url.endsWith('/api') ? url : `${url}/api`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }
  return 'http://localhost:3000/api';
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options;

  const baseUrl = getBaseUrl();
  let url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  const authHeaders: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) {
      authHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    credentials: 'include', // sends httpOnly cookies across origins
    ...restOptions,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = data?.message || `Request failed with status ${res.status}`;
    const err = new Error(errorMsg) as Error & { status?: number; errors?: any };
    err.status = res.status;
    err.errors = data?.errors;
    throw err;
  }

  return data as T;
}

export const api = {
  // Public APIs
  getProjects: (params?: any) => apiFetch<any>('/projects', { params }),
  getProjectBySlug: (slug: string) => apiFetch<any>(`/projects/${slug}`),
  getBlogs: (params?: any) => apiFetch<any>('/blogs', { params }),
  getBlogBySlug: (slug: string) => apiFetch<any>(`/blogs/${slug}`),
  getTestimonials: () => apiFetch<any>('/testimonials'),
  getSettings: () => apiFetch<any>('/settings'),
  submitLead: (leadData: any) =>
    apiFetch<any>('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    }),

  // Admin APIs
  adminLogin: (credentials: { email: string; password: string }) =>
    apiFetch<any>('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  adminLogout: () =>
    apiFetch<any>('/admin/logout', {
      method: 'POST',
    }),
  adminGetMe: () => apiFetch<any>('/admin/me'),
  adminUpdatePassword: (payload: { currentPassword: string; newPassword: string }) =>
    apiFetch<any>('/admin/password', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  // Admin Dashboard
  adminGetDashboard: () => apiFetch<any>('/admin/dashboard'),

  // Admin Projects CRUD
  adminGetProjects: (params?: any) => apiFetch<any>('/admin/projects', { params }),
  adminGetProjectById: (id: string) => apiFetch<any>(`/admin/projects/${id}`),
  adminCreateProject: (payload: any) =>
    apiFetch<any>('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  adminUpdateProject: (id: string, payload: any) =>
    apiFetch<any>(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  adminDeleteProject: (id: string) =>
    apiFetch<any>(`/admin/projects/${id}`, {
      method: 'DELETE',
    }),

  // Admin Blogs CRUD
  adminGetBlogs: (params?: any) => apiFetch<any>('/admin/blogs', { params }),
  adminGetBlogById: (id: string) => apiFetch<any>(`/admin/blogs/${id}`),
  adminCreateBlog: (payload: any) =>
    apiFetch<any>('/admin/blogs', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  adminUpdateBlog: (id: string, payload: any) =>
    apiFetch<any>(`/admin/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  adminDeleteBlog: (id: string) =>
    apiFetch<any>(`/admin/blogs/${id}`, {
      method: 'DELETE',
    }),

  // Admin Leads
  adminGetLeads: (params?: any) => apiFetch<any>('/admin/leads', { params }),
  adminUpdateLead: (id: string, payload: any) =>
    apiFetch<any>(`/admin/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  adminDeleteLead: (id: string) =>
    apiFetch<any>(`/admin/leads/${id}`, {
      method: 'DELETE',
    }),

  // Admin Settings
  adminGetSettings: () => apiFetch<any>('/admin/settings'),
  adminUpdateSettings: (payload: any) =>
    apiFetch<any>('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  // Admin Featured Video
  adminGetFeaturedVideo: () => apiFetch<any>('/admin/video'),
  adminUpdateFeaturedVideo: (payload: any) =>
    apiFetch<any>('/admin/video', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  adminDeleteFeaturedVideo: () =>
    apiFetch<any>('/admin/video', {
      method: 'DELETE',
    }),
  adminGetCloudinarySignature: () => apiFetch<any>('/admin/cloudinary-sign'),

  // File Upload
  uploadFiles: async (formData: FormData): Promise<{ success: boolean; urls: string[]; url: string }> => {
    const authHeaders: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (token) {
        authHeaders['Authorization'] = `Bearer ${token}`;
      }
    }
    const res = await fetch(`${getBaseUrl()}/admin/upload`, {
      method: 'POST',
      headers: {
        ...authHeaders,
      },
      body: formData,
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'File upload failed');
    return data;
  },
};
