import api from "../api/axios";

export async function signup({ name, email, password, role = "user" }) {
  const res = await api.get(`/users?email=${encodeURIComponent(email)}`);
  if (res.data.length > 0) {
    throw new Error("User with that email already exists");
  }
  const newUser = { name, email, password, role };
  const create = await api.post("/users", newUser);
  return create.data;
}

export async function signin({ email, password }) {
  const res = await api.get(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );
  if (res.data.length === 0) {
    throw new Error("Invalid credentials");
  }
  const user = res.data[0];
  user.token = `fake-token-${user.id}-${Date.now()}`;
  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
}

export function signout() {
  localStorage.removeItem("currentUser");
}
