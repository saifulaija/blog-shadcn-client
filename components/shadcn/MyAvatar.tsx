// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// type TProps = {
//   url: string | null;
//   alt: string;
// };

// export function MyAvatar({ url, alt }: TProps) {
//   const imageUrl = url || "";

//   return (
//     <Avatar>
//       <AvatarImage src={imageUrl} alt={alt} />
//       <AvatarFallback>CN</AvatarFallback>
//     </Avatar>
//   );
// }

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type TProps = {
  url: string | null;
  alt: string;
};

function getInitials(name: string | undefined): string {
  if (!name) return 'CN'; // Default fallback text
  const words = name.split(' ');
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join('');
  return initials.slice(0, 2); // Return the first two initials
}

export function MyAvatar({ url, alt }: TProps) {
  const imageUrl = url || '';
  const initials = getInitials(alt);
  console.log(alt);

  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt={alt} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

// Usage
// <MyAvatar url={user.profilePhoto} alt={user?.name} />
