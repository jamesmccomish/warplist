import { Hex, Address } from 'viem'

export interface SearchcasterProfile {
    id: number
    address: string
    username: string
    displayName: string
    bio: string
    followers: number
    following: number
    avatarUrl: string
    isVerifiedAvatar: boolean
    registeredAt: number
    connectedAddress: Address
}

export interface WarpcastUser {
    fid: number
    username: string
    displayName: string
    pfp: {
        url: string
        verified: boolean
    }
    profile: {
        bio: {
            text: string
            mentions: string[]
        }
        location: {
            placeId: string
            description: string
        }
    }
    followerCount: number
    followingCount: number
    activeOnFcNetwork: boolean
    referrerUsername: string
    // - These are provided for the authed user by warpcast and so are useless for us
    // viewerContext: {
    // 	following: boolean
    // 	followedBy: boolean
    // }
    // protocolBudgets: {
    // 	canAddLinks: boolean
    // }
}

export type SearchcasterProfileResponse = ({
    body: Omit<SearchcasterProfile, 'connectedAddress'>
} & Pick<SearchcasterProfile, 'connectedAddress'>)[]

interface CursorQueryResultSuccess<T> {
    next: { cursor?: string }
    result: T
}
interface CursorQueryResultError {
    errors: string | string[]
}

export type CursorQueryResult<T> = CursorQueryResultSuccess<T> | CursorQueryResultError

export type WarpcastFollowersQuery = CursorQueryResult<{
    users: WarpcastUser[]
}>
export type WarpcastFollowingQuery = CursorQueryResult<{
    users: WarpcastUser[]
    leastInteractedWith: {
        count: number
        users: WarpcastUser[]
    }
}>

export type WarpcastLocationUsersQuery = CursorQueryResult<{
    users: WarpcastUser[]
}>

export type WarpcastRecaster = {
    fid: number
    username: string
    displayName: string
    recastHash: Hex
}

export interface WarpcastEmbeds {
    images: WarpcastImageEmbed[]
    urls: WarpcastUrlEmbed[]
    unknowns: string[]
    processedCastText: string
}

export type WarpcastAuthor = Omit<WarpcastUser, 'referrerUsername'>

export type WarpcastCast = {
    hash: Hex
    castType: 'root-embed' | undefined
    threadHash: Hex
    parentHash: Hex | undefined
    parentAuthor: WarpcastAuthor | undefined
    parentSource: { type: 'url'; url: string } | undefined
    author: WarpcastAuthor
    text: string
    timestamp: number
    embeds: WarpcastEmbeds
    replies: {
        count: number
    }
    reactions: {
        count: number
    }
    recasts: {
        count: number
        recasters: WarpcastRecaster[]
    }
    watches: {
        count: number
    }
    tags: WarpcastChannelTag[]
    // viewerContext: {
    // 	reacted: boolean
    // 	recast: boolean
    // 	watched: boolean
    // }
}

export interface WarpcastImageEmbed {
    type: string
    url: string
    sourceUrl: string
    alt: string
}

export interface WarpcastUrlEmbed {
    type: 'url'
    openGraph: {
        url: string
        sourceUrl: string
        title: string
        description: string
        domain: string
        image: string
        logo: string
        useLargeImage: boolean
    }
    collection: WarpcastCollection
}

export interface WarpcastChannelTag {
    id: string
    imageUrl: string
    name: string
    type: 'channel'
}

export type WarpcastCastQuery = CursorQueryResult<{ casts: WarpcastCast[] }>

export type WarpcastRecast = {
    fid: number
    username: string
    displayName: string
    recastHash: Hex
}

export interface WarpcastThreadCast extends WarpcastCast {
    mentions: string[]
    attachments: Record<string, unknown>
    ancestors: {
        count: number
        casts: WarpcastThreadCast[]
    }
}

export type WarpcastThreadCastQuery = CursorQueryResult<{ casts: WarpcastThreadCast[] }>

export interface WarpcastCollection {
    id: string
    name: string
    description: string
    itemCount: number
    ownerCount: number
    farcasterOwnerCount: number
    imageUrl: string
    volumeTraded: string
    mintUrl: string
    openSeaUrl: string
    schemaName: 'ERC721' | 'ERC1155'
    collectionOwners: WarpcastUser[]
}
