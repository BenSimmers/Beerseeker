const RELEASES_URL =
  'https://api.github.com/repos/BenSimmers/Beer-Seeker-Mobile/releases?per_page=30';

// Re-fetch from GitHub at most every 10 minutes.
const REVALIDATE_SECONDS = 600;

export type Release = {
  id: number;
  name: string;
  tag: string;
  url: string;
  publishedAt: string;
  prerelease: boolean;
  notesHtml: string;
  apkUrl: string | null;
  apkSize: number | null;
};

type GitHubRelease = {
  id: number;
  name: string | null;
  tag_name: string;
  html_url: string;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
  body_html?: string;
  assets: { name: string; browser_download_url: string; size: number }[];
};

export const getReleases = async (): Promise<Release[]> => {
  // Optional: a token lifts the 60 requests/hour unauthenticated limit.
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(RELEASES_URL, {
      headers: {
        // body_html is GitHub's own sanitised rendering of the release notes.
        Accept: 'application/vnd.github.html+json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return [];

    const releases: GitHubRelease[] = await response.json();
    return releases
      .filter((release) => !release.draft && release.published_at)
      .map((release) => {
        const apk = release.assets.find((asset) => asset.name.endsWith('.apk'));
        return {
          id: release.id,
          name: release.name || release.tag_name,
          tag: release.tag_name,
          url: release.html_url,
          publishedAt: release.published_at!,
          prerelease: release.prerelease,
          notesHtml: release.body_html ?? '',
          apkUrl: apk?.browser_download_url ?? null,
          apkSize: apk?.size ?? null,
        };
      });
  } catch {
    return [];
  }
};
