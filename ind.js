const quotes = [
  "🚀 One small topic at a time, one giant leap for your brain!",
  "🔥 You’re not tired, you’re just early in the game.",
  "🎯 Focus beats motivation every time. But today you have both!",
  "🏆 Study hard, level up your life!",
  "🧠 Train your brain like a pro. Knowledge = power!"
];

document.getElementById("quote").innerText =
  quotes[Math.floor(Math.random() * quotes.length)];

let topics = [];
let history = [];

function addTopic(name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  topics.push({ name: trimmed, status: "not-started" });
}

function changeStatus(index) {
  const topic = topics[index];
  if (topic.status === "not-started") {
    topic.status = "ongoing";
  } else if (topic.status === "ongoing") {
    topic.status = "completed";
    const timestamp = new Date().toLocaleString();
    history.push({ name: topic.name, completedAt: timestamp });
    renderHistory();
    alert("🏆 Mission Complete!\n🎉 You earned 50 XP!\nKeep going!");
  } else {
    topic.status = "not-started";
  }
  renderTopics();
}

function renderTopics() {
  const container = document.getElementById("topics");
  container.innerHTML = '<h2 class="section-title">🎯 Missions</h2>';
  topics.forEach((topic, index) => {
    let icon = topic.status === "not-started" ? "🔴" :
               topic.status === "ongoing" ? "🔥" : "✅";
    let label = topic.status === "not-started" ? "Start" :
                topic.status === "ongoing" ? "In Progress" : "Completed 🎉";

    const div = document.createElement("div");
    div.className = "topic-item";
    div.innerHTML = `
      <strong>${index + 1}. ${icon} ${topic.name}</strong>
      <span class="badge ${topic.status}" onclick="changeStatus(${index})">
        ${label}
      </span>`;
    container.appendChild(div);
  });

  const topicCount = document.createElement("p");
  topicCount.innerHTML = `<strong>Total missions loaded:</strong> ${topics.length}`;
  container.appendChild(topicCount);
}

function renderHistory() {
  const container = document.getElementById("history");
  const count = history.length;
  const content = history.map(entry =>
    `<p>✅ <strong>${entry.name}</strong> - Completed on ${entry.completedAt}</p>`
  ).join("");
  container.innerHTML = `<h2 class="section-title">📈 Progress</h2>
    <p><strong>Total missions completed:</strong> ${count}</p>
    ${content || "<p>No missions completed yet.</p>"}`;
}

function loadTopics() {
  const input = document.getElementById("syllabusInput").value;
  const lines = input.split("\n").map(line => line.trim()).filter(line => line.length);
  topics = [];
  lines.forEach(addTopic);
  renderTopics();
}
