export const mockUser = {
    _id: 'user1',
    email: 'test@example.com',
    username: 'testuser',
};

export const mockHabits = [
    { _id: 'habit1', name: 'Read for 15 minutes', frequency: 'daily', currentStreak: 5, isCompletedToday: false },
    { _id: 'habit2', name: 'Go for a run', frequency: 'daily', currentStreak: 2, isCompletedToday: true },
    { _id: 'habit3', name: 'Weekly project review', frequency: 'weekly', currentStreak: 8, isCompletedToday: false },
    { _id: 'habit4', name: 'Drink 8 glasses of water', frequency: 'daily', currentStreak: 21, isCompletedToday: false },
];

export const mockFeed = [
    { _id: 'feed1', user: { username: 'Alice' }, habitName: 'Workout', streak: 12, completedAt: '2 hours ago' },
    { _id: 'feed2', user: { username: 'Bob' }, habitName: 'Meditate', streak: 3, completedAt: '5 hours ago' },
    { _id: 'feed3', user: { username: 'Alice' }, habitName: 'Read a chapter', streak: 30, completedAt: 'yesterday' },
];

export const mockSearchResults = [
  { _id: 'user2', username: 'Alice' },
  { _id: 'user3', username: 'Bob' },
  { _id: 'user4', username: 'Charlie' },
];