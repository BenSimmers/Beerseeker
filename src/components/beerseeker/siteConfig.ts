import {
  Accessibility,
  Clock,
  Compass,
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
      { href: '#features', label: 'Features' },
      { href: '#hello', label: 'About Us' },
      { href: '#download', label: 'Download' },
    ],
  },
  hero: {
    title: 'Your compass for travel',
    subtitle: 'Travellers once found the inn by its painted sign. Beerseeker brings that back: point your phone, follow the needle, and find pubs and places to eat and drink wherever you go.',
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
      title: 'Read the Signs',
      body: [
        'Every pub, bar, sports bar, brewery, wine bar and bottle shop within 5 km, laid out like signs along the street and sorted by distance.',
        'Filter by venue type or search by name, then open any spot for its rating, opening hours, phone number and directions.',
      ],
    },
    {
      id: 'compass',
      icon: Compass,
      title: 'The Compass',
      body: [
        "Where a traveller once looked out for The White Hart, you look at the needle. It reads your device's magnetometer and swings to the closest pub, bar, brewery, wine bar or bottle shop, turning with you as you walk.",
        'Tap the map underneath for a closer look, or switch between the Modern and Classic faces in Settings.',
      ],
    },
    {
      id: 'friends',
      icon: UsersRound,
      title: 'Meet Your Company',
      body: [
        'The inn was always where travellers met up. Create an account, follow your mates by username and see who else is out seeking.',
        'Share your location when you choose, for as long as you choose. Then your friend becomes the landmark: point the compass at them instead of a pub and follow the needle.',
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
          text: 'Share your location with a friend for 1, 4 or 8 hours. It stops on its own, or you can stop sharing with everyone in one tap.',
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
        text: 'Travelling as a party? Gather your group and share your location with everyone at once.',
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
      { label: 'App Store', href: 'https://apps.apple.com/au/app/beer-seeker/id6776191099', variant: 'light' },
      { label: 'Google Play', href: '#', variant: 'amber' },
    ],
  },
  footer: {
    copyright: '© 2026 Beer Seeker. All rights reserved.',
    links: [
      { label: 'Privacy', href: 'https://gist.github.com/BenSimmers/bcc72b07118544af6491c932db773eed#file-privacy-policy-md' },
      { label: 'Terms', href: 'https://gist.github.com/BenSimmers/bcc72b07118544af6491c932db773eed#file-privacy-policy-md' },
      { label: 'Contact', href: 'mailto:bej1380@gmail.com' },
    ],
  },
};
