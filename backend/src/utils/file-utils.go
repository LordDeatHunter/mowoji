package utils

import (
	"archive/zip"
	"bytes"
	"io"
	"os"
)

func GetFiles(path string) ([]string, error) {
	files, err := os.ReadDir(path)
	if err != nil {
		return nil, err
	}

	var fileNames []string

	for _, file := range files {
		fileNames = append(fileNames, file.Name())
	}

	return fileNames, nil
}

func ZipFiles(files []string, zipName string) (*bytes.Buffer, error) {
	buf := new(bytes.Buffer)
	zipWriter := zip.NewWriter(buf)
	defer zipWriter.Close()

	for _, file := range files {
		fileToZip, err := os.Open("emojis/" + file)
		if err != nil {
			return nil, err
		}
		defer fileToZip.Close()

		info, err := fileToZip.Stat()
		if err != nil {
			return nil, err
		}

		header, err := zip.FileInfoHeader(info)
		if err != nil {
			return nil, err
		}

		header.Name = file
		header.Method = zip.Deflate

		writer, err := zipWriter.CreateHeader(header)
		if err != nil {
			return nil, err
		}

		_, err = io.Copy(writer, fileToZip)
		if err != nil {
			return nil, err
		}
	}

	return buf, nil
}
