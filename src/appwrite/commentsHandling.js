import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/config";

class CommentsManager {
	client = new Client();
	databases;
	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
	}

	async createComment({ postId, content, userId, createdAt, userName }) {
		try {
			const comment = await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.collections.comments,
				ID.unique(),
				{ postId, content, userId, createdAt, userName }
			);
			return comment;
		} catch (error) {
			console.log("appwrite service :: createComment :: error", error);
			throw error;
		}
	}

	async getComments(postId) {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.collections.comments,
				[Query.equal("postId", postId)]
			);
		} catch (error) {
			console.log("appwrite service :: getComments :: error", error);
			throw error;
		}
	}

	async deleteComment(commentId) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.collections.comments,
				commentId
			);
			return true;
		} catch (error) {
			console.log("appwrite service :: deleteComment :: error", error);
			throw error;
		}
	}

	async updateComment(commentId, { content }) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.collections.comments,
				commentId,
				{ content }
			);
		} catch (error) {
			console.log("appwrite service :: updateComment :: error", error);
			throw error;
		}
	}
}

const commentsManager = new CommentsManager();
export default commentsManager;
