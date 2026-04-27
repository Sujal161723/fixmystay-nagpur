import Link from 'next/link';

export default function Footer() {
  const links = [
    { title: 'Platform', items: ['Hotels', 'PG Stays', 'Rooms', 'Real Estate'] },
    { title: 'Company', items: ['About Us', 'Terms of Service', 'Privacy Policy', 'Contact'] },
    { title: 'Support', items: ['Help Center', 'Safety Information', 'Cancellation Options', 'Report a Concern'] },
  ];

  return (
    <footer className="bg-white border-t border-border pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tight text-primary mb-6 block">
              FIXMYSTAY
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Providing premium stay solutions for travelers, students, and professionals across the country.
            </p>
          </div>
          
          {links.map((group) => (
            <div key={group.title}>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors font-medium">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border pt-10 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs font-medium italic">
            (c) 2024 FixMyStay Technologies Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
             <Link href="#" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tighter">Twitter</Link>
             <Link href="#" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tighter">LinkedIn</Link>
             <Link href="#" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tighter">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
