import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind classes.
 * @param {ClassValue[]} inputs
 * @returns {string}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Beautify an agency name.
 * @param {string} name
 * @returns {string}
 */
export function beutifyAgencyName(name: string | null | undefined) {
  let agency_name = name

  // clean up
  if (agency_name === 'San Francisco Municipal Transportation Agency') {
    agency_name = 'SFMTA'
  }
  if (agency_name === 'AC TRANSIT') {
    agency_name = 'AC Transit'
  }
  if (agency_name === 'Livermore Amador Valley Transit Authority') {
    agency_name = 'Wheels'
  }
  if (agency_name === 'Metro Transit') {
    agency_name = 'King County Metro'
  }

    return agency_name
  }

/**
 * Send a message to a Discord webhook.
 * @param {string} webhookUrl
 * @param {string} content
 * @param embed
 * @param {string} username
 * @param {string} avatarUrl
 * @returns {Promise<void>}
 */
export async function sendDiscordWebhook(webhookUrl: string, content: string, username?: string, avatarUrl?: string) {
  try {
    let payload: {
      avatar_url: string | undefined;
      content: string;
      username: string | undefined
    };
    //eslint-disable-next-line prefer-const
    payload = {
      content,
      username,
      avatar_url: avatarUrl,
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Failed to send message:", error);
  }
}
