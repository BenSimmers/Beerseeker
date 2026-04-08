import JSZip from "jszip";

export type SubmissionDetails = {
  employerName?: string;
  positionTitle?: string;
  jobReference?: string;
};

export type KeywordScanResult = {
  keywordMatch: boolean | null;
  hits: string[];
};

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const MAX_TEXT_LENGTH = 50_000;

const BASE_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: "Formal greeting", regex: /dear (hiring manager|recruiter|talent team)/i },
  { label: "Application intent", regex: /(submit|submitting).{0,20}(application|role)/i },
  { label: "Position reference", regex: /(position|role).*?reference/i },
  { label: "Interest statement", regex: /(excited|interested).{0,40}(opportunity|role)/i },
];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const sanitizeText = (value: string) => value.replace(/\s+/g, " ").trim().slice(0, MAX_TEXT_LENGTH);

const extractPdfText = async (file: File) => {
  const pdfjsLib: any = await import("pdfjs-dist");
  const getDocument = pdfjsLib.getDocument ?? pdfjsLib.default?.getDocument;
  const GlobalWorkerOptions = pdfjsLib.GlobalWorkerOptions ?? pdfjsLib.default?.GlobalWorkerOptions;
  if (GlobalWorkerOptions) {
    GlobalWorkerOptions.workerSrc = "";
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer, disableWorker: true }).promise;
  let text = "";
  const pageLimit = Math.min(pdf.numPages, 6);

  for (let pageNumber = 1; pageNumber <= pageLimit; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => (typeof item.str === "string" ? item.str : ""))
      .join(" ");
    text += ` ${pageText}`;
    if (text.length >= MAX_TEXT_LENGTH) {
      break;
    }
  }

  return sanitizeText(text);
};

const extractDocxText = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const documentFile = zip.file("word/document.xml");
  if (!documentFile) {
    return null;
  }
  const xml = await documentFile.async("string");
  const text = xml
    .replace(/<w:p[^>]*>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  return sanitizeText(text);
};

const extractPlainText = async (file: File) => {
  const text = await file.text();
  return sanitizeText(text);
};

const extractTextFromFile = async (file: File) => {
  const mime = file.type;
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (mime === "application/pdf" || extension === "pdf") {
    return extractPdfText(file);
  }

  if (mime === DOCX_MIME || extension === "docx") {
    return extractDocxText(file);
  }

  if (mime.startsWith("text/") || extension === "txt") {
    return extractPlainText(file);
  }

  return null;
};

const buildPatterns = (details: SubmissionDetails) => {
  const dynamic: Array<{ label: string; regex: RegExp }> = [];
  const employer = details.employerName?.trim();
  const role = details.positionTitle?.trim();
  const reference = details.jobReference?.trim();

  if (employer) {
    dynamic.push({ label: `Employer name: ${employer}`, regex: new RegExp(escapeRegExp(employer), "i") });
  }

  if (role) {
    dynamic.push({ label: `Role title: ${role}`, regex: new RegExp(escapeRegExp(role), "i") });
  }

  if (reference) {
    dynamic.push({ label: `Job reference: ${reference}`, regex: new RegExp(escapeRegExp(reference), "i") });
  }

  return [...BASE_PATTERNS, ...dynamic];
};

export const scanDocumentForKeywords = async ({
  file,
  details,
}: {
  file: File;
  details: SubmissionDetails;
}): Promise<KeywordScanResult> => {
  const text = await extractTextFromFile(file);
  if (!text) {
    return { keywordMatch: null, hits: [] };
  }

  const normalized = text.toLowerCase();
  const patterns = buildPatterns(details);
  const hits: string[] = [];

  patterns.forEach(({ label, regex }) => {
    if (regex.test(normalized)) {
      hits.push(label);
    }
  });

  const requiredHits = patterns.length > 0 ? Math.min(2, patterns.length) : 1;
  const keywordMatch = hits.length >= requiredHits;

  return { keywordMatch, hits: hits.slice(0, 10) };
};
