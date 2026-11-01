export type Notification = {
  id: number;
  title: string;
  text: string;
  time: string;
  starred: boolean;
  unread: boolean;
};

export const notifications: Notification[] = [
  {
    id: 1,
    title: 'Payment Confirmed',
    text: 'You have successfully made your payment.',
    time: '2 min ago',
    starred: false,
    unread: false,
  },
  {
    id: 2,
    title: 'July Promotion',
    text: 'Dear customer we would like to inform you that this july one of o...',
    time: '1 hr ago',
    starred: true,
    unread: true,
  },
  {
    id: 3,
    title: 'Alert',
    text: 'Dear customer sorry to inform you this but this friday our downtown...',
    time: 'Yesterday',
    starred: false,
    unread: false,
  },
  {
    id: 4,
    title: 'Happy Independance Day',
    text: 'Dear customer its july again are you ready to party with our speacial...',
    time: '5 days ago',
    starred: true,
    unread: true,
  },
  {
    id: 5,
    title: 'Payment Confirmed',
    text: 'You have successfully made your payment.',
    time: '2 weeks ago',
    starred: true,
    unread: true,
  },
  {
    id: 6,
    title: 'Failed Payment',
    text: 'Your payment somehow failed please repeate the process or dial our cust...',
    time: '1 mon ago',
    starred: false,
    unread: false,
  },
  {
    id: 7,
    title: 'Discount',
    text: 'This monday from 7am till midnight our',
    time: '2 min ago',
    starred: false,
    unread: false,
  },
];
