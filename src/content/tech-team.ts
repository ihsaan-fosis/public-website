export type TechTeamMember = {
  name: string;
  href?: string;
  /** Sets the name on a line of its own instead of sharing a row. */
  ownLine?: boolean;
};

/** People behind the public site and member platform. Order is display order. */
export const TECH_TEAM: readonly TechTeamMember[] = [
  { name: "Mikhail Wijanarko", href: "https://mikhailwijanarko.xyz" },
  { name: "Rayyan Islam" },
  { name: "Kanzah Hussain" },
  { name: "Mahe", ownLine: true },
  { name: "Nour Meligy", href: "https://www.behance.net/nourmustafa10" },
];
