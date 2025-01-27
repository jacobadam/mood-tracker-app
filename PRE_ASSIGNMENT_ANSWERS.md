## Pre-Assignment Questions

### 1. What do you think are the greatest areas of risk in completing the project?

The greatest area of risk is around app performance. The app relies on complex SVG animations for rendering moods. Smooth animations typically require higher frame rates, which require larger processing power. This can be mitigated by using a package with built-in optimisation for SVGs.

Another area of risk is in the use of real-time communication between WebSocket and the database. Any errors could potentially incur a delay in determining which mood should be displayed, causing an interruption to the user experience.

### 2. What changes/additions would you make to the design?

I think the foundational elements of the design are strong, but I would make a couple of changes to the emoji icons. Firstly, I think they should take up less screen real estate to avoid detracting from the backgrounds. Rather than being yellow, I would change their colour to be consistent with the palette of each particular background so that they more accurately represent the user’s mood.

### 3. List two or three features that you would consider implementing in the future that would add significant value to the project.

Here are some features I believe could add value:

- Daily or weekly mood insights that provide users with meaningful feedback about their emotional patterns.
- Additional resources or suggestions driven by mood patterns. For example, if a user logs ‘sad’ three consecutive times, the app could guide the user towards mental health services.
- Regular reminder notifications that prompt the user to log their mood, perhaps three times per day, to increase the amount of data being logged.
- Play music aligned with the selected mood—e.g., upbeat music for excited, calming music for sad or anxious—to make the app more dynamic.

### 4. Are there any clarifying questions you would ask? If you're able to make assumptions about these and continue, please record and share your assumptions.

I would clarify what mood state should be displayed as the default. I have made the assumption that it should be the most neutral mood—pleasant—rather than sad or excited, but another option for the default could be the most recently logged mood.

I would also clarify whether unit testing is necessary for this project. Given the time constraint and no mention of testing in the instructions, I have made the assumption that unit testing is not required to complete this task.
