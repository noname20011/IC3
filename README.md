Format Question Data

[
  {
    "id": 1,
    "type": "single",
    "text": "HTML là viết tắt của?",
    "options": [
      { "id": 1, "value": "Hyper Text Markup Language", "isCorrect": true },
      { "id": 2, "value": "High Tech Modern Language", "isCorrect": false },
      { "id": 3, "value": "Home Tool Markup Language", "isCorrect": false }
    ]
  },
    {
      "id": 2,
      "type": "multiple",
      "text": "Chọn các thẻ HTML hợp lệ:",
      "options": [
        { "id": 1, "value": "<div>", "isCorrect": true },
        { "id": 2, "value": "<span>", "isCorrect": true },
        { "id": 3, "value": "<section>", "isCorrect": true },
        { "id": 4, "value": "<invalid>", "isCorrect": false }
      ]
    },
  {
    "id": 6,
    "type": "truefalse",
    "text": "Bạn cần thêm một tác phẩm nghệ thuật vào bài trình chiếu cho lớp học. Bạn không có thời gian xin giấy phép. Với mỗi phát biểu, hãy chọn Có nếu hợp pháp, Không nếu không.",
    "optionsOfTrueFalseType": ["Có", "Không"],
    "statements": [
      {
        "id": 1,
        "value": "Tác giả là người quen của bạn",
        "isCorrect": false
      },
      {
        "id": 2,
        "value": "Các tác phẩm nghệ thuật được bản quyền bảo vệ",
        "isCorrect": false
      },
      {
        "id": 3,
        "value": "Chủ sở hữu bản quyền đã chuyển tác phẩm nghệ thuật sang phạm vi công cộng",
        "isCorrect": true
      }
    ],
    "explanation": "Chỉ khi tác phẩm đã được đưa vào phạm vi công cộng thì mới có thể sử dụng hợp pháp mà không cần giấy phép."
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
