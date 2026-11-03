export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CookieCategory = {
  name: string;
  status: "always" | "optional" | "third-party";
  purpose: string;
  examples: string;
};

export const privacyUpdated = "3 November 2026";

export const privacyNav = [
  { id: "who-we-are", label: "Who we are" },
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use-information", label: "How we use information" },
  { id: "legal-basis-and-consent", label: "Legal basis & consent" },
  { id: "cookies", label: "Cookies & similar technologies" },
  { id: "sharing-and-disclosure", label: "Sharing & disclosure" },
  { id: "retention", label: "Data retention" },
  { id: "security", label: "Security" },
  { id: "your-rights", label: "Your rights" },
  { id: "international-transfers", label: "International transfers" },
  { id: "children", label: "Children's privacy" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

export const privacyIntroSections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    paragraphs: [
      "NM Research is the research division of the NM Group of Industries and Research Foundation, headquartered in Kerala, India. This policy explains how we handle personal information when you visit nmresearch.co.in, contact us, register as a researcher, apply for a role or use our services.",
      "For the purposes of applicable data protection laws, the NM Group of Industries and Research Foundation is the controller of the personal information described in this policy.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    paragraphs: [
      "We collect information you choose to provide and limited technical information generated when you use the site.",
    ],
    bullets: [
      "Identity and contact details — name, email address, phone number, institution or organisation.",
      "Enquiry and application content — messages, research interests, CVs, statements of interest and documents you send to us.",
      "Membership and registration details — the information you submit when registering as a researcher or joining the community.",
      "Payment or transaction references — details you share when settling membership or service fees.",
      "Technical information — browser type, device category, approximate location, referring page and pages visited, collected through server logs and, where consented, analytics.",
      "Cookie preferences — the choice you make in the cookie banner, stored in your browser.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    paragraphs: [
      "We use personal information to respond to enquiries, deliver services, process memberships and applications, operate and secure the site, and improve our content and services.",
    ],
    bullets: [
      "Respond to your message, enquiry or application.",
      "Provide research, publication, membership and programme services.",
      "Send updates you have requested, including news, opportunities and event information.",
      "Maintain records, prevent misuse and meet legal or accounting obligations.",
      "Understand aggregate site usage and improve navigation and content.",
    ],
  },
  {
    id: "legal-basis-and-consent",
    title: "Legal basis and consent",
    paragraphs: [
      "Where required, we rely on your consent to send marketing updates and to set optional cookies. You can withdraw consent at any time.",
      "We may also process information where necessary to perform a contract with you, comply with a legal obligation, or pursue legitimate interests such as responding to enquiries and keeping the site secure.",
      "Withdrawing consent does not affect processing carried out before withdrawal.",
    ],
  },
];

export const privacyOutroSections: LegalSection[] = [
  {
    id: "sharing-and-disclosure",
    title: "Sharing and disclosure",
    paragraphs: [
      "We do not sell personal information. We share it only with service providers who help us operate the site and deliver services, with professional advisers where necessary, or where required by law.",
    ],
    bullets: [
      "Hosting, email, form-processing and IT providers.",
      "Professional advisers such as lawyers, auditors and insurers.",
      "Authorities or other parties where required by law or to protect rights and safety.",
      "A successor organisation in connection with a merger, acquisition or restructuring.",
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    paragraphs: [
      "We keep personal information only for as long as needed for the purpose for which it was collected, including to meet legal, accounting or reporting requirements.",
      "Enquiry records are typically retained for a reasonable period after resolution. Application and membership records may be retained for longer where necessary to manage the relationship or meet legal obligations.",
      "Cookie preferences remain in your browser until you clear them or change your choice.",
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "We use reasonable technical and organisational measures to protect personal information against unauthorised access, loss or misuse.",
      "No method of transmission or storage is completely secure. Please avoid sending sensitive information through unencrypted channels.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    paragraphs: [
      "Depending on where you live, you may have rights to access, correct, delete, restrict or object to the processing of your personal information, and to receive a portable copy.",
      "To exercise a right, email hello.nmassociation@gmail.com. We may need to verify your identity before responding.",
    ],
    bullets: [
      "Request access to the personal information we hold about you.",
      "Ask us to correct inaccurate or incomplete information.",
      "Ask us to delete information where there is no lawful reason to keep it.",
      "Withdraw consent for optional cookies or marketing communications.",
      "Object to processing based on legitimate interests.",
      "Lodge a complaint with your local data protection authority.",
    ],
  },
  {
    id: "international-transfers",
    title: "International transfers",
    paragraphs: [
      "NM Research operates across multiple countries. Information may be processed in India or in other countries where we or our service providers operate. Where required, we use appropriate safeguards for international transfers.",
    ],
  },
  {
    id: "children",
    title: "Children's privacy",
    paragraphs: [
      "The site and services are not directed at children under 18. We do not knowingly collect personal information from children. If you believe a child has provided information, contact us and we will take appropriate steps.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The latest version will always be available on this page, with the updated date shown above.",
      "Material changes will be communicated where appropriate.",
    ],
  },
];

export const cookieCategories: CookieCategory[] = [
  {
    name: "Strictly necessary",
    status: "always",
    purpose:
      "Required for the site to function, remember your cookie choice and keep forms and navigation secure.",
    examples: "Cookie consent preference, security tokens, load balancing",
  },
  {
    name: "Analytics",
    status: "optional",
    purpose:
      "Help us understand how visitors use the site so we can improve content and navigation. These are only set with your consent.",
    examples: "Aggregated page views, referral source, device category",
  },
  {
    name: "Third-party / embedded",
    status: "third-party",
    purpose:
      "Some external services such as fonts, maps, video or messaging links may process technical data when their content is loaded or when you follow a link.",
    examples: "Google Fonts, WhatsApp, embedded media",
  },
];
