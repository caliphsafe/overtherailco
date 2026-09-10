import styles from "@/app/catch/catch.module.css";

type CatchCollabMarkProps = {
  compact?: boolean;
  inverse?: boolean;
};

export default function CatchCollabMark({
  compact = false,
  inverse = false,
}: CatchCollabMarkProps) {
  return (
    <div
      className={[
        styles.collabMark,
        compact ? styles.collabMarkCompact : "",
        inverse ? styles.collabMarkInverse : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Fleet Fisheries and Over The Rail Co. collaboration"
    >
      <img
        className={styles.collabLogo}
        src="/otrfleet.png"
        alt="Fleet Fisheries × Over The Rail Co."
      />
    </div>
  );
}
