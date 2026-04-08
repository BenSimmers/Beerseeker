import { InstaQLEntity } from "@instantdb/react";
import type { AppSchema } from "@/instant.schema";
import { db } from "@/lib/db";

export type UserRecord = InstaQLEntity<AppSchema, "$users">;
export type Profile = InstaQLEntity<
  AppSchema,
  "profiles",
  {
    owner: {};
  }
>;
export type UploadFile = InstaQLEntity<AppSchema, "$files">;
export type UploadWithFile = InstaQLEntity<AppSchema, "uploads"> & {
  file?: UploadFile;
};
export type ProfileForReview = InstaQLEntity<
  AppSchema,
  "profiles",
  {
    owner: {};
    uploads: {
      file: {};
    };
  }
>;
export type InstantUser = NonNullable<ReturnType<typeof db.useAuth>["user"]>;
