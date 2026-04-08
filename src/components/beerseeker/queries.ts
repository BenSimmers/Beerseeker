export const DEFAULT_REWARD_GOAL = 120;

export const buildDashboardQuery = (userId: string) => ({
  profiles: {
    $: {
      where: { "owner.id": userId },
      limit: 1,
    },
    owner: {},
  },
  uploads: {
    $: {
      where: { "profile.owner.id": userId },
      order: { uploadedAt: "desc" as const },
    },
    file: {},
  },
});

export const buildReviewerQuery = (emailFilter?: string | null) => {
  const trimmed = emailFilter?.trim();
  const where = trimmed
    ? {
        "owner.email": {
          $ilike: `%${trimmed}%`,
        },
      }
    : undefined;

  return {
    profiles: {
      $: {
        ...(where ? { where } : {}),
        order: { createdAt: "desc" as const },
        limit: 12,
      },
      owner: {},
      uploads: {
        $: {
          order: { uploadedAt: "desc" as const },
          limit: 10,
        },
        file: {},
      },
    },
  };
};
