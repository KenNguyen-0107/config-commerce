"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreVertical, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuickLinks from "../quick-links";
import CommonRecentOrders from "@/components/widgets/CommonRecentOrders";

export default function DashBoard() {
  const [makeHomePage, setMakeHomePage] = useState(false);

  return (
    <div className="bg-muted-background min-h-screen w-full font-frutiger-bold">
      <div className="container mx-auto px-0 md:px-4 py-6 md:py-10">
        {/* Title - visible on desktop, hidden on mobile */}
        <div className="hidden md:block text-3xl lg:text-[40px] font-bold text-blue mb-8">
          MY ACCOUNT
        </div>

        {/* Make homepage checkbox - visible on mobile, hidden on desktop */}
        <div className="flex items-center px-5 mb-6 md:hidden">
          <input
            type="checkbox"
            id="makeHomePage"
            checked={makeHomePage}
            onChange={() => setMakeHomePage(!makeHomePage)}
            className="h-5 w-5 border-gray-300 rounded"
          />
          <label htmlFor="makeHomePage" className="ml-2 text-gray-600 text-sm">
            Make dashboard my home page
          </label>
        </div>

        <div className="flex flex-col md:flex-row">
          <QuickLinks />

          <div className="md:w-3/4 mt-8 md:mt-0">
            <CommonRecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
}
