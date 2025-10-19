import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

const parser = new UAParser();

// Fetch clicks for multiple URLs
export async function getClicksForUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

// Fetch clicks for a single URL
export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error("Unable to load Stats:", error);
    throw new Error("Unable to load Stats");
  }

  return data;
}

// Record a click (without redirect)
export const storeClicks = async ({ id }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop"; // Default to desktop if type is not detected

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    await supabase.from("clicks").insert({
      url_id: id,
      city,
      country,
      device,
    });

    // Redirect is now handled separately in RedirectLink.jsx
  } catch (error) {
    console.error("Error recording click:", error);
  }
};

