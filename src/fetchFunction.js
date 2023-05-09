export const fetchFunction = async (url, rejectWithValue) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
};
