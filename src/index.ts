import type Client from "pocketbase";
import PocketBase from "pocketbase";
import { loadEnv } from "vite";

export class AuthorizedPocketBase {
  static instance: AuthorizedPocketBase;
  _pb: PocketBase;
  createdAt: Date;

  constructor() {
    this.createdAt ||= new Date();
    this._pb ||= new PocketBase(this._pbUrl);
    // console.log(this._pb);

    if (!AuthorizedPocketBase.instance) {
      AuthorizedPocketBase.instance = this;
    }

    return AuthorizedPocketBase.instance;
  }

  async authorizeWithAdminEmailAndPassword(email: string, password: string) {
    if (!this._pb.authStore.isValid) {
      await this._pb.admins.authWithPassword(email, password);
    }
    return this;
  }
  async authorize() {
    if (this._pb.authStore.isValid) {
      return this;
    }

    const authMethod = this._authMethod;

    switch (authMethod) {
      case "admin-email":
        await this.authorizeWithAdminEmailAndPassword(
          this._getAdminEmailVars().PB_USERNAME,
          this._getAdminEmailVars().PB_PASSWORD
        );
        break;

      default:
        throw new Error(
          `No authorization method selected \n 
          Input was: ${authMethod} \n
          Please choose from: 'admin-email'.
          `
        );
    }
    return this;
  }

  _getAdminEmailVars = () => {
    if (
      import.meta.env.PB_USERNAME == undefined ||
      import.meta.env.PB_PASSWORD
    ) {
      const { PB_USERNAME } = loadEnv("", ".", "PB_USERNAME");
      const { PB_PASSWORD } = loadEnv("", ".", "PB_PASSWORD");
      return { PB_USERNAME, PB_PASSWORD };
    } else {
      const PB_USERNAME = import.meta.env.PB_USERNAME;
      const PB_PASSWORD = import.meta.env.PB_PASSWORD;
      return { PB_USERNAME, PB_PASSWORD };
    }
  };

  get _authMethod() {
    if (import.meta.env.PB_AUTH_METHOD == undefined) {
      return loadEnv("", ".", "PB_AUTH_METHOD").PB_AUTH_METHOD;
    } else {
      return import.meta.env.PB_AUTH_METHOD;
    }
  }

  get _pbUrl() {
    if (import.meta.env.PB_URL == undefined) {
      return loadEnv("", ".", "PB_URL").PB_URL;
    } else {
      return import.meta.env.PB_URL;
    }
  }

  public get pb(): Client {
    return this._pb;
  }
}

const initalizePocketBase = async () => {
  const authorizedPocketBase = await new AuthorizedPocketBase().authorize();
  return authorizedPocketBase.pb;
};

export const authPb = await initalizePocketBase();
