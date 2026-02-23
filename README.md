# eVolV

eVolV is a full-stack MERN Application that is for your self-improvement. Focus, Task, Mood tracking, journaling, notes, finance and more.

### Auth Centralization

- token.ts is the only source of truth for user token.
- api.ts eliminates the repetitive task of attaching base url and headers
- AuthContext handles multiple functions such as scheduleLogout, login, logout, and refreshUser. It also exposes the user data and loading state.    
- Habits pagination splits the data into smaller request. So it does not request the whole collection at once.
