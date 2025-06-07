import { API_KEY } from "../constants/usersDB";

export class UserService {

    constructor(endPoint) {
        this.endPoint = endPoint || `${process.env.NEXTAUTH_URL}/api/user`;
    };
    createUser = async (user) => {
        try {
            if (!user) return null;
            const newUser = await fetch(this.endPoint,
                {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY
                    },
                    body: JSON.stringify(user)
                }) || null;

            const newUserJson = await newUser.json();
            return newUserJson;
        } catch (error) {
            return null;
        }
    }
    getUser = async (user) => {
        try {
            if (!user) return null;
            const userParams = user ? new URLSearchParams(user) : "";
            const userDB = await fetch(`${this.endPoint}?${userParams}`,
                {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'x-api-key': API_KEY,
                    }
                }) || null;

            const userDBJson = await userDB.json();
            return userDBJson;
        } catch (error) {
            return null;
        }
    }



}

export const userService = new UserService();