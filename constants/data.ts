// Dummy data for the app
export const userData = {
  name: 'Sophia',
  email: 'sophia@example.com',
  profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
};

export const exerciseTypes = [
  {
    id: 'cardio',
    name: 'Cardio',
    icon: 'timer',
    selected: true,
  },
  {
    id: 'strength',
    name: 'Strength',
    icon: 'dumbbell',
    selected: false,
  },
  {
    id: 'flexibility',
    name: 'Flexibility',
    icon: 'apple',
    selected: false,
  },
  {
    id: 'balance',
    name: 'Balance',
    icon: 'dumbbell',
    selected: false,
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'trophy',
    selected: false,
  },
];

export const muscleGroups = [
  {
    id: 'shoulders',
    name: 'Shoulders',
    selected: true,
    frontView: true,
  },
  {
    id: 'back',
    name: 'Back',
    selected: false,
    frontView: false,
  },
];