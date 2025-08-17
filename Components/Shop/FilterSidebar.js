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
  const [selectedCats, setSelectedCats] = useState(
    new Set(defaultFilters?.categories ?? [])
  );

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const filters = useMemo(
    () => ({
      price: {
        min: Number(price.min) || minPrice,
        max: Number(price.max) || maxPrice,
      },
      categories: Array.from(selectedCats),
    }),
    [price, selectedCats, minPrice, maxPrice]
  );

  useEffect(() => {
    const id = setTimeout(() => onChange(filters), debounceMs);
    return () => clearTimeout(id);
  }, [filters, onChange, debounceMs]);

  const toggleSet = (setVal, value) => {
    const next = new Set(setVal);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  const clearAll = () => {
    setPrice({ min: minPrice, max: maxPrice });
    setSelectedCats(new Set());
    onChange({
      price: { min: minPrice, max: maxPrice },
      categories: [],
    });
  };

  const clamp = (val, lo, hi) => Math.min(Math.max(Number(val) || lo, lo), hi);

  return (
    // <aside
    //   className={`col-span-3 bg-gray-50 p-4 rounded space-y-4 sticky top-[100px] ${className}`}
    // >
    //   <div className="flex items-center justify-between">
    //     <h2 className="text-sm">Filters</h2>
    //     <Button variant="secondary" onClick={clearAll} size="xs">
    //       Clear Filters
    //     </Button>
    //   </div>

    //   <section aria-labelledby="price-heading">
    //     {/* PRICE RANGE */}
    //     <h4 id="price-heading" className="mb-2 text-sm font-semibold">
    //       Price Range
    //     </h4>
    //     <div className="grid grid-cols-2 gap-2 mb-1">
    //       <div>
    //         <label className="block mb-1 text-gray-600">Min</label>
    //         <input
    //           type="number"
    //           className="w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded"
    //           value={price.min}
    //           min={minPrice}
    //           max={price.max}
    //           onChange={(e) =>
    //             setPrice((p) => ({
    //               ...p,
    //               min: clamp(e.target.value, minPrice, p.max),
    //             }))
    //           }
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-1 text-gray-600">Max</label>
    //         <input
    //           type="number"
    //           className="w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded"
    //           value={price.max}
    //           min={price.min}
    //           max={maxPrice}
    //           onChange={(e) =>
    //             setPrice((p) => ({
    //               ...p,
    //               max: clamp(e.target.value, p.min, maxPrice),
    //             }))
    //           }
    //         />
    //       </div>
    //     </div>
    //     <input
    //       type="range"
    //       min={minPrice}
    //       max={maxPrice}
    //       value={price.max}
    //       onChange={(e) =>
    //         setPrice((p) => ({
    //           ...p,
    //           max: clamp(e.target.value, p.min, maxPrice),
    //         }))
    //       }
    //       className="w-full accent-gray-800"
    //     />
    //     <div className="flex justify-between mt-1 text-gray-600">
    //       <span>{minPrice}</span>
    //       <span>{price.max}</span>
    //       <span>{maxPrice}+</span>
    //     </div>
    //   </section>
    //   {catItems?.length > 0 && (
    //     <section aria-labelledby="cat-heading">
    //       <h3 id="cat-heading" className="mb-3 text-base font-semibold">
    //         Categories
    //       </h3>
    //       <ul className="pr-1 space-y-2 overflow-auto max-h-48">
    //         {catItems.map((cat) => (
    //           <li key={cat.id}>
    //             <label className="flex items-center gap-2 text-sm">
    //               <input
    //                 type="checkbox"
    //                 className="accent-black"
    //                 checked={selectedCats.has(String(cat.id))}
    //                 onChange={() =>
    //                   setSelectedCats((s) => toggleSet(s, String(cat.id)))
    //                 }
    //               />
    //               <span className="truncate">{cat.name}</span>
    //             </label>
    //           </li>
    //         ))}
    //         {catItems.length === 0 && (
    //           <li className= text-gray-500">No categories</li>
    //         )}
    //       </ul>
    //     </section>
    //   )}

    //   <Button
    //     type="button"
    //     onClick={() => onChange(filters)}
    //     size="sm"
    //     className="w-full"
    //   >
    //     Apply Filters
    //   </Button>
    // </aside>
    <div className="sticky top-[12vh] hidden md:block">
      <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
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

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 tracking-wide">
            PRICE RANGE
          </h3>
          {/* <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number.parseInt(e.target.value)])
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <button className="w-full bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors">
              APPLY FILTER
            </button>
          </div> */}
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
