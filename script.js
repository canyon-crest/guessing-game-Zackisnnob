var rawName = prompt("Welcome to NUMBLAST! What is your agent name?") || "Player";
var playerName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();

var answer = 0;
var range = 0;
var guessCount = 0;
var totalWins = 0;
var totalGames = 0;
var totalGuesses = 0;
var scores = [];
var scoreDiffs = [];
var startTime = 0;
var allTimes = [];
var fastestTime = null;
var roundNum = 0;
var isPlaying = false;
var customActive = false;

var monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function getDaySuffix(d) {
  if (d >= 11 && d <= 13) return "th";
  var last = d % 10;
  if (last === 1) return "st";
  if (last === 2) return "nd";
  if (last === 3) return "rd";
  return "th";
}

function time() {
  var now = new Date();
  var month = monthNames[now.getMonth()];
  var day = now.getDate();
  var suffix = getDaySuffix(day);
  var year = now.getFullYear();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;
  return month + " " + day + suffix + ", " + year + " — " + hours + ":" + minutes + ":" + seconds + " " + ampm;
}

document.getElementById("date").textContent = time();
setInterval(function() {
  document.getElementById("date").textContent = time();
}, 1000);

document.getElementById("playerNameDisplay").textContent = "AGENT " + playerName.toUpperCase();

(function spawnParticles() {
  var container = document.getElementById("particles");
  var colors = ["#00f5d4","#f72585","#f9c74f","#4cc9f0","#7b2fff"];
  for (var i = 0; i < 25; i++) {
    (function(idx) {
      setTimeout(function() {
        var p = document.createElement("div");
        p.className = "particle";
        var size = Math.random() * 4 + 2;
        p.style.cssText = [
          "width:" + size + "px",
          "height:" + size + "px",
          "left:" + Math.random() * 100 + "%",
          "bottom:0",
          "background:" + colors[Math.floor(Math.random() * colors.length)],
          "animation-duration:" + (Math.random() * 12 + 8) + "s",
          "animation-delay:" + (Math.random() * 8) + "s"
        ].join(";");
        container.appendChild(p);
      }, idx * 200);
    })(i);
  }
})();

document.getElementById("themeBtn").addEventListener("click", function() {
  document.body.classList.toggle("light");
  showToast(document.body.classList.contains("light") ? "Light mode" : "Dark mode", "info");
});

document.getElementById("customBtn").addEventListener("click", function() {
  var minVal = parseInt(document.getElementById("customMin").value);
  var maxVal = parseInt(document.getElementById("customMax").value);
  if (isNaN(minVal) || isNaN(maxVal) || minVal >= maxVal || minVal < 1) {
    showToast("Invalid range — min must be less than max", "bad");
    return;
  }
  document.getElementsByName("level").forEach(function(r) { r.checked = false; });
  range = maxVal - minVal + 1;
  customActive = true;
  window._customMin = minVal;
  window._customMax = maxVal;
  showToast("Custom range " + minVal + " to " + maxVal + " set", "good");
});

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && isPlaying) {
    makeGuess();
  }
});

document.getElementById("resetStatsBtn").addEventListener("click", function() {
  if (!confirm("Reset all stats and leaderboard?")) return;
  totalWins = totalGames = totalGuesses = 0;
  scores = [];
  scoreDiffs = [];
  allTimes = [];
  fastestTime = null;
  document.getElementById("wins").textContent = "0";
  document.getElementById("avgScore").textContent = "—";
  document.getElementById("fastest").textContent = "—";
  document.getElementById("avgTime").textContent = "—";
  document.getElementById("winRate").textContent = "—";
  updateLeaderboardDisplay();
  clearHistoryDisplay();
  showToast("Stats reset", "info");
});

function play() {
  clearHistoryDisplay();
  document.getElementById("feedbackBanner").textContent = "";
  document.getElementById("proxHint").textContent = "—";

  if (!customActive) {
    var levels = document.getElementsByName("level");
    for (var i = 0; i < levels.length; i++) {
      if (levels[i].checked) {
        range = parseInt(levels[i].value);
      }
      levels[i].disabled = true;
    }
    window._customMin = 1;
    window._customMax = range;
  }

  answer = Math.floor(Math.random() * range) + 1;
  guessCount = 0;
  roundNum++;
  startTime = new Date().getTime();
  isPlaying = true;

  setProximityBar(null);
  document.getElementById("proximityCursor").style.display = "none";

  setChip("roundNum", roundNum);
  setChip("guessDisplay", 0);

  var minV = window._customMin || 1;
  var maxV = window._customMax || range;
  setMsg(playerName + " — guess between " + minV + " and " + maxV + "!", "Type your number and fire", "");

  document.getElementById("guessBtn").disabled = false;
  document.getElementById("giveUpBtn").disabled = false;
  document.getElementById("playBtn").disabled = true;
  document.getElementById("customBtn").disabled = true;
  document.getElementById("glowRing").classList.add("active");
  document.getElementById("guess").value = "";
  document.getElementById("guess").focus();
}

