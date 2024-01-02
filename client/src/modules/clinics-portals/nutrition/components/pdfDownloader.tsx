import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";

interface File {
  name: string;
  url: string;
}

const Container = styled("div")({
  height: "200px",
  overflow: "auto",
  width: "250px",
});

const FileList = styled("ul")({
  listStyleType: "none",
  padding: 0,
});

const FileListItem = styled("li")({
  padding: "5px 0",
});

const DownloadButton = styled("button")(({ theme }: { theme: Theme }) => ({
  margin: "5px",
  transitionDuration: "0.4s",
  width: "200px",
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
  fontWeight: "bold",
  color: "#fff",
  backgroundImage:
    "linear-gradient(90deg, hsla(183, 85%, 47%, 1) 0%, hsla(180, 99%, 36%, 1) 100%)",
  border: "none",
  borderRadius: "10px",
  padding: "12px 24px",
  cursor: "pointer",
  textAlign: "center",
  textDecoration: "none",
}));

const PdfDownloader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([
    { name: "File 1", url: "http://example.com/file1.pdf" },
    { name: "File 2", url: "http://example.com/file2.pdf" },
    { name: "File 1", url: "http://example.com/file1.pdf" },
    { name: "File 2", url: "http://example.com/file2.pdf" },
    { name: "File 1", url: "http://example.com/file1.pdf" },
    { name: "File 2", url: "http://example.com/file2.pdf" },
  ]);

  const handleDownload = (file: File) => {
    window.open(file.url, "_blank");
  };

  return (
    <Container>
      <FileList>
        {files.map((file, index) => (
          <FileListItem key={index}>
            <DownloadButton onClick={() => handleDownload(file)}>
              {file.name}
            </DownloadButton>
          </FileListItem>
        ))}
      </FileList>
    </Container>
  );
};

export default PdfDownloader;
