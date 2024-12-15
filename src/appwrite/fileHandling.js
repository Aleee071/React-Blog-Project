import { Client, Storage, ID } from "appwrite";
import conf from "../conf/config";

export class FileManager {
	client = new Client();
	storage;

	constructor() {
		this.client.setEndpoint(conf.appwriteUrl);
		this.client.setProject(conf.appwriteProjectId);

		this.storage = new Storage(this.client);
	}

	async uploadFile(file) {
		if (!file) throw new Error("File is required for uploading");

		try {
			const newFile = await this.storage.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
			return newFile;
		} catch (error) {
			console.log("appwrite service :: updateFile :: error", error);
			throw error;
		}
	}

	async getFile(fileId) {
		try {
			const file = await this.storage.getFile(conf.appwriteBucketId, fileId);
			return file;
		} catch (error) {
			console.log("appwrite service :: getFile :: error", error);
			throw error;
		}
	}

	async deleteFile(fileId) {
		try {
			return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
		} catch (error) {
			console.log("appwrite service :: deleteFile :: error", error);
			throw error;
		}
	}

	getFilePreview(fileId) {
		return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
	}
}

const fileManager = new FileManager();
export default fileManager;
