"use client";
import { useEffect } from "react";
import { trackEvent } from "../lib/engagement-client.js";

export default function LandingTracker({ event = "landing" }) {
  useEffect(() => {
    trackEvent(event);
  }, [event]);
  return null;
}
