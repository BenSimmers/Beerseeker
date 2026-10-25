import {
  Accessibility,
  Clock,
  Compass,
  Flag,
  ListOrdered,
  Map,
  MapPin,
  Navigation,
  Palette,
  Plane,
  ShieldCheck,
  Star,
  UserPlus,
  Users,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

export type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export type Section = {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string[];
  highlights?: Feature[];
};

export const SITE_CONFIG = {
  nav: {
    logo: {
      light: 'beer',
      dark: 'seeker',
    },
    links: [
      { href: '#about', label: 'Beerseeker' },
      { href: '#explore', label: 'Explore' },
      { href: '#compass', label: 'Compass' },
      { href: '#friends', label: 'Friends' },
      { href: '#groups', label: 'Pub Crawls' },
      { href: '#features', label: 'Features' },
      { href: '#hello', label: 'About Us' },
      { href: '#download', label: 'Download' },
    ],
  },
  hero: {
    title: 'Your compass for travel',
    subtitle:
      'Travellers once found the inn by its painted sign. Beerseeker brings that back: point your phone, follow the needle, and find pubs and places to eat and drink wherever you go.',
    cta: 'Download Now',
  },
  sections: [
    {
      id: 'about',
      icon: Compass,
      title: 'Beerseeker',
      body: [
        'A landmark for every traveller.',
        "Before maps and street names, you found a drink by its sign. Beerseeker works the same way. Whether you're exploring a new city, on a road trip, or wandering your own neighbourhood, it guides you to the pubs, bars, breweries and wine bars nearby.",
      ],
    },

    {
      id: 'hello',
      icon: Users,
      title: 'About Us',
      body: [
        "Hi, we're the creators of Beer Seeker.",
        "We're massive history buffs. One fact we love was that in the Middle Ages most people couldn't read, so they navigated by landmarks instead - a sign had to be vivid enough for anyone to recognise at a glance, which is why England still has The Blue Boar, The White Hart and The King's Head.",
        'A habit the Romans started, hanging vine leaves outside a tavern to show it sold wine.',
        "That's where Beer Seeker came from. We built it as a return to true form for travelling and looking for pubs and places to eat and drink.",
      ],
    },

    {
      id: 'explore',
      icon: MapPin,
      title: 'Find a place worth stopping at.',
      body: [
        'Browse pubs, bars, breweries, wine bars and bottle shops within 5 km, sorted by distance.',
        'Filter by venue type or search by name, then open any spot for its rating, opening hours, phone number and directions.',
      ],
    },
    {
      id: 'compass',
      icon: Compass,
      title: 'Less map. More looking up.',
      body: [
        'The compass points towards the closest pub, bar, brewery, wine bar or bottle shop and turns with you as you walk. Pick a particular place if you already have one in mind.',
        'Tap the map underneath for a closer look, or switch between the Modern and Classic faces in Settings.',
      ],
    },
    {
      id: 'friends',
      icon: UsersRound,
      title: 'Where’s everyone got to?',
      body: [
        'Create an account, find your mates by username, and send a follow request.',
        'When a friend shares their location with you, find them on the map or point the compass their way. You choose who sees your location and how long you share it.',
      ],
      highlights: [
        {
          icon: UserPlus,
          title: 'Follow friends',
          text: 'Find people by username and send a follow request. Your email stays private, so others only ever see your username.',
        },
        {
          icon: Clock,
          title: 'Share for a while',
          text: 'Share your location with a friend for 1, 4 or 8 hours while the app is open. Sharing expires on its own, or you can stop sharing with everyone in one tap.',
        },
        {
          icon: Navigation,
          title: 'Compass to a friend',
          text: "Point the needle at a friend who's sharing with you. If their signal goes quiet, it points to where they were last seen.",
        },
        {
          icon: Map,
          title: 'Friends map',
          text: "See everyone who's sharing with you on one map, and open any of them in your maps app for directions.",
        },
      ],
    },
    {
      id: 'groups',
      icon: Users,
      title: 'One group. A few good stops.',
      body: [
        'Gather your mates in a group and plan a pub crawl together. Add the places you want to visit, put them in order, and give everyone the same trail to follow.',
        'See the route on a map, mark where the group has arrived, and follow the compass to the next stop. Everyone in the group can update the crawl as the journey unfolds.',
      ],
      highlights: [
        {
          icon: ListOrdered,
          title: 'Build your crawl',
          text: 'Add stops from your favourites or search for a pub or bar. Reorder or remove stops together as plans change.',
        },
        {
          icon: Map,
          title: 'See the trail',
          text: 'View your stops on a shared map, with straight-line distance and walking-time estimates between them.',
        },
        {
          icon: Flag,
          title: 'Keep everyone in step',
          text: 'Mark an arrival to update the crawl for everyone, point the compass at the next stop, and finish or restart the crawl when you like.',
        },
        {
          icon: Clock,
          title: 'Share with your party',
          text: 'Share your location with group members who are your friends for 1, 4 or 8 hours. Your location updates while the app is open.',
        },
      ],
    },
  ] as Section[],
  features: {
    id: 'features',
    title: 'For the Journey',
    subtitle: 'Everything else a traveller needs on the road.',
    items: [
      {
        icon: Star,
        title: 'Favourites',
        text: 'Mark your own landmarks. Star the places worth returning to, point the compass at any of them, and share them on your profile.',
      },
      {
        icon: Plane,
        title: 'Travel Mode',
        text: "Scout the signs ahead. Set a location and browse somewhere you haven't reached yet, handy for planning before a trip.",
      },
      {
        icon: Users,
        title: 'Groups',
        text: 'Invite friends to your travelling party, plan a shared pub crawl, and share your location with friends in the group for a time you choose.',
      },
      {
        icon: ShieldCheck,
        title: 'Privacy & Safety',
        text: 'Block or report accounts, manage who you have blocked in Settings, and delete your account whenever you like.',
      },
      {
        icon: Palette,
        title: 'Themes & Faces',
        text: 'Pick the Midnight or Vintage theme, and the Modern or Classic compass face.',
      },
      {
        icon: Accessibility,
        title: 'Accessible',
        text: 'Like a good sign, it should work for everyone. Built for screen readers, and it respects your reduced motion setting.',
      },
    ] as Feature[],
  },
  download: {
    title: 'Start Your Journey',
    subtitle: 'Download Beerseeker on iOS or Android and follow the needle.',
    buttons: [
      {
        label: 'App Store',
        href: 'https://apps.apple.com/au/app/beer-seeker/id6776191099',
        variant: 'light',
      },
      { label: 'Google Play', href: '#', variant: 'amber' },
    ],
  },
  footer: {
    copyright: '© 2026 Beer Seeker. All rights reserved.',
    links: [
      {
        label: 'Privacy',
        href: 'https://gist.github.com/BenSimmers/bcc72b07118544af6491c932db773eed#file-privacy-policy-md',
      },
      {
        label: 'Terms',
        href: 'https://gist.github.com/BenSimmers/bcc72b07118544af6491c932db773eed#file-privacy-policy-md',
      },
      { label: 'Contact', href: 'mailto:bej1380@gmail.com' },
    ],
  },
};
