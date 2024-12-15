import { Client, Account, ID } from "appwrite";
import conf from "../conf/config";

export class AccountManager {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		if (!email || !password || !name) {
			throw new Error(
				"Invalid parameters: email, password, and name are required."
			);
		}
		try {
			const session = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (session) {
				return this.login({ email, password });
			} else {
				return session;
			}
		} catch (error) {
			console.log("Appwrite service :: createAccount :: error", error);
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailPasswordSession(email, password);
		} catch (error) {
			console.log("Appwrite service :: login :: error", error);
			throw error;
		}
	}

	async logout() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			console.log("Appwrite service :: logout :: error", error);
			throw error;
		}
	}

	async getSession() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwrite service :: getSession :: error", error);
			throw error;
		}
	}
}

const accountManager = new AccountManager();
export default accountManager;
