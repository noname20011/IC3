import { QuizLevel, School, LeaderboardEntry } from "../../types";

export const MOCK_LEVELS: QuizLevel[] = [
  {
    id: "l1",
    name: "Level 1",
    description: "Foundational concepts and basic knowledge.",
    parts: [
      { id: 1, name: "Bổ sung", levelId: "l1", description: "Phần ôn tập sổ sung số 2", duration: 20, questionCount: 22 },
    ],
  },
  {
    id: "l2",
    name: "Level 2",
    description: "Intermediate challenges and complex scenarios.",
    parts: [
      // { id: 4, name: "Phần 1", levelId: "l2", description: "Phần thi cơ bản số 1", duration: 45, questionCount: 0 },
      // { id: 5, name: "Phần 2", levelId: "l2", description: "Phần thi cơ bản số 2", duration: 45, questionCount: 0 },
      // { id: 6, name: "GM", levelId: "l2", description: "Phần thi GM cấp độ 1", duration: 60, questionCount: 0 },
    ],
  },
  {
    id: "l3",
    name: "Level 3",
    description: "Advanced mastery and expert level analysis.",
    parts: [
      // { id: 7, name: "Part 1", levelId: "l3" },
      // { id: 8, name: "Part 2", levelId: "l3" },
    ],
  },
  {
    id: "practice",
    name: "Practice Exam",
    description: "Full-length simulation of the final assessment.",
    parts: [
      // { id: 9, name: "Mock A", levelId: "practice" },
      // { id: 10, name: "Mock B", levelId: "practice" },
    ],
  },
];

export const MOCK_SCHOOLS: School[] = [
  { id: "s1", name: "THCS Huỳnh Văn Nghệ", location: "New York" },
  { id: "s2", name: "THCS Yên Thế", location: "Los Angeles" },
  { id: "s3", name: "THCS Nguyễn Trãi", location: "Chicago" },
  { id: "s4", name: "THCS Trần Đại Nghĩa", location: "Boston" },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: "u1", name: "Tôn Nữ Tú Anh", score: 450, school: "THCS Huỳnh Văn Nghệ", class: "6A4", rank: 1, avatar: "https://picsum.photos/seed/u1/100/100" },
  { id: "u2", name: "Nguyễn Linh Anh", score: 450, school: "THCS Yên Thế", class: "7A1", rank: 2, avatar: "https://picsum.photos/seed/u2/100/100" },
  { id: "u3", name: "Hồ Quang Tùng", score: 450, school: "THCS Huỳnh Văn Nghệ", class: "8A2", rank: 3, avatar: "https://picsum.photos/seed/u3/100/100" },
  { id: "u4", name: "whitefish664", score: 96, school: "Riverdale", rank: 4, class: "8/2", avatar: "https://picsum.photos/seed/u4/100/100" },
  { id: "u5", name: "sadpanda176", score: 88, school: "St. Mary's", rank: 5, class: "8/2", avatar: "https://picsum.photos/seed/u5/100/100" },
  { id: "u6", name: "silverduck204", score: 87, school: "Westside", rank: 6, class: "8/2", avatar: "https://picsum.photos/seed/u6/100/100" },
  { id: "u7", name: "beautifulmouse112", score: 85, school: "Lincoln", rank: 7, class: "8/2", avatar: "https://picsum.photos/seed/u7/100/100" },
];
