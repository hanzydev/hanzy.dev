import { GithubRepository } from '~/types';

export default cachedEventHandler<Promise<GithubRepository[]>>(
    async () => {
        const data = (await fetch(
            `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                },
            },
        ).then((res) => res.json())) as Record<string, any>[];

        return data
            .filter((repo) => !repo.fork)
            .map((repo) => ({
                name: repo.name,
                url: repo.html_url,
                description: repo.description || 'No description provided.',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language ?? 'Unknown',
                license: repo.license
                    ? {
                          name: repo.license.spdx_id,
                          long_name: repo.license.name,
                      }
                    : 'Not Licensed',
            }));
    },
    {
        swr: true,
        maxAge: 60 * 60 * 24,
    },
);
