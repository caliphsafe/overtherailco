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
        className={styles.fleetLogo}
        src="/fleet.png"
        alt="Fleet Fisheries"
      />

      <span className={styles.collabDivider} aria-hidden="true">
        <i />
        <b>×</b>
        <i />
      </span>

      <img
        className={styles.otrLogo}
        src="/icon.png"
        alt="Over The Rail Co."
      />
    </div>
  );
}
