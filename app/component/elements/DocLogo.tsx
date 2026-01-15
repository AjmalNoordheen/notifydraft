import { FileIcon } from "../icons/FileIcon"

export const DocLogo = ({height = 16, width = 16}: {height?: number, width?: number}) => {
  return (
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary">
      <div className={`h-${height} w-${width} rounded-xl bg-ring flex items-center justify-center`}>
        <FileIcon className="text-primary-foreground fileIconAnimation" />
      </div>
    </div>
  );
}