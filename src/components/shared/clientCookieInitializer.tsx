"use client"

import useAuthenStore from "@/store/authen-store";
import { useEffect } from "react";

export function ClientCookieInitializer() {
	const { setUserInfo } = useAuthenStore();

  useEffect(() => {
    const initializeClientCookies = async () => {
      try {
        const response = await fetch("/api/sessions/current")

        if (!response.ok) {
          return console.warn("Failed to initialize session:", response.status)
        } else {
          console.log("initialize session successfully")
        }

        const reqAuth = await fetch("/api/account/isauthenticated")
        if (!reqAuth.ok) return;

        const userData = JSON.parse(await response.text());
        if (!userData || userData.isGuest) return;

        setUserInfo({
          userLabel: userData.userLabel,
          userName: userData.userName,
          email: userData.email,
          userProfileId: userData.userProfileId,
          currency: userData.currency.currencySymbol,
        });
      } catch (error) {
        console.error("Error initializing client cookies:", error)
      }
    }

    initializeClientCookies()
  }, [setUserInfo])

  return <></>
}
