import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // modal/edit state
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const isAdmin = currentUser?.role === "admin";

  // BACK BUTTON: ADMIN → ADMIN DASHBOARD | USER → USER DASHBOARD
  function goBack() {
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/posts");
        if (!cancelled) setPosts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  // open edit modal
  function openEditModal(post) {
    if (!isAdmin) return;
    setEditingPost(post);
    setEditTitle(post.title ?? "");
    setEditContent(post.content ?? "");
  }

  // close modal
  function closeEditModal() {
    setEditingPost(null);
    setEditTitle("");
    setEditContent("");
    setSaving(false);
  }

  // save edit
  async function saveEdit() {
    if (!editingPost) return;

    const id = editingPost.id;
    const updated = { ...editingPost, title: editTitle, content: editContent };

    setSaving(true);
    setError(null);

    const before = posts;
    setPosts((p) => p.map((x) => (x.id === id ? updated : x)));

    try {
      const res = await api.put(`/posts/${id}`, updated);
      if (res?.data) {
        setPosts((p) => p.map((x) => (x.id === id ? res.data : x)));
      }
      closeEditModal();
    } catch (err) {
      setPosts(before);
      setError(err.message || "Failed to save changes");
      setSaving(false);
    }
  }

  // delete
  async function onDelete(postId) {
    if (!isAdmin) return;
    const ok = window.confirm("Are you sure you want to delete this post?");
    if (!ok) return;

    const before = posts;
    setPosts((p) => p.filter((x) => x.id !== postId));

    try {
      await api.delete(`/posts/${postId}`);
    } catch (err) {
      setPosts(before);
      setError(err.message || "Failed to delete post");
    }
  }

  return (
    <div className="container">
      <div className="card">

        {/* ---------- HEADER WITH BACK BUTTON ---------- */}
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">

            <button
              className="btn btn-secondary btn-sm"
              onClick={goBack}
            >
              ← Back
            </button>

            <h1 className="mb-0">Post List</h1>
          </div>

          <div>
            {isAdmin ? (
              <span className="badge bg-primary">Admin</span>
            ) : (
              <span className="badge bg-secondary">User</span>
            )}
          </div>
        </div>

        {/* ---------- BODY ---------- */}
        <div className="card-body">
          {loading ? (
            <p>Loading posts…</p>
          ) : (
            <>
              {error && <div className="alert alert-danger">Error: {error}</div>}

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No posts found.
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td>
                          {isAdmin ? (
                            <>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => openEditModal(post)}
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => onDelete(post.id)}
                              >
                                Delete
                              </button>
                            </>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

      {/* ---------- EDIT MODAL ---------- */}
      {editingPost && (
        <>
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            <div className="modal-dialog" style={{ maxWidth: 700 }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Post #{editingPost.id}</h5>
                  <button type="button" className="btn-close" onClick={closeEditModal} />
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                      className="form-control"
                      rows={6}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeEditModal} disabled={saving}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={saveEdit} disabled={saving}>
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* backdrop */}
          <div
            onClick={closeEditModal}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1040,
              backgroundColor: "transparent",
            }}
          />
        </>
      )}
    </div>
  );
};

export default PostList;
