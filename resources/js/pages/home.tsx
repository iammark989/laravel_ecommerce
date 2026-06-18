import MainLayout from "@/components/layout/MainLayout";

export default function Home() {
  return (
    <MainLayout><section>
    <div>

      {/* HERO */}

      <section className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">

          <div className="grid lg:grid-cols-2 items-center gap-10">

            <div>
              <h1 className="text-5xl font-bold mb-6">
                Shop Smart,
                Shop Better.
              </h1>

              <p className="text-xl mb-8">
                Discover quality products,
                amazing discounts,
                and a seamless shopping experience.
              </p>

              <div className="flex gap-4">
                <button className="bg-white text-sky-600 px-6 py-3 rounded-lg font-semibold">
                  Shop Now
                </button>

                <button className="border border-white px-6 py-3 rounded-lg">
                  Learn More
                </button>
              </div>
            </div>

            <div>
              <img
                src="https://placehold.co/600x400"
                alt="Hero"
                className="rounded-xl shadow-2xl"
              />
            </div>

          </div>

        </div>
      </section>

      {/* CATEGORIES */}

      <section className="py-16 bg-slate-50">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-10">
            Shop By Category
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

            {[
              "Electronics",
              "Fashion",
              "Home",
              "Accessories",
            ].map((cat) => (
              <div
                key={cat}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">
                  {cat}
                </h3>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* FEATURED PRODUCTS */}

      <section className="py-16">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-10">
            Featured Products
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[1,2,3,4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition"
              >

                <img
                  src="https://placehold.co/400x300"
                  alt=""
                  className="w-full"
                />

                <div className="p-4">

                  <h3 className="font-semibold">
                    Premium Product {item}
                  </h3>

                  <p className="text-sky-600 font-bold mt-2">
                    ₱999.00
                  </p>

                  <button className="mt-4 bg-sky-500 text-white w-full py-2 rounded">
                    Add To Cart
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* PROMO BANNER */}

      <section className="py-20 bg-sky-600 text-white">

        <div className="max-w-6xl mx-auto text-center px-4">

          <h2 className="text-4xl font-bold mb-5">
            Summer Mega Sale
          </h2>

          <p className="text-xl mb-6">
            Up to 50% OFF on selected products.
          </p>

          <button className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold">
            Grab Deals
          </button>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="py-16 bg-slate-50">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-10">
            Happy Customers
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[1,2,3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl p-6 shadow"
              >
                <p>
                  Excellent service and fast delivery.
                  Highly recommended.
                </p>

                <h4 className="font-semibold mt-4">
                  Customer {item}
                </h4>
              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
    </section></MainLayout>
  );
}