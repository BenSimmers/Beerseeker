// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
      imageURL: i.string().optional(),
      type: i.string().optional(),
    }),
    profiles: i.entity({
      displayName: i.string().optional(),
      rewardGoal: i.number(),
      rewardTotal: i.number(),
      uploadsCount: i.number(),
      createdAt: i.number().indexed(),
    }),
    uploads: i.entity({
      filename: i.string(),
      fileSize: i.number(),
      mimeType: i.string().optional(),
      rewardValue: i.number(),
      uploadedAt: i.number().indexed(),
      employerName: i.string().optional(),
      positionTitle: i.string().optional(),
      jobReference: i.string().optional(),
      keywordMatch: i.boolean().optional().indexed(),
      keywordHits: i.number().optional(),
      keywordCheckedAt: i.number().optional(),
      reviewStatus: i.string().indexed(),
      reviewedAt: i.number().optional(),
      reviewedBy: i.string().optional(),
      awardedAt: i.number().optional(),
      reviewNotes: i.string().optional(),
    }),
  },
  links: {
    profileOwner: {
      forward: {
        on: "profiles",
        has: "one",
        label: "owner",
        onDelete: "cascade",
      },
      reverse: {
        on: "$users",
        has: "one",
        label: "profile",
      },
    },
    profileUploads: {
      forward: {
        on: "profiles",
        has: "many",
        label: "uploads",
      },
      reverse: {
        on: "uploads",
        has: "one",
        label: "profile",
      },
    },
    uploadFile: {
      forward: {
        on: "uploads",
        has: "one",
        label: "file",
        onDelete: "cascade",
      },
      reverse: {
        on: "$files",
        has: "one",
        label: "upload",
      },
    },
  },
  rooms: {},
});

// This helps TypeScript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
