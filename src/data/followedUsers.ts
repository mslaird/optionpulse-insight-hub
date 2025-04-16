
// Initial mock data for followed users
export interface FollowedUser {
  username: string;
  followedAt: string;
}

export const initialFollowedUsers: FollowedUser[] = [
  { username: "trader_x", followedAt: "2025-04-16T10:30:00Z" },
  { username: "options_master", followedAt: "2025-04-15T14:20:00Z" },
  { username: "theta_gang", followedAt: "2025-04-14T09:10:00Z" }
];
