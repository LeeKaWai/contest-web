import { fetchWithAuth } from "./base";

export const GetUserProfile = async () => {
  try {
    const res = await fetchWithAuth("/api/user/profile", {
      method: "GET",
    });
    return res;
  } catch (error) {
    throw new Error("Get User Profile failed", error);
  }
};

export const UpdateProfile = async (data) => {
  try {
    const res = await fetchWithAuth("/api/user/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    throw new Error("Update User Profile failed", error);
  }
};

export const VerifyPassword = async (value) => {
  try {
    const res = await fetchWithAuth("/api/verify", {
      method: "POST",
      body: JSON.stringify(value),
    });
    return res;
  } catch (error) {
    throw new Error("Verify Password Failed", error);
  }
};
