Format Question Data

[
  {
    "id": 1,
    "type": "single",
    "text": "",
    "options": [
      { "id": 1, "value": "", "isCorrect": true },
      { "id": 2, "value": "", "isCorrect": false },
      { "id": 3, "value": "", "isCorrect": false },
      { "id": 4, "value": "", "isCorrect": false }
    ]
  },
    {
      "id": 2,
      "type": "multiple",
      "text": "",
      "options": [
        { "id": 1, "value": "", "isCorrect": true },
        { "id": 2, "value": "", "isCorrect": true },
        { "id": 3, "value": "", "isCorrect": true },
        { "id": 4, "value": "", "isCorrect": false }
      ]
    },
  {
    "id": 6,
    "type": "truefalse",
    "text": "",
    "optionsOfTrueFalseType": ["Có", "Không"],
    "statements": [
      {
        "id": 1,
        "value": "",
        "isCorrect": false
      },
      {
        "id": 2,
        "value": "",
        "isCorrect": false
      },
      {
        "id": 3,
        "value": "",
        "isCorrect": true
      }
    ]
  },
  {
    "id": 3,
    "type": "reorder",
    "text": "Sắp xếp các bước tạo project React",
    "options": [
      { "id": 1, "value": "npm create vite", "orderIndex": 2 },
      { "id": 2, "value": "cd project", "orderIndex": 1 },
      { "id": 3, "value": "npm install", "orderIndex": 3 },
      { "id": 4, "value": "npm run dev", "orderIndex": 4 }
    ]
  },
  {
    "id": 4,
    "type": "match",
    "text": "Nối ngôn ngữ với framework",
    "pairs": [
      
      {
        "id": 1,
        "left": { "id": 1, "value": "JavaScript" },
        "right": { "id": 4, "value": "React" },
        "isCorrect": true
      },
      {
        "id": 2,
        "left": { "id": 2, "value": "Python" },
        "right": { "id": 5, "value": "Django" },
        "isCorrect": true
      },
      {
        "id": 3,
        "left": { "id": 3, "value": "Java" },
        "right": { "id": 6, "value": "Spring" },
        "isCorrect": true
      }
    ]
  },
  {
    "id": 5,
    "type": "hotspot",
    "text": "Chọn logo React trong ảnh",
    "image": "/images/logos.png",
    "hotSpots": [
      {
        "label": "react",
        "x": "50px",
        "y": "20px",
        "w": "80px",
        "h": "80px",
        "isCorrect": true
      },
      {
        "label": "vue",
        "x": "150px",
        "y": "20px",
        "w": "80px",
        "h": "80px",
        "isCorrect": false
      }
    ]
  }
]


// Kết nối tới WebSocket
const socket = new SockJS('http://localhost:8080/ws-leaderboard');
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => {
    stompClient.subscribe(`/topic/leaderboard/${classroomId}`, (message) => {
        if (message.body === "UPDATE_COMMAND") {
            // Gọi API lấy lại danh sách điểm mới nhất để cập nhật UI
            fetchLeaderboardData(); 
            toast.success("Bảng xếp hạng vừa có thay đổi!");
        }
    });
});
