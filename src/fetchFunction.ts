export const fetchFunction = async (url: string, rejectWithValue: any) => {
    const response = await fetch(url);

    if (!response.ok) {
        return rejectWithValue("Error fetching user!");
    }

    const data = await response.json();
    return data;
};
