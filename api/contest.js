import { fetchWithAuth } from "./base";

export const GetContets = async (conditions) => {
    try {
        const res = await fetchWithAuth("/api/contests",{
            method:'GET',
            params:JSON.stringify(conditions)
        });
        return res;
    } catch (error) {
        console.error(error)
        throw new Error("Get Contests failed")
    }
};
