import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await api.post("/posts", { title, content });

            // SUCCESS → GO TO POST LIST
            navigate("/user/list");
        } catch (err) {
            console.error("Failed to create post", err);
        }
    }

    // ⚡ Cancel → Go to Admin Dashboard
    function handleCancel() {
        navigate("/admin");
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2>Create Post</h2>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            placeholder="Content"
                            className="form-control mb-3"
                            rows={5}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Create
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
