"use client"

import Icon from "@/components/shared/icons";
import useAuthenStore from "@/store/authen-store";
import Link from "next/link";
import React, { Fragment } from "react";
import { CommonHeaderSignInProps } from "./types";
import WelcomeText from "./WelcomeText";

const CommonHeaderSignIn: React.FC<CommonHeaderSignInProps> = (props) => {
  const { userInfo } = useAuthenStore();

  const { Section } = props;
  if (Section == undefined) return null;

  const accountManagement = [
    { title: "My Account", href: userInfo.userProfileId ? "/my-account" : "" },
    { title: "Login or Register", href: userInfo.userProfileId ? "" : "/login-register" },
    { title: "Basket", href: "/cart" },
  ];
  return (
    <div className="hidden lg:block">
      <WelcomeText userInfo={userInfo} />

      <div className="relative group z-[3]">
        <Link href="/account" className="font-medium text-blue flex items-center gap-2">
          <div>MY ACCOUNT</div>
          <Icon iconName="smallarrow" size={8} viewSize={8} />
        </Link>
        <div className="group-hover:block hidden absolute w-[200px] ">
          {accountManagement.map((item, index) => (
            <Fragment key={index}>
              {item.href && (
                <Link href={item.href} className="block px-5 py-3 bg-[#f8f8f8] text-blue hover:bg-gray-300">{item.title}</Link>
              )}
            </Fragment>
          ))}

          {userInfo.userProfileId && (
            <div className="px-5 py-3 bg-[#f8f8f8] text-blue hover:bg-gray-300">
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonHeaderSignIn;
