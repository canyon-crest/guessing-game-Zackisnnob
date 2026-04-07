[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ES4L0OIg)
# CS++ JavaScript — Guessing Game Project

> **Capstone Project** | 90 Points Autograded + 10 Points Teacher Graded | 12 Automated Tests

This is the final JavaScript project. You will combine everything you have learned — variables, functions, arrays, loops, conditionals, DOM manipulation, event listeners, and the Date object — to build a complete number guessing game.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Scoring Rubric](#scoring-rubric)
4. [Required HTML Elements](#required-html-elements)
5. [JavaScript Functions](#javascript-functions)
6. [Autograding Details](#autograding-details)
7. [Above and Beyond](#above-and-beyond)
8. [Starter HTML](#starter-html)
9. [Concepts Review](#concepts-review)
10. [Tips for Success](#tips-for-success)
11. [FAQ](#faq)
12. [Submission](#submission)

---

## Project Overview

Build a browser-based number guessing game where the player:

1. Enters their name (via `prompt()`) and sees it used in all game messages
2. Selects a difficulty level (Easy 1–3, Medium 1–10, Hard 1–100)
3. Guesses until they find the correct number or gives up
4. Sees feedback on each guess: too high, too low, correct — plus hot/warm/cold proximity hints
5. Tracks statistics: total wins, average score, and a sorted top-3 leaderboard
6. Has a Give Up button that ends the round and sets the score to the range value
7. Sees a live date and time display with month names, day suffixes, and updating seconds
8. Tracks round timing: fastest game played and average time per game

---

## Requirements

Every feature below is tested by the autograder. Read each one carefully — the test names in the [Scoring Rubric](#scoring-rubric) tell you exactly what is checked.

### 1. HTML Structure (5 pts)

Your `index.html` must contain all the elements listed in [Required HTML Elements](#required-html-elements). The IDs and names must match **exactly**. The starter HTML is provided — do not remove or rename any elements.

### 2. Event Listeners (5 pts)

Wire your buttons using `addEventListener` in `script.js`. Do **not** add `onclick` attributes in your HTML. The autograder checks that `playBtn`, `guessBtn`, and `giveUpBtn` have no inline `onclick`.

### 3. Play Button (10 pts)

When the player clicks **Play**:
- Generate a random number within the selected range using `Math.floor(Math.random() * range) + 1`
- Change the `#msg` text to prompt the player to guess
- Enable the **Guess** and **Give Up** buttons
- Disable the **Play** button (prevent starting a new round mid-game)

### 4. Guessing with Feedback (15 pts)

When the player submits a guess:
- If the guess is **too high**, the `#msg` must contain the word "high" (case-insensitive)
- If the guess is **too low**, the `#msg` must contain the word "low" (case-insensitive)
- If the guess is **correct**, the `#msg` must contain the word "correct" (case-insensitive), and the **Guess** button must be disabled (round over)

### 5. Hot / Warm / Cold (5 pts)

After each wrong guess, also tell the player how close they are based on `Math.abs(guess - answer)`:
- Difference **≤ 2** → message must contain "hot" (case-insensitive)
- Difference **≤ 5** → message must contain "warm" (case-insensitive)
- Difference **> 5** → message must contain "cold" (case-insensitive)

### 6. Player Name (5 pts)

At the top of your script, use `prompt()` to ask for the player's name. **Case it correctly** — capitalize the first letter and lowercase the rest (e.g., `"jOhN"` becomes `"John"`). Use the name in your game messages. The autograder sends `"jOhN"` and checks that `#msg` contains `"John"` after clicking Play and after a correct guess.

### 7. Wins and Average Score (10 pts)

- After each win, increment the win count. The `#wins` element must contain the current number of wins.
- Track the average number of guesses per win. After winning round 1 in 1 guess and round 2 in 3 guesses, `#avgScore` must contain `2` (the average).

### 8. Leaderboard (10 pts)

- Keep an array of all game scores (number of guesses to win)
- Sort the array **ascending** (fewest guesses = best score)
- Display the top 3 scores in the `<li name="leaderboard">` elements
- The autograder plays 4 rounds with scores 3, 1, 5, 2 and checks that the leaderboard shows `1, 2, 3`

### 9. Give Up (5 pts)

When the player clicks **Give Up**:
- End the round immediately
- Set the player's score to the **range value** (e.g., 10 for Medium)
- Update the leaderboard and all stats with that score
- Disable the Guess and Give Up buttons, re-enable Play

### 10. Date with Month Names and Suffixes (10 pts)

Display the current date in `#date` using:
- The **full month name** (January, February, ... December) — not a number
- The **day with a suffix** (1st, 2nd, 3rd, 4th, 11th, 12th, 13th, 21st, 22nd, etc.)
- The **current year** (e.g., 2025)

### 11. Live Time (5 pts)

Use `setInterval` to update the `#date` display **every second**. The autograder waits 2 seconds and checks that the text has changed. You must include seconds in your time display for this to work.

### 12. Round Timer, Fastest Game, and Average Time (5 pts)

- When a round starts, record the current time with `new Date().getTime()`
- When the round ends (win or give up), calculate the elapsed time
- Display the **fastest** round time in `#fastest` — must contain a number
- Display the **average** time across all rounds in `#avgTime` — must contain a number

---

## Scoring Rubric

| # | Test | Points | What the autograder checks |
|---|------|--------|---------------------------|
| 1 | Required elements exist | 5 | All IDs, radio values (3, 10, 100), 3 leaderboard `<li>` elements |
| 2 | Buttons use addEventListener | 5 | No `onclick` attribute on playBtn, guessBtn, giveUpBtn |
| 3 | Play starts a round | 10 | Message changes, Guess/Give Up enabled, Play disabled |
| 4 | Correct guess + high/low | 15 | "high", "low", "correct" in `#msg` at the right times |
| 5 | Hot/warm/cold proximity | 5 | "hot" (diff ≤ 2), "warm" (diff ≤ 5), "cold" (diff > 5) |
| 6 | Player name in messages | 5 | `"jOhN"` → `"John"` appears in `#msg` |
| 7 | Wins counter + average score | 10 | Wins increment correctly, average math is right |
| 8 | Leaderboard sorted top 3 | 10 | Scores sorted ascending, only top 3 displayed |
| 9 | Give Up sets score to range | 5 | Medium Give Up → score of 10 in leaderboard |
| 10 | Date with month + suffix | 10 | Month name, day suffix (st/nd/rd/th), current year |
| 11 | Live time updates | 5 | `#date` text changes after 2 seconds |
| 12 | Round timer + fastest + avg | 5 | `#fastest` and `#avgTime` contain numbers after games |
| | **Autograded Total** | **90** | |
| 13 | Above and Beyond | 10 | Teacher graded — see [Above and Beyond](#above-and-beyond) |
| | **Total** | **100** | |

---

## Required HTML Elements

These IDs and names must match exactly. **Do not change the starter HTML.**

| Feature | HTML Tag | ID / Name | Purpose |
|---------|----------|-----------|---------|
| Date/time display | `<p>` | `id="date"` | Shows formatted date and live time |
| Difficulty radios | `<input type="radio">` | `name="level"`, `id="e"` (3), `id="m"` (10), `id="h"` (100) | Three levels with these exact values |
| Play button | `<button>` | `id="playBtn"` | Starts a new round |
| Guess input | `<input>` | `id="guess"` | Where the player types their guess |
| Guess button | `<button>` | `id="guessBtn"` | Submits the current guess |
| Give Up button | `<button>` | `id="giveUpBtn"` | Ends the round immediately |
| Message area | `<h3>` | `id="msg"` | Feedback messages |
| Wins display | `<p>` | `id="wins"` | Total number of wins |
| Average score | `<p>` | `id="avgScore"` | Average guesses per win |
| Fastest game | `<p>` | `id="fastest"` | Fastest round time |
| Average time | `<p>` | `id="avgTime"` | Average time across all games |
| Leaderboard items | `<li>` | `name="leaderboard"` | Top 3 scores in an `<ol>` |

---

## JavaScript Functions

Use these function names. Wire the buttons with `addEventListener`, not `onclick`.

| Function | Purpose |
|----------|---------|
| `time()` | Returns a formatted date/time string with month name, day suffix, and live time with seconds |
| `play()` | Starts a new game: generates random answer, enables inputs, records start time |
| `makeGuess()` | Handles a guess: compares to answer, shows feedback, tracks guess count |
| `updateScore()` | Updates wins, average score, and leaderboard after a win or give up |
| `updateTimers(endMs)` | Calculates round time, updates fastest game and average time |
| `reset()` | Re-enables level selection and Play button for the next round |
| `giveUp()` | Ends the round, sets score to range value, updates all stats |

### Event Listeners

```javascript
document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
```

---

## Autograding Details

The autograder runs 12 tests using Jest and jsdom. Here is how it interacts with your game:

- **Prompt**: The autograder sends `"jOhN"` when your code calls `prompt()`. Your code must handle this and display `"John"`.
- **Random numbers**: The autograder controls `Math.random()` so it knows the correct answer. Your `play()` function must use `Math.floor(Math.random() * range) + 1` to generate the answer.
- **Clicking buttons**: The autograder clicks your buttons programmatically and reads `textContent` from your HTML elements.
- **Case-insensitive**: Feedback words like "high", "low", "correct", "hot", "warm", and "cold" are checked case-insensitively. `"Too High!"` and `"too high"` both pass.
- **Numbers in text**: For wins, average score, and leaderboard, the autograder extracts numbers from your text. `"Total wins: 2"` and `"Wins: 2"` both work.
- **Leaderboard values**: The autograder reads the `textContent` of each `<li name="leaderboard">` and parses it as an integer.
- **Live time**: The autograder waits 2 real seconds and checks that `#date` has changed. Your `setInterval` must run at 1000ms and your time display must include seconds.

---

## Above and Beyond

The remaining **10 points** are graded by your teacher for creative features beyond the requirements.

**You must create a file called `BEYOND.md`** in the root of your project. In this file, describe:

1. What extra features you added
2. Where each feature is in your code (function name or line numbers)
3. Why you think it improves the game

Your teacher will read `BEYOND.md`, review your code, and play your live game to assign up to 10 points.

**Ideas** (you are not limited to these):
- CSS styling and visual design
- Score quality feedback ("Amazing!", "Good", "Needs work")
- Sound effects or animations
- Dark mode toggle
- Custom difficulty levels
- Input validation (out-of-range, non-numeric)
- Streak tracking or win percentage
- Keyboard support (Enter key to guess)
- Any other creative addition

---

## Starter HTML

The `index.html` file in your repository is your starting point. **Do not remove or rename any elements** — the autograder depends on the exact IDs and names listed above. You may add elements, CSS, or extra scripts.

---

## Concepts Review

This project uses everything from the previous assignments:

| Concept | Where It Is Used |
|---------|-----------------|
| Variables (`var`) | Score tracking, game state, timer values |
| Functions | `play()`, `makeGuess()`, `updateScore()`, etc. |
| Arrays | Leaderboard scores, sorting |
| Loops | Updating leaderboard display |
| Conditionals | Hot/cold feedback, win detection, input validation |
| DOM manipulation | `getElementById`, `textContent`, enabling/disabling buttons |
| Event listeners | Button clicks via `addEventListener` |
| Date object | Live clock, round timer, elapsed time |
| `setInterval` / `clearInterval` | Live updating clock with seconds |
| `Math.random()` / `Math.floor()` | Generating the random answer |
| `.toFixed()` | Formatting timer and average values |
| `Math.abs()` | Calculating guess distance for hot/warm/cold |

### Day Suffixes

For the date display, add the correct suffix to the day number:

- 1 → "st", 2 → "nd", 3 → "rd", 4–20 → "th", 21 → "st", 22 → "nd", 23 → "rd", 24–30 → "th", 31 → "st"
- **Special cases**: 11th, 12th, 13th (not 11st, 12nd, 13rd)

### Hot / Warm / Cold

Use `Math.abs()` to find the distance between the guess and the answer:

- `Math.abs(guess - answer) <= 2` → the player is **hot** (very close)
- `Math.abs(guess - answer) <= 5` → the player is **warm** (getting closer)
- Otherwise → the player is **cold** (far away)

### Sorting the Leaderboard

Keep an array of scores and sort ascending (lowest = best). Use a `for` loop to display the top 3 in the `<li>` elements. If fewer than 3 games have been played, show `"--"` for unfilled spots.

### Casing a Name

To capitalize only the first letter:

- Get the first character and make it uppercase
- Get the rest of the string and make it lowercase
- Combine them

---

## Tips for Success

1. **Build incrementally** — get the basic guessing game working first (Play, Guess, correct/high/low), then add features one at a time
2. **Test after every change** — push to GitHub and check your autograder score, or open the browser console for errors
3. **Use `console.log()`** liberally while developing to check your variable values
4. **Keep your IDs exact** — the autograder reads elements by their exact ID and name attributes
5. **The leaderboard must sort ascending** — fewer guesses = better score = higher on the leaderboard
6. **For the timer**, use `new Date().getTime()` to capture milliseconds at the start and end of each round
7. **Disable buttons** at the right times — Guess and Give Up should be disabled between rounds; Play and level radios should be disabled during a round
8. **Handle the Give Up score** — set it to the range value (3 for Easy, 10 for Medium, 100 for Hard)
9. **The date must include seconds** — otherwise the live time test will fail because the text won't change every second
10. Do **not** wrap your code in a function or module — it should run immediately when `script.js` loads

---

## FAQ

**Q: How does the autograder interact with my game?**
It loads your `index.html` in a simulated browser (jsdom), clicks your buttons, types into your input, and reads the `textContent` of your elements. It controls `Math.random()` so it knows the correct answer, and it sends `"jOhN"` when your code calls `prompt()`.

**Q: My code works in the browser but fails the tests.**
Make sure: (1) Your element IDs match exactly. (2) You use `addEventListener`, not `onclick` in HTML. (3) Your feedback messages contain the keywords "high", "low", "correct", "hot", "warm", "cold". (4) Your date includes a month name, day suffix, and seconds.

**Q: How should the leaderboard work?**
Keep an array of all scores. After each game (win or give up), add the score, sort the array ascending, and display the top 3 in the `<li>` elements. If fewer than 3 games have been played, show `"--"` for unfilled spots.

**Q: What should the Give Up button do?**
End the round immediately, set the player's score to the range value (e.g., 10 for Medium), update all stats (wins, leaderboard, timers), and reset for the next round.

**Q: How do I make the time update every second?**
Use `setInterval` with a 1000ms delay to call your `time()` function and write the result to `#date`. Make sure your time format includes seconds so the text actually changes each second.

**Q: What is `BEYOND.md`?**
A Markdown file you create in the root of your project where you describe any extra features you built beyond the 12 autograded requirements. Your teacher reads this file to assign the remaining 10 points.

**Q: Can I add CSS styling?**
Yes. Create a `style.css` file and link it in your HTML. Styling can count toward your Above and Beyond points.

**Q: Can I add extra HTML elements?**
Yes, as long as you do not remove or rename the required elements. You can add sections, images, or anything else.

---

## Submission

1. Write your code in `script.js` (and optionally `style.css`)
2. Create your `BEYOND.md` file describing any extra features
3. Commit and push to your GitHub repository
4. Check your autograder score in the **Actions** tab
5. Enable **GitHub Pages**: Repository Settings → Pages → Deploy from branch → main → / (root)
6. Submit your GitHub Pages URL to your teacher

---

View all assignments and scoring breakdowns at [csplusplus.com/js-tests](https://csplusplus.com/js-tests)

*CS++ — AP Computer Science Principles — [csplusplus.com](https://csplusplus.com)*
