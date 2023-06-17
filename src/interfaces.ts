export type status = "Loading" | "resolved" | "rejected" | null;

export interface Users {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export type TodosState = {
    todosId: number;
    id: number;
    title: string;
    completed: boolean;
};

export interface TodosInterfaces {
    todos: TodosState[] | [];
    status: status;
    error: any;
}

export interface UsersState {
    users: Users[] | [];
    status: status;
    error: any;
}
export interface UserState {
    user: Users;
    status: status;
    error: any;
}

export interface UserItemState {
    name: string;
    username: string;
    id: number;
}

export type PostsState = {
    postId: number;
    id: number;
    title: string;
    body: string;
};

export interface PostsInterfaces {
    posts: PostsState[] | [];
    status: status;
    error: any;
}

export type AlbumState = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export interface AlbumInterfaces {
    userAlbums: AlbumState[] | [];
    status: status;
    error: any;
}

export type PostItemState = {
    title: string;
    body: string;
};

export interface PageTemplateState {
    name: string;
    status: status;
    error: any;
}

export interface TodoItemState {
    id: string | number;
    title: string;
    completed: boolean;
    form: boolean;
    todosId: number;
}
