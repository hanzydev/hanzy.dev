interface Repository {
    name: string;
    url: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string;
    license: {
        name: string;
        long_name: string;
    } | null;
}

export default cachedEventHandler<Promise<Repository[]>>(
    async () => {
        const data = (await fetch(`https://api.github.com/users/${process.env.GH_USERNAME}/repos`, {
            headers: {
                Authorization: `Bearer ${process.env.GH_TOKEN}`,
            },
        }).then((res) => res.json())) as Record<string, any>[];

        return data
            .filter((r) => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .map((r) => ({
                name: r.name,
                url: r.html_url,
                description: r.description,
                stars: r.stargazers_count,
                forks: r.forks_count,
                language: r.language ?? 'Unknown',
                license: r.license
                    ? {
                          name: r.license.spdx_id,
                          long_name: r.license.name,
                      }
                    : null,
            }));
    },
    {
        swr: true,
        maxAge: 60 * 60 * 6,
    },
);
