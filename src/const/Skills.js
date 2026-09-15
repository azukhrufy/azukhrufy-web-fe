import {
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiPython,
  SiHtml5,
  SiCss,
  SiNextdotjs,
  SiReact,
  SiNuxt,
  SiLaravel,
  SiOdoo,
} from "react-icons/si";

/**
 * Skill groups shown in {@link SkillsSection}.
 */
export const SkillGroups = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "PHP", icon: SiPhp },
      { name: "Python", icon: SiPython },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React.js", icon: SiReact },
      { name: "Nuxt.js", icon: SiNuxt },
      { name: "Laravel", icon: SiLaravel },
      { name: "Odoo", icon: SiOdoo },
    ],
  },
];
