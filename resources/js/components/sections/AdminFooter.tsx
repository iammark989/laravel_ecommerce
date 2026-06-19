import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone
} from 'lucide-react';

export default function AdminFooter() {
    return (
        <footer className="bg-slate-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">

                {/* Company */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        GDS
                    </h2>

                    <p className="text-slate-300 leading-relaxed">
                        Garbes Dizon Supermarket.
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Contact Info
                    </h3>

                    <div className="space-y-3 text-slate-300">

                        <div className="flex items-center gap-3">
                            <Phone size={18} />
                            <span>+63 912 345 6789</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail size={18} />
                            <span>sample@email.com</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <MapPin size={18} />
                            <span>Bulacan, Philippines</span>
                        </div>

                    </div>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Follow Us
                    </h3>

                    <div className="flex gap-5">
                        <a href="#">
                            <Facebook />
                        </a>

                        <a href="#">
                            <Instagram />
                        </a>

                        <a href="#">
                            <Linkedin />
                        </a>
                    </div>
                </div>

            </div>

            <div className="border-t border-slate-700 py-5 text-center text-sm text-slate-400">
                © 2026 GDS. All rights reserved.
            </div>
        </footer>
    );
}