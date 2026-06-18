import MainLayout from "@/components/layout/MainLayout";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

export default function ProductPage() {
  const [qty, setQty] = useState(1);

  const images = [
    "https://placehold.co/700x700",
    "https://placehold.co/700x700",
    "https://placehold.co/700x700",
    "https://placehold.co/700x700",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <MainLayout><section>
    <div className="bg-slate-50 min-h-screen">

      {/* Breadcrumb */}

      <div className="max-w-7xl mx-auto px-4 py-5">
        <p className="text-sm text-gray-500">
          Home / Electronics / Wireless Headphones
        </p>
      </div>

      {/* Product Section */}

      <section className="max-w-7xl mx-auto px-4 pb-16">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Images */}

          <div>

            <div className="bg-white rounded-2xl overflow-hidden shadow">
              <img
                src={selectedImage}
                alt="Product"
                className="w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-3 mt-4">

              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className="bg-white rounded-lg overflow-hidden border hover:border-sky-500"
                >
                  <img src={img} alt="" />
                </button>
              ))}

            </div>

          </div>

          {/* Product Info */}

          <div>

            <span className="bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm">
              Best Seller
            </span>

            <h1 className="text-4xl font-bold mt-4">
              Premium Wireless Headphones
            </h1>

            <div className="flex items-center gap-2 mt-4">
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
              <Star className="fill-yellow-400 text-yellow-400" size={18} />

              <span className="text-gray-500">
                (124 Reviews)
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-4xl font-bold text-sky-600">
                ₱2,999
              </span>

              <span className="line-through text-gray-400">
                ₱3,999
              </span>

              <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                25% OFF
              </span>
            </div>

            <p className="mt-6 text-gray-600 leading-7">
              Experience premium sound quality with advanced
              noise cancellation, crystal-clear calls, and
              up to 40 hours of battery life.
            </p>

            {/* Quantity */}

            <div className="mt-8">

              <label className="font-semibold">
                Quantity
              </label>

              <div className="flex items-center mt-2">

                <button
                  onClick={() =>
                    qty > 1 && setQty(qty - 1)
                  }
                  className="w-10 h-10 bg-white border rounded-l-lg"
                >
                  -
                </button>

                <input
                  value={qty}
                  readOnly
                  className="w-16 h-10 text-center border-t border-b"
                />

                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 bg-white border rounded-r-lg"
                >
                  +
                </button>

              </div>

            </div>

            {/* Stock */}

            <div className="mt-6">
              <span className="text-green-600 font-medium">
                In Stock (25 Available)
              </span>
            </div>

            {/* Actions */}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-xl flex justify-center items-center gap-2">
                <ShoppingCart size={20} />
                Add To Cart
              </button>

              <button className="flex-1 bg-sky-700 hover:bg-sky-800 text-white py-4 rounded-xl">
                Buy Now
              </button>

              <button className="w-full sm:w-14 h-14 bg-white rounded-xl shadow flex items-center justify-center">
                <Heart />
              </button>

            </div>

            {/* Features */}

            <div className="mt-10 bg-white rounded-xl p-5 shadow">

              <h3 className="font-semibold mb-4">
                Product Highlights
              </h3>

              <ul className="space-y-2 text-gray-600">
                <li>✓ Noise Cancellation</li>
                <li>✓ Bluetooth 5.3</li>
                <li>✓ 40-Hour Battery</li>
                <li>✓ Fast Charging</li>
                <li>✓ Premium Build Quality</li>
              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* Product Details */}

      <section className="max-w-7xl mx-auto px-4 pb-16">

        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Product Description
          </h2>

          <p className="text-gray-600 leading-8">
            Designed for music lovers and professionals,
            these wireless headphones provide exceptional
            sound clarity, comfort, and battery life.
            Enjoy uninterrupted listening throughout the day.
          </p>

        </div>

      </section>

      {/* Related Products */}

      <section className="max-w-7xl mx-auto px-4 pb-20">

        <h2 className="text-3xl font-bold mb-8">
          Related Products
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {[1, 2, 3, 4].map((item) => (

            <div
              key={item}
              className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition"
            >

              <img
                src="https://placehold.co/400x300"
                alt=""
              />

              <div className="p-4">

                <h3 className="font-semibold">
                  Related Product {item}
                </h3>

                <p className="text-sky-600 font-bold mt-2">
                  ₱1,499
                </p>

                <button className="w-full mt-4 bg-sky-500 text-white py-2 rounded-lg">
                  View Product
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
    </section></MainLayout>
  );
}