export const metadata = {
  title: "Gallery - FitLife Gym",
  description: "Gallery page of FitLife Gym",
};

export default function GalleryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
