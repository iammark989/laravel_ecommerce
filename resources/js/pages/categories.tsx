import MainLayout from "@/components/layout/MainLayout";
import {
  Laptop,
  Shirt,
  Home,
  Watch,
  Smartphone,
  Headphones,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: Laptop,
    items: 245,
    image: "https://placehold.co/600x400",
  },
  {
    id: 2,
    name: "Fashion",
    icon: Shirt,
    items: 180,
    image: "https://placehold.co/600x400",
  },
  {
    id: 3,
    name: "Home & Living",
    icon: Home,
    items: 120,
    image: "https://placehold.co/600x400",
  },
  {
    id: 4,
    name: "Accessories",
    icon: Watch,
    items: 85,
    image: "https://placehold.co/600x400",
  },
  {
    id: 5,
    name: "Mobile Devices",
    icon: Smartphone,
    items: 95,
    image: "https://placehold.co/600x400",
  },
  {
    id: 6,
    name: "Audio",
    icon: Headphones,
    items: 60,
    image: "https://placehold.co/600x400",
  },
];

export default function CategoriesPage() {
  return (

    <MainLayout><section>
    <div className="bg-slate-50 min-h-screen">

      {/* Breadcrumb */}

      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="text-sm text-gray-500">
          Home / Categories
        </p>
      </div>

      {/* Hero */}

      <section className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white">

        <div className="max-w-7xl mx-auto px-4 py-20 text-center">

          <h1 className="text-4xl md:text-6xl font-bold">
            Shop By Category
          </h1>

          <p className="mt-5 text-lg md:text-xl">
            Discover thousands of products
            across multiple categories.
          </p>

        </div>

      </section>

      {/* Featured Categories */}

      <section className="max-w-7xl mx-auto px-4 py-16">

        <h2 className="text-3xl font-bold mb-10">
          Featured Categories
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {categories.slice(0, 3).map((category) => (
            <div
              key={category.id}
              className="relative rounded-2xl overflow-hidden group shadow-lg"
            >

              <img
                src={category.image}
                alt={category.name}
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">

                <h3 className="text-white text-2xl font-bold">
                  {category.name}
                </h3>

                <p className="text-slate-200">
                  {category.items} Products
                </p>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* All Categories */}

      <section className="max-w-7xl mx-auto px-4 pb-20">

        <h2 className="text-3xl font-bold mb-10">
          Browse Categories
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden group"
              >

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="p-6">

                  <div className="flex items-center gap-3">

                    <div className="bg-sky-100 p-3 rounded-xl">
                      <Icon
                        size={24}
                        className="text-sky-600"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        {category.name}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {category.items} Products
                      </p>
                    </div>

                  </div>

                  <button className="mt-6 w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl">
                    Explore Category
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </section>

      {/* Promo Banner */}

      <section className="bg-sky-600 text-white">

        <div className="max-w-7xl mx-auto px-4 py-20 text-center">

          <h2 className="text-4xl font-bold">
            Summer Shopping Festival
          </h2>

          <p className="mt-4 text-lg">
            Up to 50% OFF on selected categories.
          </p>

          <button className="mt-8 bg-white text-sky-600 px-8 py-3 rounded-xl font-semibold">
            Shop Deals
          </button>

        </div>

      </section>

      {/* Popular Brands */}

      <section className="max-w-7xl mx-auto px-4 py-20">

        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Brands
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

          {[
            "BrandOne",
            "BrandTwo",
            "BrandThree",
            "BrandFour",
            "BrandFive",
            "BrandSix",
          ].map((brand) => (
            <div
              key={brand}
              className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
            >
              <h3 className="font-semibold">
                {brand}
              </h3>
            </div>
          ))}

        </div>

      </section>

    </div>
    </section></MainLayout>
  );
}