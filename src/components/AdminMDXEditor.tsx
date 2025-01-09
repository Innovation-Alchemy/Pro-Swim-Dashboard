import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  linkDialogPlugin,
  MDXEditor,
  toolbarPlugin,
} from "@mdxeditor/editor";

const AdminMDXEditor = ({
  input,
  handleChange,
  label,
}: {
  input: string;
  handleChange: (s: string) => void;
  label: string;
}) => {
  return (
    <div className="w-full mb-3">
      <div className="text-primary font-semibold text-lg mb-2">{label}</div>

      <MDXEditor
        markdown={input}
        onChange={(s: string) =>
          handleChange(
            s.replace(/\r\n/g, "\\r\\n") // Escape newlines
          )
        }
        className="text-black border-2 rounded-xl border-primary"
        plugins={[
          linkDialogPlugin(),
          toolbarPlugin({
            toolbarClassName: "rounded-xl",
            toolbarContents: () => (
              <>
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
};

export default AdminMDXEditor;