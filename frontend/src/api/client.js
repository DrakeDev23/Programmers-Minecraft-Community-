const BASE_URL = 'http://localhost:8000/api';

let csrfToken = '';

export function setCsrfToken(token) {
    csrfToken = token;
}

async function request(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
            ...options.headers,
        },
        ...options,
    });

    const json = await res.json();

    if (!json.ok) {
        const err = new Error(json.error || 'Unknown error');
        err.status = res.status;
        throw err;
    }

    return json.data;
}

export const auth = {
    login: (username, password) =>
        request('/auth.php?action=login', { method: 'POST', body: JSON.stringify({ username, password }) }),
    logout: () =>
        request('/auth.php?action=logout', { method: 'POST' }),
    me: () =>
        request('/auth.php?action=me'),
};

export const members = {
    list: () => request('/members.php'),
    toggle: (id) => request(`/members.php?action=toggle&id=${id}`, { method: 'PUT' }),
    kick: (id) => request(`/members.php?id=${id}`, { method: 'DELETE' }),
};

export const announcements = {
    list: () => request('/announcements.php'),
    create: (title, msg, tag) =>
        request('/announcements.php', { method: 'POST', body: JSON.stringify({ title, msg, tag }) }),
    update: (id, title, msg) =>
        request(`/announcements.php?id=${id}`, { method: 'PUT', body: JSON.stringify({ title, msg }) }),
    remove: (id) =>
        request(`/announcements.php?id=${id}`, { method: 'DELETE' }),
};

export const whitelist = {
    list: () => request('/whitelist.php'),
    accept: (id) => request(`/whitelist.php?id=${id}&action=accept`, { method: 'PUT' }),
    deny: (id) => request(`/whitelist.php?id=${id}&action=deny`, { method: 'PUT' }),
    apply: (username, note) =>
        request('/whitelist.php', { method: 'POST', body: JSON.stringify({ username, note }) }),
};