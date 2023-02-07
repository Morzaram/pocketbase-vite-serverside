# PocketBase Vite Serverside

Hey there, I made this light version to have a way to call authorization once to pocketbase while building my static site
[NPM package](https://www.npmjs.com/package/pocketbase-vite-serverside)

1. Install by one of the following

   `yarn add pocketbast-vite-serverside`

   `npm i pocketbase-vite-serverside`

2. Add the env variables (see examples below)
3. call `import { authPb } from "pocketbase-vite-serverside";` in the files you want to make a requst from
4. Call `authPb` like the normal `pb` client

   ```typescript
   import { authPb } from "pocketbase-vite-serverside";
   const records = await authPb
     .collection("events")
     .getFullList(200, { sort: "-created" });
   ```

All you need to do is in your `.env` file is to fill out the following env vars. Here's a template below
For using admin login add the following

```env
PB_USERNAME="admin@email.com"
PB_PASSWORD="adminpassowrd"
PB_AUTH_METHOD="admin-email" #This is to declare which login method
PB_URL="https://your.pocketbase.url"
```

## Next up

I will be implementing table based login such as 'users' and token based login.
If anyone wants to contribute feel free to make a PR with these implementations!
