import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types"; 


const useAuthUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from local storage
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://cube-zoo-task-management-system.test/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user , setUser };
};

export default useAuthUser;
