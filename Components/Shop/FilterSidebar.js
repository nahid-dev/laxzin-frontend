import { useEffect, useMemo, useState } from "react";
import Button from "../Common/Button";

/* ---------- Skeleton ---------- */
function FilterSidebarSkeleton({ className = "" }) {
  return (
    <aside
      className={`col-span-3 bg-gray-100 p-4 rounded space-y-6 animate-pulse ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="w-24 h-4 bg-gray-300 rounded" />
        <div className="w-16 h-3 bg-gray-300 rounded" />
      </div>
      <section>
        <div className="h-4 mb-3 bg-gray-300 rounded w-28" />
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="h-8 bg-gray-300 rounded" />
          <div className="h-8 bg-gray-300 rounded" />
        </div>
        <div className="w-full h-2 mb-2 bg-gray-300 rounded" />
        <div className="flex justify-between">
          <div className="w-8 h-3 bg-gray-300 rounded" />
          <div className="w-8 h-3 bg-gray-300 rounded" />
          <div className="w-8 h-3 bg-gray-300 rounded" />
        </div>
      </section>
      <section>
        <div className="h-4 mb-3 bg-gray-300 rounded w-28" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-5 mb-2 bg-gray-300 rounded" />
        ))}
      </section>
      <section>
        <div className="w-20 h-4 mb-3 bg-gray-300 rounded" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-5 mb-2 bg-gray-300 rounded" />
        ))}
      </section>
      <div className="bg-gray-300 rounded h-9" />
    </aside>
  );
}

/* ---------- Helpers ---------- */
const normItems = (arr) =>
  (arr || []).map((it) => (typeof it === "string" ? { id: it, name: it } : it));

export default function FilterSidebar({
  className = "",
  minPrice = 0,
  maxPrice = 8000,
  enableCategoryFilter = true,
  categories = [],
  defaultFilters = {},
  onChange = () => {},
  debounceMs = 300,
  loading = false,
}) {
  if (loading) return <FilterSidebarSkeleton className={className} />;

  const catItems = useMemo(() => normItems(categories), [categories]);

  const [price, setPrice] = useState({
    min: defaultFilters?.price?.min ?? minPrice,
    max:
      defaultFilters?.price?.max ??
      Math.min(maxPrice, defaultFilters?.price?.max ?? maxPrice),
  });

  // selected category (string id or "all")
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Build filters
  const filters = useMemo(
    () => ({
      price: {
        min: Number(price.min) || minPrice,
        max: Number(price.max) || maxPrice,
      },
      categories: selectedCategory === "all" ? [] : [selectedCategory], // <-- fixed
    }),
    [price, selectedCategory, minPrice, maxPrice]
  );

  // Emit filters with debounce
  useEffect(() => {
    const id = setTimeout(() => onChange(filters), debounceMs);
    return () => clearTimeout(id);
  }, [filters, onChange, debounceMs]);

  const clamp = (val, lo, hi) => Math.min(Math.max(Number(val) || lo, lo), hi);

  return (
    <div className="sticky top-[12vh] hidden md:block">
      <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
        {/* Categories */}
        {enableCategoryFilter ? (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 tracking-wide">
              CATEGORIES
            </h3>
            <div className="space-y-2">
              <div>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-4 py-2 transition-all duration-200 flex justify-between items-center ${
                    selectedCategory === "all"
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <span>All</span>
                </button>
              </div>
              {catItems?.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 transition-all duration-200 flex justify-between items-center ${
                      selectedCategory === category.id
                        ? "bg-black text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <span>{category?.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Price range */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 tracking-wide">
            PRICE RANGE
          </h3>
          <section aria-labelledby="price-heading">
            <div className="grid grid-cols-2 gap-2 mb-1">
              <div>
                <label className="block mb-1 text-gray-600">Min</label>
                <input
                  type="number"
                  className="w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded"
                  value={price.min}
                  min={minPrice}
                  max={price.max}
                  onChange={(e) =>
                    setPrice((p) => ({
                      ...p,
                      min: clamp(e.target.value, minPrice, p.max),
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Max</label>
                <input
                  type="number"
                  className="w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded"
                  value={price.max}
                  min={price.min}
                  max={maxPrice}
                  onChange={(e) =>
                    setPrice((p) => ({
                      ...p,
                      max: clamp(e.target.value, p.min, maxPrice),
                    }))
                  }
                />
              </div>
            </div>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price.max}
              onChange={(e) =>
                setPrice((p) => ({
                  ...p,
                  max: clamp(e.target.value, p.min, maxPrice),
                }))
              }
              className="w-full accent-gray-400 border-none bg-gray-200"
            />
            <div className="flex justify-between mt-1 text-gray-600">
              <span>{minPrice}</span>
              <span>{price.max}</span>
              <span>{maxPrice}+</span>
            </div>
            <Button
              type="button"
              onClick={() => onChange(filters)}
              className="mt-5 w-full font-normal"
            >
              Apply Filters
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
