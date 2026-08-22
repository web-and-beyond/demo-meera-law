export type Article = {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const articles: Record<string, Article> = {
  consultation: {
    slug: "preparing-for-your-first-consultation",
    category: "Family law",
    readTime: "6 min read",
    title: "What to prepare before your first legal consultation",
    description: "A practical checklist for making an initial legal consultation focused and useful.",
    intro: "Your first meeting with a lawyer is not an examination. You do not need to arrive with every fact perfectly organised or know the legal terminology. A little preparation, however, can help the lawyer understand the situation more quickly and use the meeting to discuss meaningful next steps.",
    sections: [
      { heading: "Begin with a simple timeline", paragraphs: ["Write down the key events in date order. Include approximate dates when you are uncertain and mark anything that needs checking. A one-page timeline is often more useful than a long narrative because it helps identify deadlines, missing information, and the sequence in which decisions were made."], bullets: ["When the issue began", "Important conversations or agreements", "Notices, hearings, or response dates", "What has changed since the dispute began"] },
      { heading: "Bring the documents that tell the story", paragraphs: ["Gather the documents most closely connected to the issue. These may include agreements, notices, court papers, significant emails, financial records, or prior correspondence. Avoid sending a large unsorted archive before the firm confirms that it can act for you."], bullets: ["Keep originals safe and bring copies", "Use clear file names for digital documents", "Do not alter or annotate original evidence", "Mention documents you know exist but cannot access"] },
      { heading: "Know what you want help deciding", paragraphs: ["A consultation is most useful when the lawyer understands the decision you are facing. You may want to know whether to respond, negotiate, apply to court, preserve evidence, or simply understand your position before doing anything."], bullets: ["What outcome matters most to you?", "What would a workable compromise look like?", "Are cost, privacy, speed, or an ongoing relationship especially important?"] },
      { heading: "Protect confidentiality", paragraphs: ["Before sharing sensitive details, allow the firm to complete its conflict check. Use a private device and email account where possible, particularly if the matter involves an employer, shared family account, or jointly managed device. Submitting an enquiry does not itself create an advocate–client relationship."], bullets: ["Do not use a work email for an employment dispute", "Avoid shared cloud folders", "Ask how documents should be transferred securely"] },
      { heading: "Leave with clear next steps", paragraphs: ["Before the meeting ends, confirm what happens next: whether the firm can accept the matter, what additional information is required, who will contact you, likely fees, and any immediate deadline. It is reasonable to take notes and ask for unfamiliar terms to be explained in plain language."], bullets: ["Who is responsible for the next action?", "When should it happen?", "What should you avoid doing meanwhile?"] },
    ],
  },
  workplace: {
    slug: "when-workplace-issues-need-legal-advice",
    category: "Employment",
    readTime: "8 min read",
    title: "When a workplace issue needs legal advice",
    description: "Signals that a workplace concern may require timely, independent legal advice.",
    intro: "Not every difficult workplace conversation requires a lawyer. Some situations can be resolved through a manager, human-resources process, or a carefully documented discussion. Legal advice becomes more important when rights, deadlines, livelihood, or reputation may be affected.",
    sections: [
      { heading: "A document needs your signature", paragraphs: ["Seek advice before signing a resignation, settlement, release, revised contract, performance plan, or disciplinary acknowledgment when you do not fully understand its effect. A document described as routine may still change important rights or limit later options."], bullets: ["Ask for reasonable time to review it", "Keep an unaltered copy", "Do not rely only on an oral explanation of its effect"] },
      { heading: "Your employment may be ending", paragraphs: ["Termination, forced resignation, redundancy, and extended suspension can raise questions about notice, contractual benefits, procedure, and future references. Advice is especially useful before responding to an allegation or accepting a proposed exit package."], bullets: ["Record what was said and who attended", "Preserve the contract and relevant policies", "Note any deadline stated in the letter"] },
      { heading: "The issue involves harassment or retaliation", paragraphs: ["Repeated harassment, discrimination, threats, or punishment after raising a concern should be documented carefully. Internal reporting may be appropriate, but the wording, timing, and evidence supporting a complaint can matter."], bullets: ["Keep a factual chronology", "Preserve relevant messages lawfully", "Record witnesses and prior reports", "Seek immediate help if personal safety is at risk"] },
      { heading: "Money or confidential information is disputed", paragraphs: ["Unpaid salary, incentives, expense claims, restrictive covenants, confidential information, and intellectual property disputes can escalate quickly. Avoid copying material indiscriminately or taking company information simply because you believe it supports your case."], bullets: ["Separate personal records from company information", "Preserve payslips and compensation correspondence", "Get advice before contacting clients or using internal data"] },
      { heading: "How to prepare", paragraphs: ["Bring the employment contract, relevant policies, a short timeline, and the key correspondence. Explain what outcome you want and whether preserving the working relationship is important. Early advice often creates more options, even when the eventual approach is informal."], bullets: ["Identify upcoming meetings or deadlines", "List the people involved", "Write down the questions you need answered"] },
    ],
  },
  mediation: {
    slug: "mediation-or-litigation",
    category: "Dispute resolution",
    readTime: "7 min read",
    title: "Mediation or litigation: understanding the difference",
    description: "A plain-language comparison of two common paths for resolving a legal dispute.",
    intro: "Mediation and litigation are not simply softer and harder versions of the same process. They place decisions in different hands, follow different rhythms, and create different kinds of outcomes. The right path depends on the dispute, the people involved, urgency, evidence, and what a successful resolution would look like.",
    sections: [
      { heading: "What happens in mediation", paragraphs: ["A neutral mediator helps the parties explore settlement but does not impose a decision. The parties retain control over whether an agreement is reached and what it contains. Discussions are generally structured around interests, risks, and practical options rather than proving every contested fact."], bullets: ["The parties choose whether to settle", "Solutions can be more flexible than a court order", "Preparation and legal advice still matter"] },
      { heading: "What happens in litigation", paragraphs: ["Litigation asks a court to determine rights and make enforceable orders. It follows formal procedural and evidentiary rules. This can be necessary when a party will not participate meaningfully, urgent protection is required, a legal precedent matters, or facts must be decided by an independent authority."], bullets: ["A judge controls the outcome", "The process may involve disclosure and witness evidence", "Timelines and costs are less within the parties’ control"] },
      { heading: "Privacy, cost, and time", paragraphs: ["Mediation is often more private and can be arranged sooner, but it is not automatically quick or inexpensive. Complex preparation may still be necessary. Litigation can take longer and may place more information on a public record, although courts can make confidentiality-related orders in appropriate circumstances."], bullets: ["Compare total preparation—not only the hearing day", "Consider the value of a binding ruling", "Ask what happens if mediation does not settle everything"] },
      { heading: "The continuing relationship", paragraphs: ["Where parties must continue working, parenting, trading, or managing shared property, a negotiated outcome may provide practical arrangements that a court would not design. Where there is intimidation, a serious power imbalance, or risk to safety, the process must be assessed carefully and may not be suitable without safeguards."], bullets: ["Can both parties negotiate freely?", "Will they need to cooperate afterward?", "Are urgent interim protections required?"] },
      { heading: "The paths can work together", paragraphs: ["Starting litigation does not necessarily prevent mediation. Court proceedings can preserve rights or obtain interim orders while settlement discussions address the broader dispute. Similarly, mediation may resolve some issues and narrow what remains for determination."], bullets: ["Understand limitation and filing deadlines first", "Choose the process based on the problem—not appearances", "Reassess settlement opportunities as facts become clearer"] },
    ],
  },
};
