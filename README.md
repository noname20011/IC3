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
    "optionsOfTrueFalseType": ["Đúng", "Sai"],
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
        "left": { "value": "" },
        "right": { "value": "" },
        "isCorrect": true
      },
      {
        "left": { "value": "" },
        "right": { "value": "" },
        "isCorrect": true
      },
      {
        "left": { "value": "" },
        "right": { "value": "" },
        "isCorrect": true
      }
    ]
  },
  {
    "id": 24,
    "type": "hotspot",
    "text": "Đâu là ba thiết bị nhập khi được kết nối với máy tính không có màn hình cảm ứng? (Chọn 3)",
    "imageUrl": "/assets/question/OT1_q8.png",
    "totalRequiredHotSpot": 3,
    "hotSpots": [
      {
        "label": "headset",
        "top": 4.27,
        "left": 4.82,
        "width": 23.23,
        "height": 40.14
      },
      {
        "label": "mouse",
        "top": 5.06,
        "left": 40,
        "width": 21.98,
        "height": 37.39
      },
      {
        "label": "keyboard",
        "top": 53.44,
        "left": 34.17,
        "width": 32,
        "height": 36.47
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
