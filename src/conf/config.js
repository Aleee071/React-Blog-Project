const conf = {
	appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
	appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
	appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
	appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
	collections: {
		posts: String(import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID),
		comments: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID),
	},
};

export default conf;
