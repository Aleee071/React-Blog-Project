import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	posts: [],
	activePosts: [],
	loading: false,
	// error: null,
};

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		// Fetch Posts
		fetchPostsSuccess: (state, action) => {
			state.loading = false;
			state.posts = action.payload.posts;
		},

		// Fetch Active Posts
		fetchActivePostsSuccess: (state, action) => {
			state.loading = false;
			state.activePosts = action.payload.posts;
		},

		// Create Post for all
		createPostSuccess: (state, action) => {
			state.loading = false;
			state.posts.push(action.payload.post);
		},

		//create Post for active
		createActivePostSuccess: (state, action) => {
			state.loading = false;
			state.activePosts.push(action.payload.post);

			// Ensure it's in the main posts array too
			if (!state.posts.find((post) => post.$id === action.payload.post.$id)) {
				state.posts.push(action.payload.post);
			}
		},

		// Update Post
		updatePostSuccess: (state, action) => {
			state.loading = false;

			// Update in posts array
			state.posts = state.posts.map((post) =>
				post.$id === action.payload.post.$id ? action.payload.post : post
			);

			// Handle status transition to active
			if (action.payload.post.status === "active") {
				// Add to activePosts if not already there
				if (
					!state.activePosts.find(
						(post) => post.$id === action.payload.post.$id
					)
				) {
					state.activePosts.push(action.payload.post);
				}
			} else {
				// Remove from activePosts if it exists
				state.activePosts = state.activePosts.filter(
					(post) => post.$id !== action.payload.post.$id
				);
			}
		},

		//! Some problem while updating post with status 'active' to 'inactive'

		// Update Active Post
		updateActivePostSuccess: (state, action) => {
			state.loading = false;

			if (
				!state.activePosts.find((post) => post.$id === action.payload.post.$id)
			) {
				state.activePosts.push(action.payload.post);
			} else {
				state.activePosts = state.activePosts.map((post) =>
					post.$id === action.payload.post.$id ? action.payload.post : post
				);
			}

			// Ensure it's updated in the main posts array too
			state.posts = state.posts.map((post) =>
				post.$id === action.payload.post.$id ? action.payload.post : post
			);
		},

		// Delete Post
		deletePostSuccess: (state, action) => {
			state.loading = false;

			// Filter out the post from both arrays
			state.activePosts = state.activePosts.filter(
				(post) => post.$id !== action.payload.postId
			);

			state.posts = state.posts.filter(
				(post) => post.$id !== action.payload.postId
			);
		},
	},
});

export const {
	fetchPostsSuccess,
	fetchActivePostsSuccess,
	createPostSuccess,
	createActivePostSuccess,
	updatePostSuccess,
	updateActivePostSuccess,
	deletePostSuccess,
} = postSlice.actions;

export default postSlice.reducer;
