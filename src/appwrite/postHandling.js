import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/config";

export class PostManager {
	client = new Client();
	databases;
	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
	}

	async createPost({ title, content, imageId, status, userId, userName }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				ID.unique(),
				{ title, content, imageId, status, userId, userName }
			);
		} catch (error) {
			console.log("appwrite service :: createPost :: error", error);
			throw error;
		}
	}

	async updatePost(
		documentID,
		{ title, content, imageId, status, userId, userName }
	) {
		if (!documentID)
			throw new Error(
				"appwrite service :: updatePost :: documentID is required"
			);

		try {
			const updatedDoc = await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentID,
				{ title, content, imageId, status, userId, userName }
			);
			return updatedDoc;
		} catch (error) {
			console.log("appwrite service :: updatePost :: error", error);
			throw error;
		}
	}

	async deletePost(documentID) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentID
			);
			return true;
		} catch (error) {
			console.log("appwrite service :: deletePost :: error", error);
			throw error;
		}
	}

	async getPost(documentID) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				documentID
			);
		} catch (error) {
			console.log("appwrite service :: getPost :: error", error);
			throw error;
		}
	}

	async getActivePosts() {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				[Query.equal("status", "active")]
			);
		} catch (error) {
			console.log("appwrite service :: getActivePosts :: error", error);
			throw error;
		}
	}
	async getAllPosts() {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId
			);
		} catch (error) {
			console.log("appwrite service :: getAllPosts :: error", error);
			throw error;
		}
	}
}

const postManager = new PostManager();
export default postManager;
