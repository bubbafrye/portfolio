import { Hud } from "../Hud";
import { Panel } from "../Panel";
import styles from "./ExpandPage.module.css";

/** Figma frame EXPAND — node 935:986 */
export function ExpandPage() {
  return (
    <div className={styles.page} data-figma-name="EXPAND">
      <div className={styles.shell}>
        <Hud />
        <main className={styles.content}>
          <Panel />
        </main>
      </div>
    </div>
  );
}
