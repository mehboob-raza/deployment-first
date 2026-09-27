const API_URL =
    import.meta.env.VITE_API_URL
async function request(endpoint, options = {}) {
    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        }
    );

    let data;

    try {
        data = await response.json();
    } catch {
        data = {
            message: "Invalid response from server",
        };
    }

    if (!response.ok) {
        throw new Error(
            data.message || "Something went wrong"
        );
    }

    return data;
}

export function getUsers() {
    return request("/users");
}

export function createUser(user) {
    return request("/users", {
        method: "POST",
        body: JSON.stringify(user),
    });
}

export function updateUser(id, user) {
    return request(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
    });
}

export function deleteUser(id) {
    return request(`/users/${id}`, {
        method: "DELETE",
    });
}
