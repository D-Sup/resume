import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function Markdown({ children }) {
  const ItalicText = ({ children }) => <em style={{ fontStyle: 'inherit' }}><u>{children}</u></em>;
  const LinkText = ({ children, href }) => <a href={href} style={{ color: '#F99417' }}>{children}</a>;

  const components = {
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
