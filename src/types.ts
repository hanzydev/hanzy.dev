interface Kv {
    [key: string]: string;
}

interface Spotify {
    track_id: string;
    timestamps: Timestamps;
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
}

interface Timestamps {
    start: number;
    end: number;
}

interface Activity {
    type: number;
    state: string;
    name: string;
    id: string;
    flags?: number;
    emoji?: Emoji;
    created_at: number;
    application_id?: string;
    timestamps?: Timestamps;
    sync_id?: string;
    session_id?: string;
    party?: Party;
    details?: string;
    buttons?: string[];
    assets?: Assets;
}

interface Party {
    id: string;
    size?: PartySize;
}

interface PartySize {
    current_size: number;
    max_size: number;
}

interface Assets {
    small_text: string;
    small_image: string;
    large_text: string;
    large_image: string;
}

interface Emoji {
    name: string;
    id?: string;
    animated?: boolean;
}

interface DiscordUser {
    username: string;
    public_flags: number;
    id: string;
    discriminator: string;
    bot: boolean;
    avatar: string;
}

export interface LanyardData {
    spotify?: Spotify;
    listening_to_spotify: boolean;
    discord_user: DiscordUser;
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    kv?: Kv;
    activities: Activity[];
    active_on_discord_web: boolean;
    active_on_discord_mobile: boolean;
    active_on_discord_desktop: boolean;
}

export interface GithubRepository {
    name: string;
    url: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    license:
        | {
              name: string;
              long_name: string;
          }
        | 'Not Licensed';
}
