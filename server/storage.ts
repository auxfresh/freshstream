import { users, teams, matches, type User, type InsertUser, type Team, type InsertTeam, type Match, type InsertMatch, type MatchWithTeams } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllTeams(): Promise<Team[]>;
  getTeam(id: number): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  
  getAllMatches(): Promise<Match[]>;
  getMatchesWithTeams(): Promise<MatchWithTeams[]>;
  getMatch(id: number): Promise<Match | undefined>;
  getMatchWithTeams(id: number): Promise<MatchWithTeams | undefined>;
  getFeaturedMatch(): Promise<MatchWithTeams | undefined>;
  getLiveMatches(): Promise<MatchWithTeams[]>;
  getUpcomingMatches(): Promise<MatchWithTeams[]>;
  createMatch(match: InsertMatch): Promise<Match>;
  updateMatch(id: number, updates: Partial<Match>): Promise<Match | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private teams: Map<number, Team>;
  private matches: Map<number, Match>;
  private currentUserId: number;
  private currentTeamId: number;
  private currentMatchId: number;

  constructor() {
    this.users = new Map();
    this.teams = new Map();
    this.matches = new Map();
    this.currentUserId = 1;
    this.currentTeamId = 1;
    this.currentMatchId = 1;

    // Initialize with sample data for demonstration
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample teams
    const sampleTeams: InsertTeam[] = [
      { name: "Arsenal FC", league: "Premier League", logo: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c", wins: 18, draws: 5, losses: 3, primaryColor: "#FF0000" },
      { name: "Chelsea FC", league: "Premier League", logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256", wins: 15, draws: 7, losses: 4, primaryColor: "#0000FF" },
      { name: "Manchester City", league: "Premier League", logo: "https://images.unsplash.com/photo-1508768787810-6adc1f613514", wins: 20, draws: 4, losses: 2, primaryColor: "#6CABDD" },
      { name: "Manchester United", league: "Premier League", logo: "https://images.unsplash.com/photo-1516832970803-325be7a92aa5", wins: 14, draws: 8, losses: 4, primaryColor: "#FF0000" },
      { name: "Liverpool FC", league: "Premier League", logo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018", wins: 16, draws: 6, losses: 4, primaryColor: "#C8102E" },
      { name: "Tottenham", league: "Premier League", logo: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d", wins: 14, draws: 6, losses: 6, primaryColor: "#132257" }
    ];

    sampleTeams.forEach(team => this.createTeam(team));

    // Sample matches
    const now = new Date();
    const sampleMatches: InsertMatch[] = [
      {
        homeTeamId: 4, // Manchester United
        awayTeamId: 5, // Liverpool FC
        homeScore: 2,
        awayScore: 1,
        status: "live",
        matchTime: "76:23",
        startTime: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        venue: "Old Trafford",
        competition: "Premier League",
        streamUrl: "https://example.com/stream1",
        viewerCount: 24567,
        featured: true
      },
      {
        homeTeamId: 1, // Arsenal FC
        awayTeamId: 2, // Chelsea FC
        homeScore: 1,
        awayScore: 0,
        status: "live",
        matchTime: "87:15",
        startTime: new Date(now.getTime() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
        venue: "Emirates Stadium",
        competition: "Premier League",
        streamUrl: "https://example.com/stream2",
        viewerCount: 18432,
        featured: false
      },
      {
        homeTeamId: 3, // Manchester City
        awayTeamId: 6, // Tottenham
        status: "upcoming",
        startTime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
        venue: "Etihad Stadium",
        competition: "Premier League",
        streamUrl: "https://example.com/stream3",
        featured: false
      }
    ];

    sampleMatches.forEach(match => this.createMatch(match));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async getTeam(id: number): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = this.currentTeamId++;
    const team: Team = { ...insertTeam, id };
    this.teams.set(id, team);
    return team;
  }

  async getAllMatches(): Promise<Match[]> {
    return Array.from(this.matches.values());
  }

  async getMatchesWithTeams(): Promise<MatchWithTeams[]> {
    const matches = Array.from(this.matches.values());
    const matchesWithTeams: MatchWithTeams[] = [];

    for (const match of matches) {
      const homeTeam = await this.getTeam(match.homeTeamId);
      const awayTeam = await this.getTeam(match.awayTeamId);
      
      if (homeTeam && awayTeam) {
        matchesWithTeams.push({
          ...match,
          homeTeam,
          awayTeam
        });
      }
    }

    return matchesWithTeams;
  }

  async getMatch(id: number): Promise<Match | undefined> {
    return this.matches.get(id);
  }

  async getMatchWithTeams(id: number): Promise<MatchWithTeams | undefined> {
    const match = await this.getMatch(id);
    if (!match) return undefined;

    const homeTeam = await this.getTeam(match.homeTeamId);
    const awayTeam = await this.getTeam(match.awayTeamId);

    if (!homeTeam || !awayTeam) return undefined;

    return {
      ...match,
      homeTeam,
      awayTeam
    };
  }

  async getFeaturedMatch(): Promise<MatchWithTeams | undefined> {
    const matches = await this.getMatchesWithTeams();
    return matches.find(match => match.featured);
  }

  async getLiveMatches(): Promise<MatchWithTeams[]> {
    const matches = await this.getMatchesWithTeams();
    return matches.filter(match => match.status === "live");
  }

  async getUpcomingMatches(): Promise<MatchWithTeams[]> {
    const matches = await this.getMatchesWithTeams();
    return matches.filter(match => match.status === "upcoming");
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = this.currentMatchId++;
    const match: Match = { ...insertMatch, id };
    this.matches.set(id, match);
    return match;
  }

  async updateMatch(id: number, updates: Partial<Match>): Promise<Match | undefined> {
    const match = this.matches.get(id);
    if (!match) return undefined;

    const updatedMatch = { ...match, ...updates };
    this.matches.set(id, updatedMatch);
    return updatedMatch;
  }
}

export const storage = new MemStorage();
