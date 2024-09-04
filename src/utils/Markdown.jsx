import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function Markdown({ children }) {
  const StringText = ({ children }) => <strong style={{ fontWeight: "700" }}>{children}</strong>
  const ItalicText = ({ children }) => <em style={{ fontStyle: "inherit" }}><u>{children}</u></em>;
  const LinkText = ({ children, href }) => <a href={href} target="_blank" style={{ color: "#F99417" }}>{children}</a>;

  const components = {
    strong: StringText,
    em: ItalicText,
    a: LinkText
  };

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm, remarkBreaks]}
    >
      {children}
    </ReactMarkdown>
  );
}
