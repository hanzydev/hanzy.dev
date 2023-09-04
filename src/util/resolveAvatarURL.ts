export const resolveAvatarURL = (userId: string, avatar: string, size = 1024) => {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${
        avatar.startsWith('a_') ? 'gif' : 'webp'
    }?size=${size}`;
};