function makeGuess() {
  var raw = document.getElementById("guess").value.trim();
  var guessVal = parseInt(raw);
  var minV = window._customMin || 1;
  var maxV = window._customMax || range;

  if (raw === "" || isNaN(guessVal)) {
    showToast("Enter a number first", "bad");
    shakeInput();
    return;
  }
  if (guessVal < minV || guessVal > maxV) {
    showToast("Number must be between " + minV + " and " + maxV, "bad");
    shakeInput();
    return;
  }

  guessCount++;
  setChip("guessDisplay", guessCount);

  var diff = Math.abs(guessVal - answer);
  setProximityBar(getProximityRatio(diff));
  document.getElementById("proximityCursor").style.display = "block";

  if (guessVal === answer) {
    var endTime = new Date().getTime();
    var quality = getScoreQuality(guessCount);

    setMsg("Correct, " + playerName + "!", quality.label + " — " + guessCount + " guess" + (guessCount === 1 ? "" : "es"), "msg-correct");
    document.getElementById("feedbackBanner").textContent = quality.text;
    document.getElementById("feedbackBanner").style.color = quality.color;

    addHistory(guessVal, "correct", diff);

    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;

    showCelebration(quality);

    totalWins++;
    updateScore(guessCount, getDiffLabel());
    updateTimers(endTime);
    reset();

  } else {
    shakeInput();

    var hint = getHint(diff);
    var dir = guessVal > answer ? "high" : "low";
    var dirLabel = guessVal > answer ? "Too high! " : "Too low! ";
    var msgClass = guessVal > answer ? "msg-high" : "msg-low";

    setMsg(dirLabel + hint.label, playerName + " — keep trying! Guess #" + guessCount, msgClass);

    document.getElementById("proxHint").textContent = hint.label;
    document.getElementById("proxHint").style.color = hint.color;

    addHistory(guessVal, dir, diff);
    document.getElementById("guess").value = "";
    document.getElementById("guess").focus();
  }
}

function giveUp() {
  var endTime = new Date().getTime();

  setMsg(playerName + " ejected!", "The answer was " + answer + ". Score: " + range + " (max penalty)", "");
  document.getElementById("feedbackBanner").textContent = "";

  document.getElementById("guessBtn").disabled = true;
  document.getElementById("giveUpBtn").disabled = true;

  totalWins++;
  updateScore(range, getDiffLabel());
  updateTimers(endTime);
  reset();
  showToast("Gave up. The answer was " + answer, "bad");
}

function updateScore(score, diffLabel) {
  totalGuesses += score;
  totalGames++;
  scores.push(score);
  scoreDiffs.push(diffLabel);

  var combined = scores.map(function(s, i) { return { s: s, d: scoreDiffs[i] }; });
  combined.sort(function(a, b) { return a.s - b.s; });
  scores = combined.map(function(c) { return c.s; });
  scoreDiffs = combined.map(function(c) { return c.d; });

  document.getElementById("wins").textContent = totalWins;

  var avg = (totalGuesses / totalGames).toFixed(1);
  document.getElementById("avgScore").textContent = avg;

  var wr = Math.round((totalWins / totalGames) * 100);
  document.getElementById("winRate").textContent = wr + "%";

  updateLeaderboardDisplay();
}

function updateLeaderboardDisplay() {
  var items = document.getElementsByName("leaderboard");
  for (var i = 0; i < items.length; i++) {
    var diffEl = document.getElementById("lb-diff-" + i);
    if (scores[i] !== undefined) {
      items[i].textContent = scores[i];
      if (diffEl) diffEl.textContent = scoreDiffs[i] || "";
    } else {
      items[i].textContent = "—";
      if (diffEl) diffEl.textContent = "—";
    }
  }
}

function updateTimers(endMs) {
  var elapsed = endMs - startTime;
  allTimes.push(elapsed);

  if (fastestTime === null || elapsed < fastestTime) {
    fastestTime = elapsed;
  }
  var avgMs = allTimes.reduce(function(a, b) { return a + b; }, 0) / allTimes.length;

  document.getElementById("fastest").textContent = (fastestTime / 1000).toFixed(2) + "s";
  document.getElementById("avgTime").textContent = (avgMs / 1000).toFixed(2) + "s";
}

