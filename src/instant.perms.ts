// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
  $files: {
    allow: {
      view: "ownsFile || isAdmin",
      create: "ownsFile",
      delete: "ownsFile",
    },
    bind: [
      "ownsFile",
      "auth.id != null && data.path.startsWith(auth.id + '/')",
      "isAdmin",
      "'admin' in auth.ref('$user.type')",
    ],
  },
  profiles: {
    allow: {
      view: "ownsProfile || isAdmin",
      create: "isLoggedIn",
      update: "ownsProfile",
    },
    bind: [
      "ownsProfile",
      "auth.id != null && auth.id in data.ref('owner.id')",
      "isLoggedIn",
      "auth.id != null",
      "isAdmin",
      "'admin' in auth.ref('$user.type')",
    ],
  },
  uploads: {
    allow: {
      view: "ownsUpload || isAdmin",
      create: "isLoggedIn",
      delete: "ownsUpload",
    },
    bind: [
      "ownsUpload",
      "auth.id != null && auth.id in data.ref('profile.owner.id')",
      "isLoggedIn",
      "auth.id != null",
      "isAdmin",
      "'admin' in auth.ref('$user.type')",
    ],
  },
} satisfies InstantRules;

export default rules;
