Features I Built

Dark / Light Mode Toggle
I added a toggle button in the header that switches the whole game between dark and light themes. When clicked it adds or removes a light class on the body, and CSS variables handle all the color swaps automatically. I also wired it to show a toast confirming which mode you switched to.

Win Rate Stat
I added a win rate percentage to the stats panel that tracks wins divided by total games played. After every round I calculate it, multiply by 100, round it, and write it to the #winRate element so players can see how consistent they are.

Reset Stats Button
I added a reset button at the bottom of the stats panel. It uses confirm() so the player has to intentionally approve before anything is wiped, then zeroes out all the counters, clears the leaderboard, and clears the guess history.

Keyboard Support
I added a keydown listener on the document so players can press Enter to submit a guess without touching the mouse. I used an isPlaying boolean flag so the listener only does something during an active round and ignores keypresses between games.

Score Quality Feedback
After a correct guess, instead of just saying "Correct!" the game shows a quality rating based on how many guesses it took — TELEPATHIC for one guess, LEGENDARY for two, AMAZING, SOLID, DECENT, or KEEP AT IT. I wrote the getScoreQuality() function that checks the guess count against thresholds and returns the right label and message.

Custom Difficulty Range
I added two number inputs and a SET button so players can enter their own minimum and maximum instead of being stuck with Easy, Medium, or Hard. I wrote the validation so it rejects the input if min is greater than or equal to max, or if either value is missing.

Difficulty Label on Leaderboard
I store the difficulty name alongside each score in a scoreDiffs array so the leaderboard shows both the score and which difficulty it came from. That way a score of 3 on Hard looks different from a score of 3 on Easy.

Round and Guess Counter
I added two chips in the game arena that show the current round number and how many guesses have been made this round. They update live as you play.



Features I Got Help From Claude On

Proximity Meter
I wanted a visual bar that fills from cold to hot based on how close the guess is, but the math to convert the difference into a percentage position and have a cursor slide smoothly was tricky. Claude helped me write getProximityRatio() and setProximityBar() and set up the gradient bar CSS with the overlay fill and cursor positioning.

Guess History Panel
I wanted each round's guesses logged in a scrollable list with color coding and direction arrows, but prepending new items, clearing between rounds, and keeping the color classes consistent was more DOM work than I wanted to figure out alone. Claude wrote the addHistory() and clearHistoryDisplay() functions.

Input Shake Animation
I wanted the input field to shake when a bad guess is submitted instead of showing an alert. Claude explained the trick of removing the animation class, forcing a reflow with void el.offsetWidth, and re-adding it so the animation restarts each time, and wrote the @keyframes shake CSS.

Toast Notifications
Instead of alert() I wanted small slide-in messages in the corner that disappear automatically. Claude built the showToast() function and the CSS for the slide-in and slide-out transitions with the auto-dismiss timer.

CSS Visual Design and Layout
The three-column grid, the glassmorphism panels, the animated background grid, the Orbitron font pairing, the glow ring animation, and the overall dark arcade aesthetic were all styled with Claude's help since the CSS got complex quickly.

Floating Particles
The 25 background particles that float upward with randomized sizes, colors, speeds, and delays were written by Claude. The staggered setTimeout loop and the CSS keyframe animation were more than I wanted to implement from scratch.

Celebration Overlay
The full-screen overlay that appears briefly after a correct guess, showing the quality label and fading out after 2.2 seconds, was built by Claude.ShareArtifactsDownload allIndexCode · HTML ScriptJS StyleCode · CSS BeyondDocument · MD 