function reset() {
  isPlaying = false;
  document.getElementById("glowRing").classList.remove("active");

  if (!customActive) {
    var levels = document.getElementsByName("level");
    for (var i = 0; i < levels.length; i++) {
      levels[i].disabled = false;
    }
  }
  document.getElementById("playBtn").disabled = false;
  document.getElementById("customBtn").disabled = false;
}

function getDiffLabel() {
  if (customActive) return "CUSTOM";
  if (range === 3) return "EASY";
  if (range === 10) return "MEDIUM";
  if (range === 100) return "HARD";
  return "CUSTOM";
}

function getHint(diff) {
  if (diff <= 2) return { label: "HOT", color: "var(--hot)" };
  if (diff <= 5) return { label: "WARM", color: "var(--warm)" };
  return { label: "COLD", color: "var(--cold)" };
}

function getProximityRatio(diff) {
  return 1 - Math.min(diff / range, 1);
}

function setProximityBar(ratio) {
  var fill = document.getElementById("proximityFill");
  var cursor = document.getElementById("proximityCursor");
  if (ratio === null) {
    fill.style.width = "100%";
    cursor.style.left = "0%";
    return;
  }
  var pct = Math.round(ratio * 100);
  fill.style.width = (100 - pct) + "%";
  cursor.style.left = pct + "%";
}

function getScoreQuality(guesses) {
  if (guesses === 1) return { label: "TELEPATHIC", text: "One guess — unbelievable!", color: "var(--accent)" };
  if (guesses <= 2)  return { label: "LEGENDARY",  text: "Absolute perfection",      color: "#ffd700" };
  if (guesses <= 4)  return { label: "AMAZING",    text: "Excellent deduction",       color: "var(--accent)" };
  if (guesses <= 7)  return { label: "SOLID",      text: "Well played, agent",        color: "var(--accent3)" };
  if (guesses <= 12) return { label: "DECENT",     text: "Getting there",             color: "var(--warm)" };
  return                    { label: "KEEP AT IT", text: "Practice makes perfect",    color: "var(--text-muted)" };
}

function setMsg(main, subText, colorClass) {
  var el = document.getElementById("msg");
  el.className = "arena-msg " + (colorClass || "");
  el.innerHTML = main + '<span class="msg-sub">' + subText + '</span>';
}

function setChip(id, val) {
  var el = document.getElementById(id);
  el.textContent = val;
  el.classList.remove("pop");
  void el.offsetWidth;
  el.classList.add("pop");
}

function shakeInput() {
  var el = document.getElementById("guess");
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
  setTimeout(function() { el.classList.remove("shake"); }, 500);
}

function addHistory(guessVal, result, diff) {
  var list = document.getElementById("historyList");
  var empty = list.querySelector(".history-empty");
  if (empty) empty.remove();

  var item = document.createElement("div");
  item.className = "history-item";

  var hintClass = diff <= 2 ? "history-hot" : (diff <= 5 ? "history-warm" : "history-cold");
  var arrow = result === "high" ? '<span class="hist-arrow-high">↑</span>' :
              result === "low"  ? '<span class="hist-arrow-low">↓</span>'  :
              '<span style="color:var(--accent)">✓</span>';

  item.innerHTML =
    '<span class="history-num ' + hintClass + '">' + guessVal + '</span>' +
    arrow +
    '<span class="history-hint ' + hintClass + '">' +
      (result === "correct" ? "Correct" : result === "high" ? "Too high" : "Too low") +
    '</span>';

  list.insertBefore(item, list.firstChild);
}

function clearHistoryDisplay() {
  document.getElementById("historyList").innerHTML = '<div class="history-empty">No guesses yet</div>';
}

function showCelebration(quality) {
  var overlay = document.getElementById("celebrationOverlay");
  document.getElementById("celebTitle").textContent = quality.label;
  document.getElementById("celebSub").textContent = quality.text;
  overlay.classList.add("show");
  setTimeout(function() { overlay.classList.remove("show"); }, 2200);
}

function showToast(msg, type) {
  var stack = document.getElementById("toastStack");
  var t = document.createElement("div");
  t.className = "toast toast-" + (type || "info");
  t.textContent = msg;
  stack.appendChild(t);
  setTimeout(function() {
    t.style.animation = "toastOut 0.3s ease forwards";
    setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 300);
  }, 2500);
}