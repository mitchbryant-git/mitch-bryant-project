// Tools configuration
// To add a new tool, simply add a new object to this array

export const tools = [
  {
    id: 'help-loan-calculator',
    name: 'HELP Loan Calculator',
    status: 'live', // 'live', 'building', or 'requested'
    description: 'Find out the real price of your degree before you sign up.',
    url: 'https://www.helploancalculator.com',
    icon: 'Calculator', // Lucide icon name
  },
  {
    id: 'big-game-playbook',
    name: 'The Big Game Playbook',
    status: 'building',
    description: 'Design your dream life, build your path, become unstoppable.',
    url: null,
    icon: 'Gamepad2',
  },
  {
    id: 'the-clubhouse',
    name: 'The Clubhouse',
    status: 'building',
    description: 'The community for people who refuse to drift through life.',
    url: null,
    icon: 'Users',
  },
  {
    id: 'you-decide',
    name: 'You Decide',
    status: 'requested',
    description: "Tell me what you need. I'll build it.",
    url: 'https://www.tiktok.com/@itsmitchbryant', // Links to TikTok DMs
    icon: 'MessageSquare',
  },
];
