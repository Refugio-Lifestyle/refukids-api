
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex-1">
      {children}
    </div>
  );
}
