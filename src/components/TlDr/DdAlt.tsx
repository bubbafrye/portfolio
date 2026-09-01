import { SeeMoreBtn } from "../SeeMoreBtn";

export type DdAltProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

/** Figma dd-alt — tl-dr snack link (see-more-btn point-down). */
export function DdAlt({ label, selected = false, onClick }: DdAltProps) {
  return (
    <span data-figma-name="dd-alt">
      <SeeMoreBtn
        direction="point-down"
        label={label}
        selected={selected}
        onClick={onClick}
        aria-expanded={selected}
      />
    </span>
  );
}
