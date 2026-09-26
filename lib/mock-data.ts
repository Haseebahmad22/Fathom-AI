/**
 * Seed Data for Fanthom (Section 7 of Build Spec)
 * Realistic meeting transcripts, AI summaries, action items, and highlights.
 */

export interface Participant {
  name: string;
  email?: string;
  initials: string;
  avatarColor: string;
  role?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface TranscriptLine {
  id: string;
  meetingId: string;
  speakerName: string;
  speakerInitials?: string;
  timestampSeconds: number;
  text: string;
}

export interface SummaryBullet {
  id: string;
  meetingId: string;
  text: string;
  order: number;
  category?: string;
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
  speakerName?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  durationMinutes: number;
  thumbnail?: string;
  participants: Participant[];
  transcript: TranscriptLine[];
  summary: SummaryBullet[];
  actionItems: ActionItem[];
  highlights: Highlight[];
}

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Haseeb Ahmad",
    email: "haseeb@fanthom.ai",
  },
];

export const mockMeetings: Meeting[] = [
  // 1. Sales Discovery / Pricing Call
  {
    id: "meeting-1",
    title: "Sales call with Acme Corp",
    date: "2026-09-22T14:00:00Z",
    durationMinutes: 30,
    thumbnail: "/images/thumb_sales.jpg",
    participants: [
      {
        name: "Alex Morgan",
        email: "alex@fanthom.ai",
        initials: "AM",
        avatarColor: "#4E46DC",
        role: "Account Executive, Fanthom",
      },
      {
        name: "Sarah Jenkins",
        email: "sjenkins@acmecorp.com",
        initials: "SJ",
        avatarColor: "#FF6B5B",
        role: "VP of Operations, Acme Corp",
      },
    ],
    summary: [
      {
        id: "s1-1",
        meetingId: "meeting-1",
        order: 1,
        category: "Pain Points",
        text: "Acme Corp's 45-person ops and sales team currently loses ~4 hours weekly per person re-documenting customer calls in Notion and HubSpot.",
      },
      {
        id: "s1-2",
        meetingId: "meeting-1",
        order: 2,
        category: "Product Evaluation",
        text: "Sarah evaluated Otter and Fireflies previously but rejected both due to intrusive meeting bots that disturbed prospective buyers.",
      },
      {
        id: "s1-3",
        meetingId: "meeting-1",
        order: 3,
        category: "Compliance & Security",
        text: "Confirmed Fanthom has SOC 2 Type II compliance and zero data-retention training policies for third-party LLMs.",
      },
      {
        id: "s1-4",
        meetingId: "meeting-1",
        order: 4,
        category: "Next Steps",
        text: "Agreed on a 14-day team pilot for 15 core sales reps before initiating annual enterprise contract negotiations at $19/seat/mo.",
      },
    ],
    actionItems: [
      {
        id: "a1-1",
        meetingId: "meeting-1",
        text: "Send SOC 2 Type II report and standard DPA to Acme legal team",
        isDone: true,
        assignee: "Alex Morgan",
        dueDate: "2026-09-23",
      },
      {
        id: "a1-2",
        meetingId: "meeting-1",
        text: "Configure 15-seat sandbox workspace for Acme sales pod pilot",
        isDone: false,
        assignee: "Alex Morgan",
        dueDate: "2026-09-26",
      },
      {
        id: "a1-3",
        meetingId: "meeting-1",
        text: "Share list of 15 pilot team email addresses with Fanthom onboarding",
        isDone: false,
        assignee: "Sarah Jenkins",
        dueDate: "2026-09-25",
      },
    ],
    highlights: [
      {
        id: "h1-1",
        meetingId: "meeting-1",
        timestampSeconds: 512,
        speakerName: "Sarah Jenkins",
        quoteText:
          "The biggest reason we never adopted Otter or Fireflies was the visible bot joining our customer calls — it immediately created awkward friction with prospects.",
      },
      {
        id: "h1-2",
        meetingId: "meeting-1",
        timestampSeconds: 1240,
        speakerName: "Alex Morgan",
        quoteText:
          "Fanthom runs completely bot-free on your calls, generating your full transcript and actionable task breakdown within 30 seconds of hanging up.",
      },
    ],
    transcript: [
      {
        id: "t1-1",
        meetingId: "meeting-1",
        speakerName: "Alex Morgan",
        speakerInitials: "AM",
        timestampSeconds: 15,
        text: "Hi Sarah, great to connect today! Thanks for taking the time to explore Fanthom with us.",
      },
      {
        id: "t1-2",
        meetingId: "meeting-1",
        speakerName: "Sarah Jenkins",
        speakerInitials: "SJ",
        timestampSeconds: 28,
        text: "Hey Alex! Really excited for this. We're at a point where note-taking is eating our account executives alive.",
      },
      {
        id: "t1-3",
        meetingId: "meeting-1",
        speakerName: "Alex Morgan",
        speakerInitials: "AM",
        timestampSeconds: 45,
        text: "Tell me a bit more about how your team operates right now. What does post-call follow up look like?",
      },
      {
        id: "t1-4",
        meetingId: "meeting-1",
        speakerName: "Sarah Jenkins",
        speakerInitials: "SJ",
        timestampSeconds: 72,
        text: "We have 45 reps across SDRs and AEs. Right now they take shorthand notes on pen and paper or Google Docs, and spend 20 minutes after each call trying to remember action items and updating HubSpot.",
      },
      {
        id: "t1-5",
        meetingId: "meeting-1",
        speakerName: "Sarah Jenkins",
        speakerInitials: "SJ",
        timestampSeconds: 110,
        text: "Half the time critical customer requests get lost, and our weekly sales forecasts suffer because data entry is spotty.",
      },
      {
        id: "t1-6",
        meetingId: "meeting-1",
        speakerName: "Alex Morgan",
        speakerInitials: "AM",
        timestampSeconds: 145,
        text: "That's classic meeting note drag. Have you tried automated notetakers in the past?",
      },
      {
        id: "t1-7",
        meetingId: "meeting-1",
        speakerName: "Sarah Jenkins",
        speakerInitials: "SJ",
        timestampSeconds: 178,
        text: "We tried both Otter and Fireflies last year. Honestly, we turned them off after three weeks.",
      },
      {
        id: "t1-8",
        meetingId: "meeting-1",
        speakerName: "Alex Morgan",
        speakerInitials: "AM",
        timestampSeconds: 195,
        text: "What made you turn them off?",
      },
      {
        id: "t1-9",
        meetingId: "meeting-1",
        speakerName: "Sarah Jenkins",
        speakerInitials: "SJ",
        timestampSeconds: 512,
        text: "The biggest reason we never adopted Otter or Fireflies was the visible bot joining our customer calls — it immediately created awkward friction with prospects.",
      },
      {
        id: "t1-10",
        meetingId: "meeting-1",
        speakerName: "Alex Morgan",
        speakerInitials: "AM",
        timestampSeconds: 535,
        text: "That is the exact feedback that led to our bot-free capture architecture. Fanthom captures audio passively through system loopback without a synthetic bot avatar joining the room.",
      },
      {
        id: "t1-11",
        meetingId: "meeting-1",
        speakerName: "Sarah Jenkins",
        speakerInitials: "SJ",
        timestampSeconds: 620,
        text: "That's huge for us. What about latency? How quickly can my reps see their recap before their next back-to-back meeting?",
      },
      {
        id: "t1-12",
        meetingId: "meeting-1",
        speakerName: "Alex Morgan",
        speakerInitials: "AM",
        timestampSeconds: 655,
        text: "Fanthom runs completely bot-free on your calls, generating your full transcript and actionable task breakdown within 30 seconds of hanging up.",
      },
      {
        id: "t1-13",
        meetingId: "meeting-1",
        speakerName: "Sarah Jenkins",
        speakerInitials: "SJ",
        timestampSeconds: 840,
        text: "What about enterprise compliance? Our security council is very strict regarding generative models training on enterprise voice data.",
      },
      {
        id: "t1-14",
        meetingId: "meeting-1",
        speakerName: "Alex Morgan",
        speakerInitials: "AM",
        timestampSeconds: 875,
        text: "We are SOC 2 Type II certified and have zero-data-retention agreements with our model providers. Your meeting audio and transcript are encrypted in transit and at rest.",
      },
      {
        id: "t1-15",
        meetingId: "meeting-1",
        speakerName: "Sarah Jenkins",
        speakerInitials: "SJ",
        timestampSeconds: 1040,
        text: "That will pass muster with our CISO. What does pricing look like if we roll this out to our 45 seats?",
      },
      {
        id: "t1-16",
        meetingId: "meeting-1",
        speakerName: "Alex Morgan",
        speakerInitials: "AM",
        timestampSeconds: 1075,
        text: "Our Enterprise tier is $19 per user per month billed annually, which includes Ask Fanthom cross-meeting search, custom summary templates, and priority processing.",
      },
      {
        id: "t1-17",
        meetingId: "meeting-1",
        speakerName: "Sarah Jenkins",
        speakerInitials: "SJ",
        timestampSeconds: 1240,
        text: "Can we start with a pilot for 15 reps in our enterprise sales pod first? If they love it, we'll roll it out company-wide.",
      },
      {
        id: "t1-18",
        meetingId: "meeting-1",
        speakerName: "Alex Morgan",
        speakerInitials: "AM",
        timestampSeconds: 1280,
        text: "Absolutely. I'll provision a 15-seat sandbox workspace and send over the SOC 2 package for your legal team today.",
      },
    ],
  },

  // 2. Weekly Team Standup
  {
    id: "meeting-2",
    title: "Weekly Team Standup",
    date: "2026-09-24T09:30:00Z",
    durationMinutes: 20,
    thumbnail: "/images/thumb_standup.jpg",
    participants: [
      {
        name: "David Chen",
        email: "david@fanthom.ai",
        initials: "DC",
        avatarColor: "#4E46DC",
        role: "Engineering Lead",
      },
      {
        name: "Maya Patel",
        email: "maya@fanthom.ai",
        initials: "MP",
        avatarColor: "#1FA97A",
        role: "Senior Frontend Engineer",
      },
      {
        name: "Jordan Taylor",
        email: "jordan@fanthom.ai",
        initials: "JT",
        avatarColor: "#F5A623",
        role: "Lead Product Designer",
      },
      {
        name: "Sam Rivera",
        email: "sam@fanthom.ai",
        initials: "SR",
        avatarColor: "#8B85F5",
        role: "Backend Engineer",
      },
    ],
    summary: [
      {
        id: "s2-1",
        meetingId: "meeting-2",
        order: 1,
        category: "Performance Improvements",
        text: "Sam optimized the full-text transcript search indexing pipeline, reducing search query latency from 420ms down to 65ms on large archives.",
      },
      {
        id: "s2-2",
        meetingId: "meeting-2",
        order: 2,
        category: "UI Polish",
        text: "Maya completed the meeting detail view two-column refactor and polished the sticky summary/action items sidebar for 13-inch laptop viewports.",
      },
      {
        id: "s2-3",
        meetingId: "meeting-2",
        order: 3,
        category: "Design System",
        text: "Jordan finalized interactive checkbox states and assignee chip badges in Figma for the persistent Action Items feature.",
      },
      {
        id: "s2-4",
        meetingId: "meeting-2",
        order: 4,
        category: "Infrastructure",
        text: "David flagged potential downtime for the staging PostgreSQL cluster migration scheduled for Thursday evening.",
      },
    ],
    actionItems: [
      {
        id: "a2-1",
        meetingId: "meeting-2",
        text: "Deploy search latency benchmark tests to staging environment",
        isDone: true,
        assignee: "Sam Rivera",
        dueDate: "2026-09-24",
      },
      {
        id: "a2-2",
        meetingId: "meeting-2",
        text: "Implement interactive action item completion toggle in frontend",
        isDone: true,
        assignee: "Maya Patel",
        dueDate: "2026-09-25",
      },
      {
        id: "a2-3",
        meetingId: "meeting-2",
        text: "Post maintenance downtime warning in internal Slack for staging db migration",
        isDone: false,
        assignee: "David Chen",
        dueDate: "2026-09-25",
      },
      {
        id: "a2-4",
        meetingId: "meeting-2",
        text: "Export SVG icons for new template switcher dropdown",
        isDone: false,
        assignee: "Jordan Taylor",
        dueDate: "2026-09-26",
      },
    ],
    highlights: [
      {
        id: "h2-1",
        meetingId: "meeting-2",
        timestampSeconds: 185,
        speakerName: "Sam Rivera",
        quoteText:
          "By switching to trigram indexing on PostgreSQL, transcript fuzzy searches now resolve in 65 milliseconds across thousands of hours of audio.",
      },
    ],
    transcript: [
      {
        id: "t2-1",
        meetingId: "meeting-2",
        speakerName: "David Chen",
        speakerInitials: "DC",
        timestampSeconds: 10,
        text: "Morning everyone! Let's do our quick Thursday standup. Sam, do you want to kick off with backend updates?",
      },
      {
        id: "t2-2",
        meetingId: "meeting-2",
        speakerName: "Sam Rivera",
        speakerInitials: "SR",
        timestampSeconds: 25,
        text: "Sure! Big win yesterday on the search indexing pipeline.",
      },
      {
        id: "t2-3",
        meetingId: "meeting-2",
        speakerName: "Sam Rivera",
        speakerInitials: "SR",
        timestampSeconds: 48,
        text: "By switching to trigram indexing on PostgreSQL, transcript fuzzy searches now resolve in 65 milliseconds across thousands of hours of audio.",
      },
      {
        id: "t2-4",
        meetingId: "meeting-2",
        speakerName: "David Chen",
        speakerInitials: "DC",
        timestampSeconds: 70,
        text: "That is massive. It was hovering around 400ms last week when users searched long calls. Any blockers on that?",
      },
      {
        id: "t2-5",
        meetingId: "meeting-2",
        speakerName: "Sam Rivera",
        speakerInitials: "SR",
        timestampSeconds: 95,
        text: "No blockers on search. The only thing is we need to migrate the staging database to the new replica cluster tonight around 8 PM.",
      },
      {
        id: "t2-6",
        meetingId: "meeting-2",
        speakerName: "David Chen",
        speakerInitials: "DC",
        timestampSeconds: 120,
        text: "I'll put an announcement in the #eng-general Slack channel so people know staging will have a brief 10-minute maintenance window.",
      },
      {
        id: "t2-7",
        meetingId: "meeting-2",
        speakerName: "David Chen",
        speakerInitials: "DC",
        timestampSeconds: 145,
        text: "Maya, how's the frontend coming along with the meeting detail layout?",
      },
      {
        id: "t2-8",
        meetingId: "meeting-2",
        speakerName: "Maya Patel",
        speakerInitials: "MP",
        timestampSeconds: 175,
        text: "The two-column split is working really cleanly now. Left side has the full transcript with speakers and timestamps.",
      },
      {
        id: "t2-9",
        meetingId: "meeting-2",
        speakerName: "Maya Patel",
        speakerInitials: "MP",
        timestampSeconds: 210,
        text: "The right sidebar is sticky with the Summary card and Action Items card. It adapts nicely even on smaller 13-inch MacBooks.",
      },
      {
        id: "t2-10",
        meetingId: "meeting-2",
        speakerName: "Jordan Taylor",
        speakerInitials: "JT",
        timestampSeconds: 240,
        text: "Maya, did you get a chance to see the updated checkbox micro-interaction specs I dropped in Figma yesterday?",
      },
      {
        id: "t2-11",
        meetingId: "meeting-2",
        speakerName: "Maya Patel",
        speakerInitials: "MP",
        timestampSeconds: 265,
        text: "Yes! Love the green check animation with the strike-through. I'm hooking up the optimistic state update this afternoon.",
      },
      {
        id: "t2-12",
        meetingId: "meeting-2",
        speakerName: "Jordan Taylor",
        speakerInitials: "JT",
        timestampSeconds: 295,
        text: "Awesome. I also added assignee avatar badges next to each action item so you know who owns what at a glance.",
      },
      {
        id: "t2-13",
        meetingId: "meeting-2",
        speakerName: "David Chen",
        speakerInitials: "DC",
        timestampSeconds: 340,
        text: "That aligns with our product angle: making action items feel like a lightweight task manager instead of a dead text dump.",
      },
      {
        id: "t2-14",
        meetingId: "meeting-2",
        speakerName: "Jordan Taylor",
        speakerInitials: "JT",
        timestampSeconds: 380,
        text: "I'll export the clean SVG icons for the summary template switcher by noon today.",
      },
      {
        id: "t2-15",
        meetingId: "meeting-2",
        speakerName: "David Chen",
        speakerInitials: "DC",
        timestampSeconds: 420,
        text: "Sounds like we're in great shape for tomorrow's sprint review. Anything else before we drop off?",
      },
      {
        id: "t2-16",
        meetingId: "meeting-2",
        speakerName: "Sam Rivera",
        speakerInitials: "SR",
        timestampSeconds: 445,
        text: "All good on my side.",
      },
      {
        id: "t2-17",
        meetingId: "meeting-2",
        speakerName: "Maya Patel",
        speakerInitials: "MP",
        timestampSeconds: 450,
        text: "Same here!",
      },
      {
        id: "t2-18",
        meetingId: "meeting-2",
        speakerName: "David Chen",
        speakerInitials: "DC",
        timestampSeconds: 460,
        text: "Great! Thanks everyone, talk soon.",
      },
    ],
  },

  // 3. Client Onboarding Kickoff
  {
    id: "meeting-3",
    title: "Client Onboarding — Northwind Inc",
    date: "2026-09-18T16:00:00Z",
    durationMinutes: 45,
    thumbnail: "/images/thumb_onboarding.jpg",
    participants: [
      {
        name: "Elena Rostova",
        email: "elena@fanthom.ai",
        initials: "ER",
        avatarColor: "#4E46DC",
        role: "Customer Success Lead, Fanthom",
      },
      {
        name: "Marcus Vance",
        email: "mvance@northwind.com",
        initials: "MV",
        avatarColor: "#1FA97A",
        role: "IT Systems Admin, Northwind",
      },
      {
        name: "Chloe Bennett",
        email: "cbennett@northwind.com",
        initials: "CB",
        avatarColor: "#FF6B5B",
        role: "Operations Director, Northwind",
      },
    ],
    summary: [
      {
        id: "s3-1",
        meetingId: "meeting-3",
        order: 1,
        category: "Account Provisioning",
        text: "Successfully verified Northwind's Google Workspace domain integration and configured automated calendar syncing for 60 knowledge workers.",
      },
      {
        id: "s3-2",
        meetingId: "meeting-3",
        order: 2,
        category: "Privacy Controls",
        text: "Configured exclusion filters to automatically skip recording any meeting tagged with 'Confidential', '1:1', or internal HR disciplinary keywords.",
      },
      {
        id: "s3-3",
        meetingId: "meeting-3",
        order: 3,
        category: "Bot-Free Capture",
        text: "Demonstrated local desktop audio capture without requiring guest attendees to grant special recording permissions in Zoom and Google Meet.",
      },
      {
        id: "s3-4",
        meetingId: "meeting-3",
        order: 4,
        category: "Training Milestones",
        text: "Scheduled team-wide kickoff training webinar for Wednesday, September 23 at 10 AM EST.",
      },
    ],
    actionItems: [
      {
        id: "a3-1",
        meetingId: "meeting-3",
        text: "Whitelabel Fanthom OAuth app in Google Workspace admin console",
        isDone: true,
        assignee: "Marcus Vance",
        dueDate: "2026-09-19",
      },
      {
        id: "a3-2",
        meetingId: "meeting-3",
        text: "Send calendar invite and Zoom link for company-wide onboarding session",
        isDone: false,
        assignee: "Elena Rostova",
        dueDate: "2026-09-21",
      },
      {
        id: "a3-3",
        meetingId: "meeting-3",
        text: "Compile list of default Slack channels for automated meeting recap routing",
        isDone: false,
        assignee: "Chloe Bennett",
        dueDate: "2026-09-22",
      },
    ],
    highlights: [
      {
        id: "h3-1",
        meetingId: "meeting-3",
        timestampSeconds: 780,
        speakerName: "Chloe Bennett",
        quoteText:
          "Having exclusion rules based on meeting titles is essential for us so our people know executive reviews and sensitive HR sessions are never recorded.",
      },
      {
        id: "h3-2",
        meetingId: "meeting-3",
        timestampSeconds: 1420,
        speakerName: "Marcus Vance",
        quoteText:
          "The Google Workspace single-click tenant authorization took literally 90 seconds. Best enterprise software setup I've experienced all year.",
      },
    ],
    transcript: [
      {
        id: "t3-1",
        meetingId: "meeting-3",
        speakerName: "Elena Rostova",
        speakerInitials: "ER",
        timestampSeconds: 20,
        text: "Welcome Marcus and Chloe! Really thrilled to kick off Northwind's rollout of Fanthom today.",
      },
      {
        id: "t3-2",
        meetingId: "meeting-3",
        speakerName: "Chloe Bennett",
        speakerInitials: "CB",
        timestampSeconds: 45,
        text: "Thanks Elena! The operations team has been counting down the days. We have so many cross-functional projects that fall through the cracks.",
      },
      {
        id: "t3-3",
        meetingId: "meeting-3",
        speakerName: "Marcus Vance",
        speakerInitials: "MV",
        timestampSeconds: 65,
        text: "From the IT side, my main priorities today are domain-level authentication and making sure our privacy boundaries are locked down.",
      },
      {
        id: "t3-4",
        meetingId: "meeting-3",
        speakerName: "Elena Rostova",
        speakerInitials: "ER",
        timestampSeconds: 95,
        text: "Let's start right there with IT and security. I'll share my screen and walk Marcus through the Google Workspace admin portal.",
      },
      {
        id: "t3-5",
        meetingId: "meeting-3",
        speakerName: "Marcus Vance",
        speakerInitials: "MV",
        timestampSeconds: 150,
        text: "I see the application manifest in our admin console now. Let me grant the calendar read and webhook permissions.",
      },
      {
        id: "t3-6",
        meetingId: "meeting-3",
        speakerName: "Marcus Vance",
        speakerInitials: "MV",
        timestampSeconds: 215,
        text: "Done! The Google Workspace single-click tenant authorization took literally 90 seconds. Best enterprise software setup I've experienced all year.",
      },
      {
        id: "t3-7",
        meetingId: "meeting-3",
        speakerName: "Elena Rostova",
        speakerInitials: "ER",
        timestampSeconds: 240,
        text: "Fantastic! Now let's configure your privacy policies in the Fanthom settings panel.",
      },
      {
        id: "t3-8",
        meetingId: "meeting-3",
        speakerName: "Chloe Bennett",
        speakerInitials: "CB",
        timestampSeconds: 285,
        text: "We want to make sure certain meetings are strictly blacklisted from automated capture — like 1-on-1 performance reviews, legal syncs, and board discussions.",
      },
      {
        id: "t3-9",
        meetingId: "meeting-3",
        speakerName: "Elena Rostova",
        speakerInitials: "ER",
        timestampSeconds: 320,
        text: "Under Workspace Governance, you can define regex or keyword exclusion rules. For instance, any calendar event matching 'Private', 'Confidential', '1:1', or 'HR' will be bypassed completely.",
      },
      {
        id: "t3-10",
        meetingId: "meeting-3",
        speakerName: "Chloe Bennett",
        speakerInitials: "CB",
        timestampSeconds: 780,
        text: "Having exclusion rules based on meeting titles is essential for us so our people know executive reviews and sensitive HR sessions are never recorded.",
      },
      {
        id: "t3-11",
        meetingId: "meeting-3",
        speakerName: "Marcus Vance",
        speakerInitials: "MV",
        timestampSeconds: 830,
        text: "What happens if someone accidentally records a meeting that should have been private?",
      },
      {
        id: "t3-12",
        meetingId: "meeting-3",
        speakerName: "Elena Rostova",
        speakerInitials: "ER",
        timestampSeconds: 865,
        text: "Any meeting host or team admin can permanently purge a meeting record with one click, which instantly erases transcripts, audio buffers, and vector embeddings.",
      },
      {
        id: "t3-13",
        meetingId: "meeting-3",
        speakerName: "Chloe Bennett",
        speakerInitials: "CB",
        timestampSeconds: 940,
        text: "That gives our leadership team total peace of mind.",
      },
      {
        id: "t3-14",
        meetingId: "meeting-3",
        speakerName: "Elena Rostova",
        speakerInitials: "ER",
        timestampSeconds: 980,
        text: "Next, how would you like team summaries delivered? We can route automated recaps to relevant Slack channels right after calls finish.",
      },
      {
        id: "t3-15",
        meetingId: "meeting-3",
        speakerName: "Chloe Bennett",
        speakerInitials: "CB",
        timestampSeconds: 1040,
        text: "I'll compile a mapping of our main department channels like #ops-team and #product-announcements by Tuesday.",
      },
      {
        id: "t3-16",
        meetingId: "meeting-3",
        speakerName: "Elena Rostova",
        speakerInitials: "ER",
        timestampSeconds: 1110,
        text: "Perfect. And for team training, does next Wednesday September 23 at 10 AM EST work for your whole crew?",
      },
      {
        id: "t3-17",
        meetingId: "meeting-3",
        speakerName: "Chloe Bennett",
        speakerInitials: "CB",
        timestampSeconds: 1145,
        text: "Wednesday at 10 AM is ideal. Please send over the invite and we'll mandate attendance for all department heads.",
      },
      {
        id: "t3-18",
        meetingId: "meeting-3",
        speakerName: "Elena Rostova",
        speakerInitials: "ER",
        timestampSeconds: 1180,
        text: "Will do! Thank you both so much for an ultra-productive kickoff.",
      },
    ],
  },

  // 4. 1:1 Engineering Manager Sync
  {
    id: "meeting-4",
    title: "1:1 with Manager",
    date: "2026-09-15T11:00:00Z",
    durationMinutes: 30,
    thumbnail: "/images/thumb_oneone.jpg",
    participants: [
      {
        name: "Haseeb Ahmad",
        email: "haseeb@fanthom.ai",
        initials: "HA",
        avatarColor: "#4E46DC",
        role: "Software Engineer",
      },
      {
        name: "Rachel Torres",
        email: "rachel@fanthom.ai",
        initials: "RT",
        avatarColor: "#F5A623",
        role: "Engineering Manager",
      },
    ],
    summary: [
      {
        id: "s4-1",
        meetingId: "meeting-4",
        order: 1,
        category: "Product Velocity",
        text: "Rachel praised Haseeb's rapid delivery of the Fanthom core meeting detail screen and adherence to clean architectural separation between transcript and summary components.",
      },
      {
        id: "s4-2",
        meetingId: "meeting-4",
        order: 2,
        category: "Career Growth",
        text: "Reviewed the engineering career rubric for promotion to Senior Software Engineer; Haseeb has demonstrated strong ownership on core UI initiatives and cross-system design.",
      },
      {
        id: "s4-3",
        meetingId: "meeting-4",
        order: 3,
        category: "Professional Development",
        text: "Approved departmental budget sponsorship for Haseeb to attend the upcoming Next.js & AI engineering summit in November.",
      },
    ],
    actionItems: [
      {
        id: "a4-1",
        meetingId: "meeting-4",
        text: "Submit travel and ticket reimbursement request for Next.js Conf",
        isDone: false,
        assignee: "Haseeb Ahmad",
        dueDate: "2026-09-28",
      },
      {
        id: "a4-2",
        meetingId: "meeting-4",
        text: "Draft technical RFC for client-side optimistic updates on action items",
        isDone: true,
        assignee: "Haseeb Ahmad",
        dueDate: "2026-09-18",
      },
      {
        id: "a4-3",
        meetingId: "meeting-4",
        text: "Schedule mid-cycle performance review sync with people ops",
        isDone: false,
        assignee: "Rachel Torres",
        dueDate: "2026-09-30",
      },
    ],
    highlights: [
      {
        id: "h4-1",
        meetingId: "meeting-4",
        timestampSeconds: 420,
        speakerName: "Rachel Torres",
        quoteText:
          "Your work on the meeting detail architecture showed exceptional product empathy. You didn't just build a transcript list — you made the action items feel like an active workspace.",
      },
    ],
    transcript: [
      {
        id: "t4-1",
        meetingId: "meeting-4",
        speakerName: "Rachel Torres",
        speakerInitials: "RT",
        timestampSeconds: 15,
        text: "Hey Haseeb! How has your week been going?",
      },
      {
        id: "t4-2",
        meetingId: "meeting-4",
        speakerName: "Haseeb Ahmad",
        speakerInitials: "HA",
        timestampSeconds: 30,
        text: "Hey Rachel! It's been great. Really heads-down on shipping the core meeting detail screen and testing the responsive layouts.",
      },
      {
        id: "t4-3",
        meetingId: "meeting-4",
        speakerName: "Rachel Torres",
        speakerInitials: "RT",
        timestampSeconds: 65,
        text: "I saw the PR you pushed earlier today. The interaction model is super clean.",
      },
      {
        id: "t4-4",
        meetingId: "meeting-4",
        speakerName: "Rachel Torres",
        speakerInitials: "RT",
        timestampSeconds: 420,
        text: "Your work on the meeting detail architecture showed exceptional product empathy. You didn't just build a transcript list — you made the action items feel like an active workspace.",
      },
      {
        id: "t4-5",
        meetingId: "meeting-4",
        speakerName: "Haseeb Ahmad",
        speakerInitials: "HA",
        timestampSeconds: 460,
        text: "Thanks Rachel! That was our primary design hypothesis: people don't just want to reread a wall of text. They want to check off tasks, assign teammates, and move on with their day.",
      },
      {
        id: "t4-6",
        meetingId: "meeting-4",
        speakerName: "Rachel Torres",
        speakerInitials: "RT",
        timestampSeconds: 510,
        text: "Exactly. Now looking ahead at your growth roadmap, I want to talk about the Senior Engineer track.",
      },
      {
        id: "t4-7",
        meetingId: "meeting-4",
        speakerName: "Haseeb Ahmad",
        speakerInitials: "HA",
        timestampSeconds: 540,
        text: "I'd love that. What specific areas should I be focusing on over the next quarter?",
      },
      {
        id: "t4-8",
        meetingId: "meeting-4",
        speakerName: "Rachel Torres",
        speakerInitials: "RT",
        timestampSeconds: 580,
        text: "You've nailed technical execution and velocity. The main step for Senior is driving architectural RFCs and mentoring junior contributors on state management and accessibility.",
      },
      {
        id: "t4-9",
        meetingId: "meeting-4",
        speakerName: "Haseeb Ahmad",
        speakerInitials: "HA",
        timestampSeconds: 630,
        text: "Makes total sense. I've already drafted an RFC on client-side optimistic UI patterns for collaborative editing.",
      },
      {
        id: "t4-10",
        meetingId: "meeting-4",
        speakerName: "Rachel Torres",
        speakerInitials: "RT",
        timestampSeconds: 675,
        text: "Also, your request to attend the Next.js and AI summit in November was approved by leadership. We'll cover conference registration, flights, and lodging.",
      },
      {
        id: "t4-11",
        meetingId: "meeting-4",
        speakerName: "Haseeb Ahmad",
        speakerInitials: "HA",
        timestampSeconds: 710,
        text: "That's incredible! Thank you so much Rachel, I'll submit the expense form through our finance portal this week.",
      },
      {
        id: "t4-12",
        meetingId: "meeting-4",
        speakerName: "Rachel Torres",
        speakerInitials: "RT",
        timestampSeconds: 745,
        text: "Well deserved. Keep up the high standard, Haseeb!",
      },
    ],
  },

  // 5. Strategic Q3 Planning Sync
  {
    id: "meeting-5",
    title: "Q3 Planning Sync",
    date: "2026-09-12T15:00:00Z",
    durationMinutes: 60,
    thumbnail: "/images/thumb_planning.jpg",
    participants: [
      {
        name: "Liam Parker",
        email: "liam@fanthom.ai",
        initials: "LP",
        avatarColor: "#4E46DC",
        role: "VP of Product",
      },
      {
        name: "Priya Sharma",
        email: "priya@fanthom.ai",
        initials: "PS",
        avatarColor: "#1FA97A",
        role: "Head of Engineering",
      },
      {
        name: "Noah Kim",
        email: "noah@fanthom.ai",
        initials: "NK",
        avatarColor: "#FF6B5B",
        role: "Growth Product Manager",
      },
      {
        name: "David Chen",
        email: "david@fanthom.ai",
        initials: "DC",
        avatarColor: "#F5A623",
        role: "Tech Lead",
      },
      {
        name: "Maya Patel",
        email: "maya@fanthom.ai",
        initials: "MP",
        avatarColor: "#8B85F5",
        role: "Senior Frontend Engineer",
      },
    ],
    summary: [
      {
        id: "s5-1",
        meetingId: "meeting-5",
        order: 1,
        category: "Strategic Direction",
        text: "Decided to prioritize 'Ask Fanthom' cross-meeting natural language search and collaborative action items as the two marquee product pillars for Q3.",
      },
      {
        id: "s5-2",
        meetingId: "meeting-5",
        order: 2,
        category: "Feature Cuts",
        text: "Deliberately deprioritized deep Salesforce bi-directional sync to Q4 in order to stay hyper-focused on core transcription speed and meeting recap UX.",
      },
      {
        id: "s5-3",
        meetingId: "meeting-5",
        order: 3,
        category: "Performance Benchmarks",
        text: "Engineering committed to a strict SLA: generating 95% of call summaries in under 35 seconds across Zoom, Google Meet, and Teams.",
      },
      {
        id: "s5-4",
        meetingId: "meeting-5",
        order: 4,
        category: "Growth & Retention",
        text: "Noah reported an 18% lift in week-2 user retention when users configure their first automated Slack channel recap integration.",
      },
      {
        id: "s5-5",
        meetingId: "meeting-5",
        order: 5,
        category: "Audit Milestones",
        text: "Targeting complete SOC 2 Type II external audit sign-off by end of October.",
      },
    ],
    actionItems: [
      {
        id: "a5-1",
        meetingId: "meeting-5",
        text: "Publish final Q3 product roadmap one-pager in Notion",
        isDone: true,
        assignee: "Liam Parker",
        dueDate: "2026-09-14",
      },
      {
        id: "a5-2",
        meetingId: "meeting-5",
        text: "Benchmark streaming LLM response latency for Ask Fanthom cross-meeting search",
        isDone: true,
        assignee: "Priya Sharma",
        dueDate: "2026-09-19",
      },
      {
        id: "a5-3",
        meetingId: "meeting-5",
        text: "Design onboarding tooltip tour highlighting the Ask panel shortcut",
        isDone: false,
        assignee: "Noah Kim",
        dueDate: "2026-09-28",
      },
      {
        id: "a5-4",
        meetingId: "meeting-5",
        text: "Conduct load test simulating 500 concurrent meeting audio streams",
        isDone: false,
        assignee: "David Chen",
        dueDate: "2026-09-30",
      },
    ],
    highlights: [
      {
        id: "h5-1",
        meetingId: "meeting-5",
        timestampSeconds: 615,
        speakerName: "Liam Parker",
        quoteText:
          "We cannot afford to be another generic transcription clone. Our identity is instant summaries, zero intrusive bots, and turning raw conversation into real working tasks.",
      },
      {
        id: "h5-2",
        meetingId: "meeting-5",
        timestampSeconds: 1840,
        speakerName: "Priya Sharma",
        quoteText:
          "By streaming the chunked audio through local Whisper models, we're cutting summary generation time down to 28 seconds post-call.",
      },
    ],
    transcript: [
      {
        id: "t5-1",
        meetingId: "meeting-5",
        speakerName: "Liam Parker",
        speakerInitials: "LP",
        timestampSeconds: 25,
        text: "Welcome everyone to our Q3 strategy alignment. Today we're locking down what we build, what we cut, and where we invest engineering bandwidth.",
      },
      {
        id: "t5-2",
        meetingId: "meeting-5",
        speakerName: "Priya Sharma",
        speakerInitials: "PS",
        timestampSeconds: 55,
        text: "Excited for this. The engineering team has clear momentum after our performance sprint, so setting crisp priorities will keep us humming.",
      },
      {
        id: "t5-3",
        meetingId: "meeting-5",
        speakerName: "Liam Parker",
        speakerInitials: "LP",
        timestampSeconds: 90,
        text: "Let's confront the biggest question: do we pour resources into enterprise CRM bi-directional syncing, or double down on our core product experience?",
      },
      {
        id: "t5-4",
        meetingId: "meeting-5",
        speakerName: "Noah Kim",
        speakerInitials: "NK",
        timestampSeconds: 140,
        text: "Looking at our user cohort data, CRM sync only matters to a narrow slice of enterprise sales managers. But 100% of our users live in their meeting notes every day.",
      },
      {
        id: "t5-5",
        meetingId: "meeting-5",
        speakerName: "Liam Parker",
        speakerInitials: "LP",
        timestampSeconds: 615,
        text: "We cannot afford to be another generic transcription clone. Our identity is instant summaries, zero intrusive bots, and turning raw conversation into real working tasks.",
      },
      {
        id: "t5-6",
        meetingId: "meeting-5",
        speakerName: "Priya Sharma",
        speakerInitials: "PS",
        timestampSeconds: 650,
        text: "I completely agree with Liam and Noah. Salesforce and HubSpot integrations are maintenance sinks with endless edge cases. Let's push CRM sync to Q4.",
      },
      {
        id: "t5-7",
        meetingId: "meeting-5",
        speakerName: "David Chen",
        speakerInitials: "DC",
        timestampSeconds: 710,
        text: "Pushing CRM sync frees up two senior engineers to focus purely on the Ask Fanthom cross-meeting search index and sub-30-second summary generation.",
      },
      {
        id: "t5-8",
        meetingId: "meeting-5",
        speakerName: "Maya Patel",
        speakerInitials: "MP",
        timestampSeconds: 760,
        text: "On the frontend, that also allows us to build the persistent Action Items task manager — making tasks checkable, assignable, and filterable right on the meeting page.",
      },
      {
        id: "t5-9",
        meetingId: "meeting-5",
        speakerName: "Noah Kim",
        speakerInitials: "NK",
        timestampSeconds: 830,
        text: "Our retention numbers back this up. Users who interact with their action items within 24 hours of a call have a 3.2x higher 30-day retention rate.",
      },
      {
        id: "t5-10",
        meetingId: "meeting-5",
        speakerName: "Priya Sharma",
        speakerInitials: "PS",
        timestampSeconds: 1840,
        text: "By streaming the chunked audio through local Whisper models, we're cutting summary generation time down to 28 seconds post-call.",
      },
      {
        id: "t5-11",
        meetingId: "meeting-5",
        speakerName: "Liam Parker",
        speakerInitials: "LP",
        timestampSeconds: 1910,
        text: "Under 30 seconds is our killer metric. That means by the time a user closes their laptop and opens Slack, the summary is already waiting for them.",
      },
      {
        id: "t5-12",
        meetingId: "meeting-5",
        speakerName: "David Chen",
        speakerInitials: "DC",
        timestampSeconds: 1980,
        text: "We'll run a stress test next week simulating 500 concurrent live streams to verify our pipeline handles peak 9 AM Monday load.",
      },
      {
        id: "t5-13",
        meetingId: "meeting-5",
        speakerName: "Liam Parker",
        speakerInitials: "LP",
        timestampSeconds: 2050,
        text: "What about SOC 2 Type II audit readiness? Any red flags from external auditors?",
      },
      {
        id: "t5-14",
        meetingId: "meeting-5",
        speakerName: "Priya Sharma",
        speakerInitials: "PS",
        timestampSeconds: 2110,
        text: "Audit is progressing smoothly. The auditor tested our automated log sanitization and encryption keys last Tuesday. We are on track for final certification by late October.",
      },
      {
        id: "t5-15",
        meetingId: "meeting-5",
        speakerName: "Noah Kim",
        speakerInitials: "NK",
        timestampSeconds: 2180,
        text: "Once that badge is live, our enterprise inbound conversion will double. Big kudos to the infra team.",
      },
      {
        id: "t5-16",
        meetingId: "meeting-5",
        speakerName: "Liam Parker",
        speakerInitials: "LP",
        timestampSeconds: 2240,
        text: "This has been our most focused roadmap session yet. Let's document these decisions in Notion and execute with ruthless precision.",
      },
    ],
  },
];

// Flat export helpers for direct queries
export const mockTranscriptLines: TranscriptLine[] = mockMeetings.flatMap((m) => m.transcript);
export const mockSummaryBullets: SummaryBullet[] = mockMeetings.flatMap((m) => m.summary);
export const mockActionItems: ActionItem[] = mockMeetings.flatMap((m) => m.actionItems);
export const mockHighlights: Highlight[] = mockMeetings.flatMap((m) => m.highlights);
