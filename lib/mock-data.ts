/**
 * Data Model Stubs for Fanthom (Section 7 of Build Spec)
 * Stubbed with typed interfaces and empty arrays. Real mock data seeded later.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  durationMinutes: number;
  participants: string[];
}

export interface TranscriptLine {
  id: string;
  meetingId: string;
  speakerName: string;
  timestampSeconds: number;
  text: string;
}

export interface SummaryBullet {
  id: string;
  meetingId: string;
  text: string;
  order: number;
}

export interface ActionItem {
  id: string;
  meetingId: string;
  text: string;
  isDone: boolean;
  assignee?: string;
  dueDate?: string;
}

export interface Highlight {
  id: string;
  meetingId: string;
  timestampSeconds: number;
  quoteText: string;
}

// Empty arrays stubbed out for initial foundation
export const mockUsers: User[] = [];
export const mockMeetings: Meeting[] = [];
export const mockTranscriptLines: TranscriptLine[] = [];
export const mockSummaryBullets: SummaryBullet[] = [];
export const mockActionItems: ActionItem[] = [];
export const mockHighlights: Highlight[] = [];
