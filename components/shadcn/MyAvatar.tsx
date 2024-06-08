import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TProps = {
  url: string | null;
  alt: string;
};

export function MyAvatar({ url, alt }: TProps) {
  const imageUrl = url || "";

  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt={alt} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}