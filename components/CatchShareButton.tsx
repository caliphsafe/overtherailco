"use client";

import { useState } from "react";
import styles from "@/app/catch/catch.module.css";

type CatchShareButtonProps = {
  title: string;
};

export default function CatchShareButton({
  title,
}: CatchShareButtonProps) {
  const [label, setLabel] = useState(
    "Share this catch"
  );

  async function handleShare() {
    const shareData = {
      title,
      text: "See the fishing trip behind this catch.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      setLabel("Link copied");

      window.setTimeout(() => {
        setLabel("Share this catch");
      }, 1800);
    } catch {
      setLabel("Share this catch");
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
