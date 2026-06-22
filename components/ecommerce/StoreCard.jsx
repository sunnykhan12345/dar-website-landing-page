import { MoreIcon } from "@/public/icons/icon";
import Link from "next/link";

export default function StoreCard({ store }) {
  return (
    <Link
      href={`/store/${store.slug}`}
      className="block overflow-hidden rounded-[12px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-[145px]">
        <img
          src={store.cover}
          alt={store.title}
          className="h-full w-full object-cover"
        />
        <img
          src={store.logo}
          alt={`${store.title} logo`}
          className="absolute bottom-[-10px] left-4 h-15 w-15  object-cover"
        />
      </div>
      <div className="p-4 pt-8">
        <h3 className="line-clamp-1 text-[17px] font-bold">{store.title}</h3>
        <p className="mt-2 line-clamp-2 text-[12px] lg:text-sm font-normal text-[#19191A]">
          {store.description}
        </p>

        <div className="mt-3 flex items-center justify-between text-[11px] lg:text-xs text-[#50565D] whitespace-nowrap">
          <span>{store.location}</span>
          <span>{store.distance}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="rounded-[8px] h-9 bg-[var(--orange-soft)] px-3 py-2 font-semibold text-xs text-[var(--orange)]">
            {store.category}
          </span>
          <span className="rounded-lg bg-[var(--orange)] h-9 w-9 flex items-center justify-center  text-white">
            <MoreIcon />
          </span>
          
        </div>
      </div>
    </Link>
  );
}
