export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid md:grid-cols-4 gap-8">

          <div>
            <h2 className="text-xl font-bold mb-3">
              MarkShoppingSpree
            </h2>

            <p className="text-sky-100">
              Your trusted online shopping destination.
              Discover amazing deals every day.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>Home</li>
              <li>Products</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Customer Service
            </h3>

            <ul className="space-y-2">
              <li>Shipping Policy</li>
              <li>Refund Policy</li>
              <li>FAQ</li>
              <li>Terms</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Newsletter
            </h3>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 rounded text-black"
            />

            <button className="mt-3 bg-sky-500 px-4 py-2 rounded w-full">
              Subscribe
            </button>
          </div>

        </div>

        <div className="border-t border-sky-700 mt-10 pt-5 text-center">
          © 2026 MarkShoppingSpree. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}