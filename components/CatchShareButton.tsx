"use client";

import { useState } from "react";
import styles from "@/app/catch/catch.module.css";

type CatchShareButtonProps = {
  title: string;
};

export default function CatchShareButton({
  title,
}: CatchShareButtonProps) {
  const [label, setLabel] = useState("Send this story");

  async function handleShare() {
    const shareData = {
      title,
      text: "See the vessel and voyage behind these scallops.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setLabel("Link copied");

      window.setTimeout(() => {
        setLabel("Send this story");
      }, 1800);
    } catch {
      setLabel("Send this story");
    }
  }

  return (
    <button
      className={styles.shareButton}
      type="button"
      onClick={handleShare}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </button>
  );
}
