import { GraduationCap, Heart, Mail, Phone, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-1.5">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">UniHub</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connecting university students with essential services. Boarding, food, rides, and more - all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Browse Ads</Link></li>
              <li><Link href="/map" className="hover:text-primary transition-colors">Map View</Link></li>
              <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link href="/post-ad" className="hover:text-primary transition-colors">Post an Ad</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Boarding Places</li>
              <li>Lunch Packets</li>
              <li>Tuk Rides</li>
              <li>Used Books</li>
              <li>Private Tuners</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@unihub.lk</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex gap-4 mt-2">
                <Twitter className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
                <Github className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
                <Linkedin className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} UniHub. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>for Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
