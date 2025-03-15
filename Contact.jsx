import React, { useEffect, useState } from "react";

export default function Contact() {
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  // Fetch all posts initially
  useEffect(() => {
    async function fetchPosts() {
      try {
        let response = await fetch(API_URL);
        let data = await response.json();
        console.log(data); // Debugging
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  // Fetch user-specific posts when a button is clicked
  async function loadUserPosts(userId) {
    setLoading(true);
    setSelectedUser(userId);
    try {
      const response = await fetch(`${API_URL}?userId=${userId}`);
      const userPosts = await response.json();
      setPosts(userPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-600 flex flex-col items-center justify-center min-h-screen p-10 max-w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-full">
        <h2 className="font-bold text-2xl text-gray-600">Select a Section</h2>

        {/* User Buttons */}
        <div className="flex space-x-4 mt-4">
          {[...Array(10)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => loadUserPosts(i + 1)}
              className={`px-4 py-2 rounded-md ${
                selectedUser === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              User {i + 1}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="text-gray-700 text-lg mt-4">
          {loading ? (
            <p className="text-gray-500">Loading posts for User {selectedUser}...</p>
          ) : selectedUser ? (
            <>
              <h3 className="text-xl font-semibold">📖 Posts by User {selectedUser}</h3>
              {posts.map((post) => (
                <div key={post.id} className="bg-gray-200 p-4 rounded-md my-2">
                  <h4 className="font-bold">{post.title}</h4>
                  <p>{post.body}</p>
                </div>
              ))}
            </>
          ) : (
            <p>Welcome! Click a button to see the content change.</p>
          )}
        </div>
      </div>
    </div>
  );
}
