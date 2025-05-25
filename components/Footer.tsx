import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-footerblue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Filters Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="space-y-2">
              <p className="text-blue-200 hover:text-yellow-400">All</p>
              <p className="text-blue-200 hover:text-yellow-400">Electronics</p>
            </div>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <div className="space-y-2">
              <p className="text-blue-200 hover:text-yellow-400 cursor-pointer">About Us</p>
              <p className="text-blue-200 hover:text-yellow-400 cursor-pointer">Contact</p>
            </div>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-left text-blue-200">© 2024 American</p>
        </div>
      </div>
    </footer>
  );
}