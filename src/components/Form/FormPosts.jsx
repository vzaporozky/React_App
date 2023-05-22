import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import cl from "./FormPosts.module.css";

const FormPost = ({ onAddPost }) => {
    const validationSchema = yup.object().shape({
        title: yup.string().required("Required"),
        body: yup.string().required("Required"),
        postId: yup.string().required("Required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleIdChange = (event) => {
        const postId = event.target.value;

        // function to check if a post exists
        const postExists = true;

        if (postExists) {
            setValue("postName", "");
        } else {
            setError("postId", {
                type: "manual",
                message: "Post not found",
            });
            setValue("postName", "");
        }
    };

    const onSubmit = async (data) => {
        try {
            const post = {
                title: data.title,
                body: data.body,
                postId: data.postId,
            };
            await onAddPost(post);
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
                <div className={cl.block__input}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter tittle..."
                        className={cl.from__input}
                        {...register("title")}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>
                <div className={cl.block__input}>
                    <label htmlFor="body">Body</label>
                    <input
                        type="text"
                        id="body"
                        placeholder="Enter your post..."
                        className={cl.from__input}
                        {...register("body")}
                    />
                    {errors.body && <span>{errors.body.message}</span>}
                </div>
                <div className={cl.block__input}>
                    <label htmlFor="postId">ID</label>
                    <input
                        type="text"
                        id="postId"
                        placeholder="enter id"
                        {...register("postId")}
                        onChange={handleIdChange}
                        className={cl.from__input}
                    />
                    {errors.postId && <span>{errors.postId.message}</span>}
                </div>
                <button type="submit" className={cl.from__button}>
                    Submit
                </button>
            </form>
        </>
    );
};

export default FormPost;
